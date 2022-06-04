import { useState } from 'react';
import { Col, Modal, Row, Spin, Typography } from 'antd';
import { patientGetDoctors } from 'api/patient';

import PatientLayout from 'components/patient/PatientLayout';
import { useQuery } from 'react-query';
import DoctorCard from './DoctorCard';
import OrderModalBody from './OrderModalBody';

export default function PatientDoctorsView() {
  const [orderModal, setOrderModal] = useState({
    open: false,
    doctor: null,
  });
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
                  <DoctorCard doctor={doctor} setOrderModal={setOrderModal} />
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>

      <Modal
        title='تقدم بطلب جديد'
        visible={orderModal.open}
        destroyOnClose
        footer={null}
        onCancel={() => setOrderModal({ open: false, doctor: null })}>
        <OrderModalBody
          doctor={orderModal.doctor}
          setOrderModal={setOrderModal}
        />
      </Modal>
    </PatientLayout>
  );
}
