import { Col, Row, Spin, Typography } from 'antd';
import { doctorGetMyPatients } from 'api/doctor';
import { useQuery } from 'react-query';

import DoctorLayout from 'components/doctor/DoctorLayout';
import PatientCard from './PatientCard';

export default function DoctorPatientsView() {
  const { data: patients, isLoading } = useQuery(
    'doctor-patients',
    doctorGetMyPatients,
  );

  return (
    <DoctorLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>قائمة المرضى</Typography.Title>
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
              {patients.map((patient) => (
                <Col span={6} key={patient._id}>
                  <PatientCard patient={patient} />
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </DoctorLayout>
  );
}
