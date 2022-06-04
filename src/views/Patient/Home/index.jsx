import { Col, Row, Typography } from 'antd';

import PatientLayout from 'components/patient/PatientLayout';
import Feed from './Feed';
import styles from './style.module.css';

export default function PatientHomeView() {
  return (
    <PatientLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>الرئيسية</Typography.Title>
        </Col>

        <Col span={16}>
          <Row gutter={[0, 25]}>
            <Col span={24}>
              <Feed />
            </Col>
          </Row>
        </Col>

        <Col span={8}>
          <div className={styles.patientsSection}></div>
        </Col>
      </Row>
    </PatientLayout>
  );
}
