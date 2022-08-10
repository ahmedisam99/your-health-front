import { Col, Descriptions, Row, Spin, Typography } from 'antd';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { doctorGetPatientMedicalProfile } from 'api/doctor';
import DoctorLayout from 'components/doctor/DoctorLayout';
import './style.css';

export default function DoctorPatientView() {
  const { patientId } = useParams();
  const { data: medicalProfile, isLoading } = useQuery(
    ['doctor-pat-medical-profile', patientId],
    () => doctorGetPatientMedicalProfile(patientId),
  );

  console.log('medicalProfile', medicalProfile);

  return (
    <DoctorLayout>
      <Row gutter={[50, 15]} className='dpv'>
        <Col span={24}>
          <Typography.Title level={2}>الملف الطبي لمريض</Typography.Title>
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
            <Descriptions layout='vertical' bordered column={4}>
              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>الاسم</Typography>}>
                {medicalProfile?.name || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>اسم الأب</Typography>}>
                {medicalProfile?.middleName || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>اسم الجد</Typography>}>
                {medicalProfile?.grandFatherName || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>اسم العائلة</Typography>}>
                {medicalProfile?.lastName || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>الجنس</Typography>}>
                {medicalProfile?.gender === 'm'
                  ? 'ذكر'
                  : medicalProfile?.gender === 'f'
                  ? 'أنثى'
                  : '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>رقم الهاتف</Typography>}>
                <Typography style={{ direction: 'ltr', textAlign: 'right' }}>
                  {medicalProfile?.phoneNumber || '-'}
                </Typography>
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={
                  <Typography className='yh-wc'>تاريخ الميلاد</Typography>
                }>
                {medicalProfile?.birthDate
                  ? new Date(medicalProfile?.birthDate).toLocaleDateString()
                  : '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>رقم الهوية</Typography>}>
                {medicalProfile?.idNumber || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>المدينة</Typography>}>
                {medicalProfile?.city || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={<Typography className='yh-wc'>الحي/الشارع</Typography>}>
                {medicalProfile?.street || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={
                  <Typography className='yh-wc'>مدينة الميلاد</Typography>
                }>
                {medicalProfile?.birthCity || '-'}
              </Descriptions.Item>

              <Descriptions.Item
                span={2}
                label={
                  <Typography className='yh-wc'>البريد الإلكتروني</Typography>
                }>
                {medicalProfile?.email || '-'}
              </Descriptions.Item>
            </Descriptions>
          </Col>
        )}
      </Row>
    </DoctorLayout>
  );
}
