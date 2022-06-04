import { useState, useEffect, useCallback } from 'react';
import { Col, message, Row, Typography } from 'antd';

import { doctorGetPosts } from 'api/doctor';
import DoctorLayout from 'components/doctor/DoctorLayout';
import CreatePostCard from './CreatePostCard';
import Feed from './Feed';
import styles from './style.module.css';

export default function DoctorHomeView() {
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
        message.error(
          error.response?.data?.message || 'حدث خطأ أثناء تحميل المنشورات',
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DoctorLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>الرئيسية</Typography.Title>
        </Col>

        <Col span={17}>
          <Row gutter={[0, 25]}>
            <Col span={24}>
              <CreatePostCard posts={posts} setPosts={setPosts} />
            </Col>

            <Col span={24}>
              <Feed
                loading={loading}
                posts={posts}
                fetchData={fetchData}
                total={total}
              />
            </Col>
          </Row>
        </Col>

        <Col span={7}>
          <div className={styles.patientsSection}></div>
        </Col>
      </Row>
    </DoctorLayout>
  );
}
