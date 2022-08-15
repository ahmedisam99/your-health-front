import { Button, Image, Space, Typography } from 'antd';

import styles from './style.module.css';

export default function DoctorCard({ doctor, setOrderModal }) {
  return (
    <div className={styles.doctorCard}>
      <Space className='yh-w-100' direction='vertical' align='center' size={10}>
        <Image
          className={styles.img}
          preview={false}
          src={
            doctor.profilePicture ||
            'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
          }
          width={80}
          height={80}
        />

        <Typography.Title className='yh-wc' level={5}>
          د. {doctor.name}
        </Typography.Title>
        <Typography.Title className='yh-wc' level={5}>
          {doctor.specialization}
        </Typography.Title>
        <Typography.Title
          style={{ fontFamily: 'monospace' }}
          className='yh-wc'
          level={5}>
          {doctor.email}
        </Typography.Title>
        <Typography.Title
          style={{ direction: 'ltr' }}
          className='yh-wc'
          level={5}>
          {doctor.phoneNumber}
        </Typography.Title>

        <Button
          type='primary'
          onClick={() => setOrderModal({ open: true, doctor })}>
          طلب حجز
        </Button>
      </Space>
    </div>
  );
}
