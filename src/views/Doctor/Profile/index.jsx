import { useState } from 'react';
import {
  Avatar,
  Col,
  Image,
  Row,
  Space,
  Typography,
  Tabs,
  Upload,
  Button,
  message,
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from 'react-query';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { doctorGetMe, doctorUpdateProfilePicture } from 'api/doctor';
import DoctorLayout from 'components/doctor/DoctorLayout';
import virusImg from 'assets/images/virus.png';
import styles from './style.module.css';
import PostsTab from './Posts';
import EditProfileTab from './EditProfile';

const { TabPane } = Tabs;

export default function DoctorProfileView() {
  const [loading, setLoading] = useState(false);
  const { data: user } = useQuery('doctor-me', doctorGetMe);
  const queryClient = useQueryClient();

  const customRequest = async ({ file, onSuccess }) => {
    setLoading(true);

    try {
      const storage = getStorage();

      const imgRef = ref(storage, `doctor/${file.uid}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await doctorUpdateProfilePicture(url);
      queryClient.invalidateQueries('doctor-me');
      message.success('تم تغيير الصورة الشخصية بنجاح');
    } catch (error) {
      message.error(error.response?.data?.message || 'حدث خطأ ما');
    } finally {
      onSuccess('ok');
      setLoading(false);
    }
  };

  return (
    <DoctorLayout isProfileView>
      <div className={styles.header}>
        <Image src={virusImg} preview={false} width='100%' height='auto' />
      </div>

      <Row className={styles.content} gutter={[0, 30]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <Space direction='horizontal' align='end' size={10}>
                <Avatar
                  alt='Doctor'
                  icon={<UserOutlined />}
                  src={user.profilePicture}
                  size={window.innerWidth <= 1400 ? 150 : 200}
                />

                <Space direction='vertical' align='start' size={5}>
                  <Typography.Title level={4}>د. {user.name}</Typography.Title>

                  <Typography.Title level={5}>{user.email}</Typography.Title>
                </Space>
              </Space>
            </Col>

            <Col style={{ alignSelf: 'end', marginBottom: 30 }}>
              <Upload
                maxCount={1}
                customRequest={customRequest}
                accept='image/*'
                previewFile={() => null}
                iconRender={() => null}
                itemRender={() => null}>
                <Button
                  type='primary'
                  icon={<UploadOutlined />}
                  loading={loading}>
                  تعديل الصورة الشخصية
                </Button>
              </Upload>
            </Col>
          </Row>
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
              <EditProfileTab />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </DoctorLayout>
  );
}
