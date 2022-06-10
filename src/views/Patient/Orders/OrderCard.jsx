import { Button, Col, Image, Row, Space, Typography } from 'antd';
import { useQueryClient } from 'react-query';

import { patientCancelOrder } from 'api/patient';
import styles from './style.module.css';

export default function OrderCard({ order }) {
  const queryClient = useQueryClient();

  const handleCancel = async () => {
    try {
      await patientCancelOrder(order._id);
      queryClient.refetchQueries('pat-orders');
      queryClient.refetchQueries('doctor-orders');
      queryClient.refetchQueries('doctor-reports');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row className={styles.orderCard} gutter={0}>
      <Col className={styles.orderCardDoctorCard} span={7}>
        <Space
          className='yh-w-100'
          direction='vertical'
          align='center'
          size={10}>
          <Image
            className={styles.img}
            preview={false}
            src={
              order.doctor.profilePicture ||
              'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
            }
            width={100}
          />

          <Typography.Title className='yh-wc' level={5}>
            د. {order.doctor.name}
          </Typography.Title>
          <Typography.Title className='yh-wc' level={5}>
            {order.doctor.specialization}
          </Typography.Title>
          <Typography.Title
            style={{ fontFamily: 'monospace' }}
            className='yh-wc'
            level={5}>
            {order.doctor.email}
          </Typography.Title>
          <Typography.Title
            style={{ direction: 'ltr' }}
            className='yh-wc'
            level={5}>
            {order.doctor.phoneNumber}
          </Typography.Title>
        </Space>
      </Col>

      <Col className={styles.orderCardContentCard} span={17}>
        <Typography.Title level={3}>تفاصيل الطلب</Typography.Title>

        <Typography.Paragraph className={styles.orderCardContentCardPara}>
          {order.content}
        </Typography.Paragraph>

        <Button
          className={styles.orderCardContentCardBtn}
          type='primary'
          onClick={handleCancel}>
          إلغاء الطلب
        </Button>
      </Col>
    </Row>
  );
}
