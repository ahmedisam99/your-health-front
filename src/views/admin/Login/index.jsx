import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { useQueryClient, useMutation } from 'react-query';

import { adminInstance } from 'api/axios';
import { adminLogin } from 'api/admin/login';
import PublicLayout from 'components/PublicLayout';
import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';

export default function AdminLoginView() {
  const adminMutation = useMutation(adminLogin);
  const queryClient = useQueryClient();

  const history = useHistory();

  const onSubmit = (values) => {
    adminMutation.mutate(
      { email: values.email, password: values.password },
      {
        onSuccess: async ({ accessToken }) => {
          localStorage.setItem('admin', accessToken);
          adminInstance.defaults.headers[
            'Authorization'
          ] = `Bearer ${accessToken}`;

          await queryClient.invalidateQueries('admin-me');
          history.push('/admin');
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
              mutationError?.response?.data?.message || mutationError?.message,
            );
          }
        },
      },
    );
  };

  return (
    <PublicLayout>
      <Form className={styles.login} layout='vertical' onFinish={onSubmit}>
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
              <Space direction='vertical'>
                <Button
                  className={['green-btn', styles.input]}
                  type='primary'
                  loading={adminMutation.isLoading}
                  htmlType='submit'>
                  تسجيل الدخول
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Form>
    </PublicLayout>
  );
}
