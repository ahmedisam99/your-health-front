import { Col, Row, Spin, Typography } from 'antd';
import { useQuery } from 'react-query';

import { patientGetMyOrders } from 'api/patient';
import PatientLayout from 'components/patient/PatientLayout';
import OrderCard from './OrderCard';

export default function PatientOrdersView() {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery('pat-orders', patientGetMyOrders);

  return (
    <PatientLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>طلباتي</Typography.Title>
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
    </PatientLayout>
  );
}
