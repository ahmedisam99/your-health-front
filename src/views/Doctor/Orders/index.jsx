import { Col, Row, Spin, Typography } from 'antd';
import { useQuery } from 'react-query';

import { doctorGetMyOrders } from 'api/doctor';
import DoctorLayout from 'components/doctor/DoctorLayout';
import OrderCard from './OrderCard';

export default function DoctorOrdersView() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery('doctor-orders', doctorGetMyOrders);

  return (
    <DoctorLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>الطلبات</Typography.Title>
        </Col>

        {isLoading && !isError ? (
          <Col span={24}>
            <Spin
              style={{ padding: 10, marginTop: 15 }}
              className='yh-center-row'
              size='large'
            />
          </Col>
        ) : (
          <Col span={24}>
            <Row gutter={[0, 20]}>
              {orders.map((order) => (
                <Col key={order._id} span={24}>
                  <OrderCard order={order} />
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </DoctorLayout>
  );
}
