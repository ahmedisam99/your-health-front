import { Button, Image, message, Space, Typography } from 'antd';
import { doctorEndPatient } from 'api/doctor';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import styles from './style.module.css';

export default function PatientCard({ patient }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleEnd = async () => {
    setLoading(true);

    try {
      await doctorEndPatient(patient._id);
      await queryClient.invalidateQueries('doctor-patients');

      message.success('تم إنهاء الحالة بنجاح');
    } catch (error) {
      message.error(error.response?.data?.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.doctorCard}>
      <Space className='yh-w-100' direction='vertical' align='center' size={10}>
        <Image
          className={styles.img}
          preview={false}
          src={
            patient.profilePicture ||
            'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
          }
          width={80}
          height={80}
        />

        <Typography.Title className='yh-wc' level={5}>
          {patient.name}
        </Typography.Title>
        <Typography.Title
          style={{ fontFamily: 'monospace' }}
          className='yh-wc'
          level={5}>
          {patient.email}
        </Typography.Title>
        <Typography.Title
          style={{ direction: 'ltr' }}
          className='yh-wc'
          level={5}>
          {patient.phoneNumber}
        </Typography.Title>
        <Typography.Title className='yh-wc' level={5}>
          {patient.address}
        </Typography.Title>

        <Space>
          <Button type='primary' onClick={handleEnd} loading={loading}>
            إنهاء
          </Button>

          <Link to={`/patients/${patient._id}`}>
            <Button className='green-btn yh-wc yh-fw-500'>الملف الطبي</Button>
          </Link>
        </Space>
      </Space>
    </div>
  );
}
