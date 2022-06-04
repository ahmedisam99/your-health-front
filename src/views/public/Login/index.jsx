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
  Typography,
} from 'antd';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';

import { doctorLogin } from 'api/doctor';
import PublicLayout from 'components/PublicLayout';
import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';
import { patientLogin } from 'api/patient';
import { doctorInstance, patientInstance } from 'api/axios';

const { Option } = Select;

export default function LoginView() {
  const doctorMutation = useMutation(doctorLogin);
  const patientMutation = useMutation(patientLogin);
  const queryClient = useQueryClient();

  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const onSubmit = (values) => {
    if (values.as === 'doctor') {
      doctorMutation.mutate(
        { email: values.email, password: values.password },
        {
          onSuccess: async ({ accessToken }) => {
            localStorage.setItem('doctorAccessToken', accessToken);
            doctorInstance.defaults.headers[
              'Authorization'
            ] = `Bearer ${accessToken}`;

            await queryClient.invalidateQueries('doctor-me');
            history.push('/doctor');
          },
          onError: (mutationError) => {
            if (
              mutationError?.response?.status === 400 &&
              Array.isArray(mutationError?.response?.data?.message)
            ) {
              mutationError.response.data.message.forEach((msg) => {
                message.error(msg);
              });
            } else {
              message.error(
                mutationError?.response?.data?.message ||
                  mutationError?.message,
              );
            }
          },
        },
      );
    } else if (values.as === 'patient') {
      patientMutation.mutate(
        { email: values.email, password: values.password },
        {
          onSuccess: async ({ accessToken }) => {
            localStorage.setItem('patientAccessToken', accessToken);
            patientInstance.defaults.headers[
              'Authorization'
            ] = `Bearer ${accessToken}`;

            await queryClient.invalidateQueries('pat-me');
            history.push('/patient');
          },
          onError: (mutationError) => {
            if (
              mutationError?.response?.status === 400 &&
              Array.isArray(mutationError?.response?.data?.message)
            ) {
              mutationError.response.data.message.forEach((msg) => {
                message.error(msg);
              });
            } else {
              message.error(
                mutationError?.response?.data?.message ||
                  mutationError?.message,
              );
            }
          },
        },
      );
    } else return;
  };

  return (
    <PublicLayout>
      <Form
        className={styles.login}
        layout='vertical'
        onFinish={onSubmit}
        initialValues={{ as: params.get('as') || 'doctor' }}>
        <div className={styles.loginCard}>
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
                تسجيل الدخول
              </Typography.Title>
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
                name='as'
                label='تسجيل الدخول كـ'
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
                  loading={doctorMutation.isLoading}
                  htmlType='submit'>
                  تسجيل الدخول
                </Button>
                <Typography.Title level={5}>
                  ليس لديك حساب ؟{' '}
                  <Link className={`yh-pc ${styles.link}`} to='/signup'>
                    سجّل الان
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
