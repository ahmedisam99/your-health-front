import { useState } from 'react';
import {
  Avatar,
  Col,
  Image,
  Row,
  Space,
  Typography,
  Upload,
  Button,
  message,
} from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from 'react-query';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { patientGetMe, patientUpdateProfilePicture } from 'api/patient';
import virusImg from 'assets/images/virus.png';
import styles from './style.module.css';
import EditProfileTab from './EditProfile';
import PatientLayout from 'components/patient/PatientLayout';

export default function PatientProfileView() {
  const [loading, setLoading] = useState(false);
  const { data: user } = useQuery('pat-me', patientGetMe);
  const queryClient = useQueryClient();

  const customRequest = async ({ file, onSuccess }) => {
    setLoading(true);

    try {
      const storage = getStorage();

      const imgRef = ref(storage, `patient/${file.uid}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);

      await patientUpdateProfilePicture(url);
      queryClient.invalidateQueries('pat-me');
      message.success('تم تغيير الصورة الشخصية بنجاح');
    } catch (error) {
      message.error(error.response?.data?.message || 'حدث خطأ ما');
    } finally {
      onSuccess('ok');
      setLoading(false);
    }
  };

  return (
    <PatientLayout isProfileView>
      <div className={styles.header}>
        <Image src={virusImg} preview={false} width='100%' height='auto' />
      </div>

      <Row className={styles.content} gutter={[0, 30]}>
        <Col span={24}>
          <Row justify='space-between'>
            <Col>
              <Space direction='horizontal' align='end' size={10}>
                <Avatar
                  alt='Patient'
                  icon={<UserOutlined />}
                  src={user.profilePicture}
                  size={window.innerWidth <= 1400 ? 150 : 200}
                />

                <Space direction='vertical' align='start' size={5}>
                  <Typography.Title level={4}>{user.name}</Typography.Title>

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
          <EditProfileTab />
        </Col>
      </Row>
    </PatientLayout>
  );
}
