import { Col, Row, Typography } from 'antd';

import PatientLayout from 'components/patient/PatientLayout';
import Feed from './Feed';

export default function PatientHomeView() {
  return (
    <PatientLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>الرئيسية</Typography.Title>
        </Col>

        <Col span={17}>
          <Feed />
        </Col>
      </Row>
    </PatientLayout>
  );
}
