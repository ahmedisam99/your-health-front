import { Button, Col, Form, Image, Input, Row, Space, Typography } from 'antd';
import { PushpinFilled, MailFilled, PhoneFilled } from '@ant-design/icons';

import PublicLayout from 'components/PublicLayout';
import pulseImage from 'assets/images/pulse.png';
import styles from './style.module.css';

export default function ContactView() {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <PublicLayout>
      <div className={styles.contact}>
        <Row gutter={[0, 15]} justify='center'>
          <Col>
            <Space direction='horizontal' align='center' size={20}>
              <Image preview={false} src={pulseImage} alt='Pulse' />
              <Typography.Title className={styles.title} level={1}>
                تواصل معنا
              </Typography.Title>
              <Image preview={false} src={pulseImage} alt='Pulse' />
            </Space>
          </Col>

          <Col span={24}>
            <Row gutter={[50, 0]}>
              <Col span={16}>
                <Form layout='vertical' onFinish={onSubmit}>
                  <Form.Item
                    name='name'
                    label='الإسم'
                    rules={[{ required: true }]}>
                    <Input type='text' placeholder='أدخل الاسم' />
                  </Form.Item>

                  <Form.Item
                    name='email'
                    label='البريد الإلكتروني'
                    rules={[{ type: 'email', required: true }]}>
                    <Input type='email' placeholder='أدخل بريدك الإلكتروني' />
                  </Form.Item>

                  <Form.Item
                    name='title'
                    label='عنوان الرسالة'
                    rules={[{ required: true }]}>
                    <Input type='text' placeholder='أدخل عنوان الرسالة' />
                  </Form.Item>

                  <Form.Item
                    name='message'
                    label='الرسالة'
                    rules={[{ required: true }]}>
                    <Input.TextArea placeholder='أدخل رسالتك' rows={6} />
                  </Form.Item>

                  <Form.Item noStyle>
                    <Button type='primary' size='large' htmlType='submit'>
                      إرسال
                    </Button>
                  </Form.Item>
                </Form>
              </Col>

              <Col span={8}>
                <br />
                <br />
                <Space direction='vertical' align='start' size={20}>
                  <Space direction='horizontal' align='center' size={15}>
                    <PushpinFilled className={styles.icon} />

                    <Typography.Title level={3}>
                      قطاع غزة - رفح - البلد
                    </Typography.Title>
                  </Space>

                  <Space direction='horizontal' align='center' size={15}>
                    <MailFilled className={styles.icon} />

                    <Typography.Title level={3}>
                      example@example.com
                    </Typography.Title>
                  </Space>

                  <Space direction='horizontal' align='center' size={15}>
                    <PhoneFilled className={styles.icon} />

                    <Typography.Title level={3}>+972595659707</Typography.Title>
                  </Space>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </PublicLayout>
  );
}
