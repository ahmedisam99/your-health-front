import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Select,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import Icon, { InfoCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from 'react-query';

import { doctorInstance, patientInstance } from 'api/axios';
import { doctorCreateAccount } from 'api/doctor';
import { patientCreateAccount } from 'api/patient';
import PublicLayout from 'components/PublicLayout';
import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';

const { Option } = Select;

export default function SignupView() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const history = useHistory();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      if (values.as === 'doctor') {
        delete values.as;

        const { accessToken } = await doctorCreateAccount(values);
        localStorage.setItem('doctorAccessToken', accessToken);
        doctorInstance.defaults.headers[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        await queryClient.refetchQueries('doctor-me');
        await queryClient.refetchQueries('doctor-profile');
        history.push('/doctor');
      } else if (values.as === 'patient') {
        delete values.as;

        const { accessToken } = await patientCreateAccount(values);

        localStorage.setItem('patientAccessToken', accessToken);
        patientInstance.defaults.headers[
          'Authorization'
        ] = `Bearer ${accessToken}`;

        await queryClient.refetchQueries('pat-me');
        await queryClient.refetchQueries('pat-profile');
        history.push('/patient');
      } else return;
    } catch (error) {
      message.error(error.response?.data?.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <Form
        className={styles.signup}
        layout='vertical'
        onFinish={onSubmit}
        initialValues={{ as: 'doctor' }}>
        <div className={styles.signupCard}>
          <Row gutter={[0, 25]} justify='center'>
            <Col className='yh-center-row' span={24}>
              <Image
                preview={false}
                src={logoRed}
                alt='logo'
                width={250}
                height='auto'
              />
            </Col>

            <Col className='yh-center-row' span={24}>
              <Typography.Title className='yh-fw-500' level={3}>
                مستخدم جديد
              </Typography.Title>
            </Col>

            <Col className='yh-center-row' span={24}>
              <Form.Item
                className='yh-mb-0'
                name='name'
                label='اسم المستخدم'
                rules={[{ required: true }]}>
                <Input
                  className={styles.input}
                  placeholder='أدخل اسم المستخدم'
                />
              </Form.Item>
            </Col>

            <Col className='yh-center-row' span={24}>
              <Form.Item
                className='yh-mb-0'
                name='email'
                label='البريد الإلكتروني'
                rules={[{ type: 'email', required: true }]}>
                <Input
                  className={styles.input}
                  placeholder='أدخل بريدك الإلكتروني'
                  type='email'
                />
              </Form.Item>
            </Col>

            <Col className='yh-center-row' span={24}>
              <Form.Item
                className='yh-mb-0'
                name='password'
                label='كلمة المرور'
                rules={[{ required: true }]}>
                <Input
                  className={styles.input}
                  placeholder='أدخل كلمة المرور الخاصة بك'
                  type='password'
                />
              </Form.Item>
            </Col>

            <Col className='yh-center-row' span={24}>
              <Form.Item
                className='yh-mb-0'
                name='phoneNumber'
                label={
                  <Space size={5}>
                    رقم الهاتف
                    <Tooltip
                      title={
                        <>
                          أدخل رقم الهاتف مبدوءاً بمقدمة الدولة (مثال:{' '}
                          <div
                            style={{
                              direction: 'ltr',
                              display: 'inline-block',
                            }}>
                            +970
                          </div>
                          )
                        </>
                      }>
                      <Icon className='yh-gc' component={InfoCircleOutlined} />
                    </Tooltip>
                  </Space>
                }
                rules={[{ required: true }]}>
                <Input
                  style={{ direction: 'ltr', textAlign: 'right' }}
                  className={styles.input}
                  placeholder='أدخل رقم الهاتف الخاص بك'
                />
              </Form.Item>
            </Col>

            <Col className='yh-center-row' span={24}>
              <Form.Item
                className='yh-mb-0'
                name='as'
                label='التسجيل كـ'
                rules={[{ required: true }]}>
                <Select className={styles.input}>
                  <Option value='doctor'>طبيب</Option>
                  <Option value='patient'>مريض</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col className='yh-center-row' span={24}>
              <Space direction='vertical'>
                <Button
                  className={['green-btn', styles.input]}
                  type='primary'
                  htmlType='submit'
                  loading={loading}>
                  تسجيل
                </Button>
                <Typography.Title level={5}>
                  لديك حساب بالفعل؟{' '}
                  <Link className={`yh-pc ${styles.link}`} to='/login'>
                    تسجيل الدخول
                  </Link>
                </Typography.Title>
              </Space>
            </Col>
          </Row>
        </div>
      </Form>
    </PublicLayout>
  );
}
