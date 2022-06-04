import { useState } from 'react';
import { useQuery } from 'react-query';
import {
  Avatar,
  Badge,
  Button,
  Col,
  Dropdown,
  Image,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import Icon, {
  UserOutlined,
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
  SendOutlined,
} from '@ant-design/icons';
import EmojiPicker from 'emoji-picker-react';

import { patientGetMe } from 'api/patient';
import faceImg from 'assets/icons/face.png';
import styles from './style.module.css';

const calcSinceFromDate = (_date) => {
  const date = new Date(_date);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);

  if (days > 0) {
    return `${days} أيام`;
  } else if (hours > 0) {
    return `${hours} ساعات`;
  } else if (minutes > 0) {
    return `${minutes} دقائق`;
  } else {
    return `${seconds} ثواني`;
  }
};

export default function PostCard({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comment, setComment] = useState('');
  const { data: user } = useQuery('pat-me', patientGetMe);

  const onEmojiClick = (_, emoji) => {
    setComment(comment + emoji.emoji);
  };

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      post.likes--;
    } else {
      setIsLiked(true);
      post.likes++;
    }
  };

  const handleComment = () => {
    console.log('comment', comment);
  };

  return (
    <Row className={styles.postCard} gutter={[0, 10]}>
      <Col span={24}>
        <Space direction='horizontal' align='center' size={15}>
          <Avatar
            alt='Doctor'
            icon={<UserOutlined />}
            src={post.doctor?.profilePicture}
            size={60}
          />

          <Space direction='vertical' align='start' size={0}>
            <Typography.Title
              className={['yh-bc', styles.postCardAuthorName]}
              level={5}>
              د. {post.doctor.name}
            </Typography.Title>

            <Typography.Text className='yh-gc'>
              منذ {calcSinceFromDate(post.createdAt)}
            </Typography.Text>
          </Space>
        </Space>
      </Col>

      <Col span={24}>
        <Typography.Paragraph className={styles.postCardContent}>
          {post.content}
        </Typography.Paragraph>
      </Col>

      <Col span={24}>
        <Row className={styles.postCardActions} justify='space-between'>
          <Col>
            <Button
              className={styles.postCardActionsButton}
              onClick={() => setCommentsVisible(!commentsVisible)}
              type='text'>
              <Space direction='horizontal' align='center' size={10}>
                <Icon
                  className={styles.postCardActionsIcon}
                  component={CommentOutlined}
                />

                <Typography.Text>{post.comments?.length || 0}</Typography.Text>
              </Space>
            </Button>
          </Col>

          <Col>
            <Button
              className={styles.postCardActionsButton}
              type='text'
              onClick={handleLike}>
              <Space direction='horizontal' align='center' size={10}>
                {post.isLiked || isLiked ? (
                  <Icon
                    className={[
                      styles.postCardActionsIcon,
                      styles.postCardActionsIconHeart,
                    ]}
                    component={HeartFilled}
                  />
                ) : (
                  <Icon
                    className={styles.postCardActionsIcon}
                    component={HeartOutlined}
                  />
                )}

                <Typography.Text>{post.likes || 0}</Typography.Text>
              </Space>
            </Button>
          </Col>
        </Row>
      </Col>

      {commentsVisible && !!post.comments?.length && (
        <Col className={styles.commentsContainer} span={24}>
          <Row gutter={[0, 10]}>
            {post.comments?.map((comment) =>
              comment.doctor ? (
                <Col span={24}>
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Space direction='horizontal' align='center' size={15}>
                        <Avatar
                          alt='Doctor'
                          icon={<UserOutlined />}
                          src={comment.doctor?.profilePicture}
                          size={60}
                        />

                        <Space direction='vertical' align='start' size={0}>
                          <Typography.Title
                            className={['yh-bc', styles.postCardAuthorName]}
                            level={5}>
                            د. {comment.doctor.name}
                          </Typography.Title>

                          <Typography.Text className='yh-gc'>
                            منذ {calcSinceFromDate(comment.createdAt)}
                          </Typography.Text>
                        </Space>
                      </Space>
                    </Col>

                    <Col span={24}>
                      <Typography.Paragraph className={styles.postCardContent}>
                        {comment.content}
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                </Col>
              ) : comment.patient ? (
                <Col span={24}>
                  <Row gutter={[0, 10]}>
                    <Col span={24}>
                      <Space direction='horizontal' align='center' size={15}>
                        <Avatar
                          alt='Doctor'
                          icon={<UserOutlined />}
                          src={comment.patient?.profilePicture}
                          size={60}
                        />

                        <Space direction='vertical' align='start' size={0}>
                          <Typography.Title
                            className={['yh-bc', styles.postCardAuthorName]}
                            level={5}>
                            {comment.patient.name}
                          </Typography.Title>

                          <Typography.Text className='yh-gc'>
                            منذ {calcSinceFromDate(comment.createdAt)}
                          </Typography.Text>
                        </Space>
                      </Space>
                    </Col>

                    <Col span={24}>
                      <Typography.Paragraph className={styles.postCardContent}>
                        {comment.content}
                      </Typography.Paragraph>
                    </Col>
                  </Row>
                </Col>
              ) : null,
            )}
          </Row>
        </Col>
      )}

      <Col span={24}>
        <div className={styles.postCardCommentSection}>
          <Badge color='green' offset={[0, 20]} dot>
            <Avatar
              alt='Doctor'
              icon={<UserOutlined />}
              src={user.profilePicture}
              size={50}
            />
          </Badge>

          <Input
            className={styles.postCardCommentInput}
            type='text'
            placeholder='اكتب تعليقاََ'
            value={comment}
            size='small'
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;

              handleComment();
            }}
            suffix={
              <Space direction='horizontal' align='center' size={10}>
                <Dropdown
                  trigger={['click']}
                  overlay={<EmojiPicker onEmojiClick={onEmojiClick} />}>
                  <Image
                    style={{ cursor: 'pointer' }}
                    preview={false}
                    src={faceImg}
                    width={24}
                  />
                </Dropdown>

                <Icon
                  onClick={handleComment}
                  className={styles.postCardActionsIcon}
                  component={SendOutlined}
                />
              </Space>
            }
          />
        </div>
      </Col>
    </Row>
  );
}
