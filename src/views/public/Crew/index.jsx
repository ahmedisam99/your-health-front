import { Col, Image, Row, Space, Typography } from 'antd';

import PublicLayout from 'components/PublicLayout';
import pulseImage from 'assets/images/pulse.png';
import d1 from 'assets/images/doctors/d1.png';
import d2 from 'assets/images/doctors/d2.png';
import d3 from 'assets/images/doctors/d3.png';
import d4 from 'assets/images/doctors/d4.png';
import d5 from 'assets/images/doctors/d5.png';
import d6 from 'assets/images/doctors/d6.png';
import p1 from 'assets/images/patients/p1.webp';
import p2 from 'assets/images/patients/p2.jpeg';
import p3 from 'assets/images/patients/p3.webp';
import p4 from 'assets/images/patients/p4.webp';
import styles from './style.module.css';

console.log('p1', p1);
console.log('p2', p2);
console.log('p3', p3);
console.log('p4', p4);

const doctors = [
  {
    name: 'منى محمد الجزار',
    speciality: 'أخصائي باطنة',
    email: 'example@example.com',
    phoneNumber: '+9722121212121',
    image: d1,
  },
  {
    name: 'أحمد سمير الكحلوت',
    speciality: 'أخصائي عظام',
    email: 'example@example.com',
    phoneNumber: '+9722121212121',
    image: d2,
  },
  {
    name: 'يوسف نعمان الجزار',
    speciality: 'أخصائي نساء وولادة',
    email: 'example@example.com',
    phoneNumber: '+9722121212121',
    image: d3,
  },
  {
    name: 'محمد منير أبو الكاس',
    speciality: 'أخصائي عظام',
    email: 'example@example.com',
    phoneNumber: '+9722121212121',
    image: d4,
  },
  {
    name: 'غادة عبد الرحمن البشيتي',
    speciality: 'أمراض الدم',
    email: 'example@example.com',
    phoneNumber: '+9722121212121',
    image: d5,
  },
  {
    name: 'محمد عبد الرحمن صباح',
    speciality: 'مسالك بولية',
    email: 'example@example.com',
    phoneNumber: '+9722121212121',
    image: d6,
  },
];

export default function CrewView() {
  return (
    <PublicLayout>
      <div className={styles.crew}>
        <Row gutter={[0, 35]} justify='center'>
          <Col>
            <Space direction='horizontal' align='center' size={20}>
              <Image preview={false} src={pulseImage} alt='Pulse' />
              <Typography.Title className={styles.title} level={1}>
                الطاقم الطبي
              </Typography.Title>
              <Image preview={false} src={pulseImage} alt='Pulse' />
            </Space>
          </Col>

          <Col span={24}>
            <Row gutter={[25, 25]} justify='center'>
              {doctors.map((doctor, idx) => (
                <Col className={styles.cardCol} key={idx} span={8}>
                  <div className={styles.card}>
                    <Space
                      className='yh-w-100'
                      direction='vertical'
                      align='center'
                      size={15}>
                      <Image
                        className={styles.img}
                        preview={false}
                        src={doctor.image}
                        width={220}
                      />

                      <Typography.Title className='yh-wc' level={4}>
                        {doctor.name}
                      </Typography.Title>
                      <Typography.Title className='yh-wc' level={4}>
                        {doctor.speciality}
                      </Typography.Title>
                      <Typography.Title className='yh-wc' level={4}>
                        {doctor.email}
                      </Typography.Title>
                      <Typography.Title
                        style={{ direction: 'ltr' }}
                        className='yh-wc'
                        level={4}>
                        {doctor.phoneNumber}
                      </Typography.Title>
                    </Space>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </PublicLayout>
  );
}
