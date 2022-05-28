import { useState } from 'react';
import { useQuery } from 'react-query';
import { Avatar, Button, Col, Dropdown, Image, Input, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import { doctorGetMe } from 'api/doctor';
import faceImg from 'assets/icons/face.png';
import styles from './style.module.css';

export default function CreatePostCard() {
  const [content, setContent] = useState('');
  const { data: user } = useQuery('doctor-me', doctorGetMe);

  const onEmojiClick = (_, emoji) => {
    setContent(content + emoji.emoji);
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
              onClick={() => {}}>
              نشر
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}
