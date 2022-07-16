import { Button, Col, Form, Input, message, Row, Spin } from 'antd';
import { doctorGetProfile, doctorUpdateProfile } from 'api/doctor';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

export default function EditProfileTab() {
  const [loading, setLoading] = useState(false);
  const { data: user, isLoading } = useQuery(
    'doctor-profile',
    doctorGetProfile,
  );
  const queryClient = useQueryClient();

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await doctorUpdateProfile(values);
      await queryClient.invalidateQueries('doctor-me');
      await queryClient.invalidateQueries('doctor-profile');
      message.success('تم تعديل بيانات الملف الشخصي بنجاح');
    } catch (error) {
      message.error(error.response?.data?.message || 'حدث خطأ ما');
    } finally {
      setLoading(false);
    }
  };

  if (isLoading)
    return (
      <Spin
        style={{ padding: 10, marginTop: 15 }}
        className='yh-center-row'
        size='large'
      />
    );

  return (
    <Form
      className='yh-mt-25 yh-mb-25'
      layout='vertical'
      onFinish={onSubmit}
      initialValues={user}>
      <Row gutter={[0, 25]}>
        <Col span={24}>
          <Form.Item
            className='yh-mb-0'
            name='name'
            label='اسم المستخدم'
            rules={[{ required: true }]}>
            <Input placeholder='أدخل اسم المستخدم' />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            className='yh-mb-0'
            name='email'
            label='البريد الإلكتروني'
            rules={[{ type: 'email', required: true }]}>
            <Input placeholder='أدخل بريدك الإلكتروني' type='email' />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            className='yh-mb-0'
            name='specialization'
            label='التخصص'
            rules={[{ required: true }]}>
            <Input placeholder='الرجاء إدخال التخصص' type='text' />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            className='yh-mb-0'
            name='phoneNumber'
            label='رقم الهاتف'
            rules={[{ required: true }]}>
            <Input
              style={{ direction: 'ltr', textAlign: 'right' }}
              placeholder='أدخل رقم الهاتف الخاص بك'
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Button
            className='yh-w-100'
            type='primary'
            htmlType='submit'
            loading={loading}>
            حفظ
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
