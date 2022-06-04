import { Col, Row, Spin, Typography } from 'antd';
import { patientGetDoctors } from 'api/patient';

import PatientLayout from 'components/patient/PatientLayout';
import { useQuery } from 'react-query';
import DoctorCard from './DoctorCard';

export default function PatientDoctorsView() {
  const { data: doctors, isLoading } = useQuery(
    'pat-doctors',
    patientGetDoctors,
  );

  return (
    <PatientLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>قائمة الأطباء</Typography.Title>
        </Col>

        {isLoading ? (
          <Col span={24}>
            <Spin
              style={{ padding: 10, marginTop: 15 }}
              className='yh-center-row'
              size='large'
            />
          </Col>
        ) : (
          <Col span={24}>
            <Row gutter={[15, 15]}>
              {doctors.map((doctor) => (
                <Col span={6} key={doctor._id}>
                  <DoctorCard doctor={doctor} />
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </PatientLayout>
  );
}
