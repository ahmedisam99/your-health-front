import { Button, Col, Image, Row, Space, Typography } from 'antd';
import { useQueryClient } from 'react-query';

import { doctorApproveOrder, doctorCancelOrder } from 'api/doctor';
import styles from './style.module.css';

export default function OrderCard({ order }) {
  const queryClient = useQueryClient();

  const handleCancel = async () => {
    try {
      await doctorCancelOrder(order._id);
      queryClient.refetchQueries('pat-orders');
      queryClient.refetchQueries('doctor-orders');
      queryClient.refetchQueries('doctor-reports');
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async () => {
    try {
      await doctorApproveOrder(order._id);
      queryClient.refetchQueries('pat-orders');
      queryClient.refetchQueries('doctor-orders');
      queryClient.refetchQueries('doctor-patients');
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
              order.patient?.profilePicture ||
              'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png'
            }
            width={100}
          />

          <Typography.Title className='yh-wc' level={5}>
            {order.patient?.name}
          </Typography.Title>
          <Typography.Title
            style={{ fontFamily: 'monospace' }}
            className='yh-wc'
            level={5}>
            {order.patient?.email}
          </Typography.Title>
          <Typography.Title
            style={{ direction: 'ltr' }}
            className='yh-wc'
            level={5}>
            {order.patient?.phoneNumber}
          </Typography.Title>
          <Typography.Title className='yh-wc' level={5}>
            {order.patient?.address}
          </Typography.Title>
        </Space>
      </Col>

      <Col className={styles.orderCardContentCard} span={17}>
        <Typography.Title level={3}>تفاصيل الطلب</Typography.Title>

        <Typography.Paragraph className={styles.orderCardContentCardPara}>
          {order.content}
        </Typography.Paragraph>

        <Space className={styles.orderCardContentCardBtnsSpace}>
          <Button type='primary' onClick={handleCancel}>
            إلغاء الطلب
          </Button>

          <Button
            className={styles.orderCardContentCardSucessBtn}
            onClick={handleApprove}
            type='primary'>
            قبول الطلب
          </Button>
        </Space>
      </Col>
    </Row>
  );
}
