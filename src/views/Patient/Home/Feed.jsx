import { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Col, message, Row, Skeleton, Typography, Spin } from 'antd';

import { doctorGetPosts } from 'api/doctor';
import PostCard from './PostCard';
import styles from './style.module.css';

export default function Feed() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const nextPage = page + 1;
      const data = await doctorGetPosts(nextPage);

      setPosts([...posts, ...data.posts]);
      setPage(nextPage);
    } catch (error) {
      message.error(error.message);
    }
  }, [page, posts]);

  useEffect(() => {
    (async () => {
      try {
        const data = await doctorGetPosts(1);

        setPosts(data.posts || []);
        setTotal(data.total || 0);
      } catch (error) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

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
