import {
  Button,
  Col,
  Form,
  Image,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';

import PublicLayout from 'components/PublicLayout';
import logoRed from 'assets/images/logo-red.png';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

const { Option } = Select;

export default function LoginView() {
  const onSubmit = (values) => {
    console.log('values', values);
  };

  return (
    <PublicLayout>
      <Form
        className={styles.login}
        layout='vertical'
        onFinish={onSubmit}
        initialValues={{ as: 'doctor' }}>
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
