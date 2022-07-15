import { Avatar, Col, Image, Row, Space, Typography, Tabs } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';

import { doctorGetMe } from 'api/doctor';
import DoctorLayout from 'components/doctor/DoctorLayout';
import virusImg from 'assets/images/virus.png';
import styles from './style.module.css';
import PostsTab from './Posts';

const { TabPane } = Tabs;

export default function DoctorProfileView() {
  const { data: user } = useQuery('doctor-me', doctorGetMe);

  return (
    <DoctorLayout isProfileView>
      <div className={styles.header}>
        <Image src={virusImg} preview={false} width='100%' height='auto' />
      </div>

      <Row className={styles.content} gutter={[0, 30]}>
        <Col span={24}>
          <Space direction='horizontal' align='end' size={10}>
            <Avatar
              alt='Doctor'
              icon={<UserOutlined />}
              src={user.profilePicture}
              size={window.innerWidth <= 1400 ? 150 : 200}
            />

            <Space direction='vertical' align='start' size={5}>
              <Typography.Title className='yh-pc' level={4}>
                د. {user.name}
              </Typography.Title>

              <Typography.Title className='yh-pc' level={5}>
                {user.email}
              </Typography.Title>
            </Space>
          </Space>
        </Col>

        <Col span={24}>
          <Tabs
            defaultActiveKey={'1'}
            type='card'
            renderTabBar={({ panes, activeKey, onTabClick }) => (
              <Row justify='center' className='cc-mb-20'>
                {panes.map((pane) => (
                  <Col
                    key={pane.key}
                    className={[
                      'yh-fz-12 yh-fw-500 yh-clickable yh-center-all',
                      styles.tabPane,
                      activeKey === pane.key ? styles.activeTabpane : '',
                    ]}
                    span={24 / panes.length}
                    onClick={(e) => onTabClick(pane.key, e)}>
                    {pane.props.tab}
                  </Col>
                ))}
              </Row>
            )}
            centered
            animated>
            <TabPane
              tab={
                <Typography className='yh-fz-14 yh-fw-500 yh-center-row'>
                  المنشورات
                </Typography>
              }
              key='1'>
              <PostsTab />
            </TabPane>
            <TabPane
              tab={
                <Typography className='yh-fz-14 yh-fw-500 yh-center-row'>
                  تعديل الملف الشخصي
                </Typography>
              }
              key='2'>
              تعديل الملف الشخصي
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </DoctorLayout>
  );
}
