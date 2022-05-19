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

export default function SignupView() {
  const onSubmit = (values) => {
    console.log('values', values);
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
                label='رقم الهاتف'
                rules={[{ required: true }]}>
                <Input
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
                  htmlType='submit'>
                  تسجيل الدخول
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
