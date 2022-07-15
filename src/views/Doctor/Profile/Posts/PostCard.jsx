import { useState } from 'react';
import { Avatar, Button, Col, Row, Space, Typography } from 'antd';
import Icon, {
  UserOutlined,
  CommentOutlined,
  HeartOutlined,
  HeartFilled,
} from '@ant-design/icons';

import styles from '../style.module.css';

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
  const [commentsVisible, setCommentsVisible] = useState(false);

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

                <Typography.Text>{post?.comments?.length || 0}</Typography.Text>
              </Space>
            </Button>
          </Col>

          <Col>
            <Button
              style={{ cursor: 'default' }}
              className={styles.postCardActionsButton}
              type='text'>
              <Space direction='horizontal' align='center' size={10}>
                {post.isLiked ? (
                  <Icon
                    style={{ cursor: 'default' }}
                    className={[
                      styles.postCardActionsIcon,
                      styles.postCardActionsIconHeart,
                    ]}
                    component={HeartFilled}
                  />
                ) : (
                  <Icon
                    style={{ cursor: 'default' }}
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

      {commentsVisible && !!post?.comments?.length && (
        <Col className={styles.commentsContainer} span={24}>
          <Row gutter={[0, 10]}>
            {post?.comments?.map((comment) =>
              comment.doctor ? (
                <Col key={comment._id} span={24}>
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
                <Col key={comment._id} span={24}>
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
    </Row>
  );
}
