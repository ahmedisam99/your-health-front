import { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import { Avatar, Col, message, Row, Space, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { doctorGetMyPatients, doctorGetPosts } from 'api/doctor';
import DoctorLayout from 'components/doctor/DoctorLayout';
import CreatePostCard from './CreatePostCard';
import Feed from './Feed';
import styles from './style.module.css';

export default function DoctorHomeView() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { data: patients = [] } = useQuery(
    'doctor-patients',
    doctorGetMyPatients,
  );

  console.log('patients', patients);

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
          <Row className={styles.patientsSection} gutter={[0, 20]}>
            <Col span={24}>
              <Typography.Title className='yh-wc yh-mb-0' level={4}>
                قائمة المرضى
              </Typography.Title>
            </Col>

            {patients.map((patient) => (
              <Col
                key={patient._id}
                className={['yh-center-col', styles.patientCard]}
                span={24}>
                <Space direction='horizontal' align='center' size={15}>
                  <Avatar
                    alt='Patient'
                    icon={<UserOutlined />}
                    src={patient.profilePicture}
                    size={window.innerWidth <= 1400 ? 40 : 55}
                  />

                  <Space direction='vertical' align='start' size={5}>
                    <Typography.Text className={styles.patientCardName}>
                      {patient.name}
                    </Typography.Text>

                    <Typography.Text
                      style={{ direction: 'ltr', display: 'inline-block' }}
                      className={['yh-gc', styles.patientCardName]}>
                      {patient.phoneNumber}
                    </Typography.Text>
                  </Space>
                </Space>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </DoctorLayout>
  );
}
