import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, Row, Skeleton, Typography, Spin } from 'antd';

import PostCard from './PostCard';
import styles from './style.module.css';

export default function Feed({ loading, posts, fetchData, total }) {
  return loading ? (
    <Row gutter={[0, 25]}>
      {Array(5)
        .fill()
        .map((_, idx) => (
          <Col key={idx} span={24}>
            <Skeleton key={idx} avatar paragraph={{ rows: 4 }} />
          </Col>
        ))}
    </Row>
  ) : (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchData}
      hasMore={posts.length < total}
      loader={
        <Spin
          style={{ padding: 10, marginTop: 15 }}
          className='yh-center-row'
          size='large'
        />
      }
      endMessage={
        <Typography.Title
          className={['yh-pc', styles.infiniteScrollEndMessage]}
          level={5}>
          ليس هناك مزيد من المنشورات
        </Typography.Title>
      }>
      <Row gutter={[0, 25]}>
        {posts.map((post) => (
          <Col key={post._id} span={24}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
}
