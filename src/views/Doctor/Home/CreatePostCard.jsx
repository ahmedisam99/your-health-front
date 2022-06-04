import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Image,
  Input,
  message,
  Row,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import { doctorGetMe, doctorCreatePost } from 'api/doctor';
import faceImg from 'assets/icons/face.png';
import styles from './style.module.css';

export default function CreatePostCard({ posts, setPosts }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { data: user } = useQuery('doctor-me', doctorGetMe);

  const onEmojiClick = (_, emoji) => {
    setContent(content + emoji.emoji);
  };

  const handleCreate = async () => {
    if (!content) return;
    setLoading(true);

    try {
      const data = await doctorCreatePost(content);

      setPosts([data, ...posts]);
      setContent('');
    } catch (error) {
      message.error(
        error.response?.data?.message || 'حدث خطأ أثناء تحميل المنشورات',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.createPostCard}>
      <div className={styles.createPostCardBody}>
        <Row gutter={10}>
          <Col>
            <Avatar
              alt='Doctor'
              icon={<UserOutlined />}
              src={user.profilePicture}
              size={60}
            />
          </Col>

          <Col style={{ flexGrow: 1 }}>
            <Input.TextArea
              placeholder='اكتب ما تفكر به...'
              className={styles.createPostCardTextArea}
              autoSize={{ minRows: 5 }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </Row>
      </div>

      <div className={styles.createPostCardFooter}>
        <Row justify='space-between' align='middle'>
          <Col>
            <Dropdown
              trigger={['click']}
              overlay={<EmojiPicker onEmojiClick={onEmojiClick} />}>
              <Image
                style={{ cursor: 'pointer' }}
                preview={false}
                src={faceImg}
                width={30}
              />
            </Dropdown>
          </Col>

          <Col>
            <Button
              className={styles.createPostCardFooterPostBtn}
              type='primary'
              onClick={handleCreate}
              loading={loading}>
              نشر
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
