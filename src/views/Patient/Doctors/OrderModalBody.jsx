import { useState } from 'react';
import {
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  message,
  Typography,
} from 'antd';
import { patientCreateOrder } from 'api/patient';
import { useQueryClient } from 'react-query';

export default function OrderModalBody({ doctor, setOrderModal }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const onOrder = async (values) => {
    if (!values.content) return;
    setLoading(true);

    try {
      await patientCreateOrder(values);
      queryClient.refetchQueries('pat-orders');
      queryClient.refetchQueries('doctor-orders');
      message.success('تم إرسال الطلب بنجاح');
      setOrderModal({ open: false, doctor: null });
    } catch (error) {
      message.error(
        error.response?.data?.message || 'حدث خطأ أثناء تحميل المنشورات',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form initialValues={{ doctorId: doctor._id }} onFinish={onOrder}>
      <Descriptions title='تفاصيل الطبيب' bordered layout='vertical' column={4}>
        <Descriptions.Item
          label={<span className='yh-wc yh-fw-600'>الاسم</span>}
          span={2}>
          د. {doctor.name}
        </Descriptions.Item>
        <Descriptions.Item
          label={<span className='yh-wc yh-fw-600'>التخصص</span>}
          span={2}>
          {doctor.specialization}
        </Descriptions.Item>
        <Descriptions.Item
          label={<span className='yh-wc yh-fw-600'>البريد الإلكتروني</span>}
          span={2}>
          {doctor.email}
        </Descriptions.Item>
        <Descriptions.Item
          label={<span className='yh-wc yh-fw-600'>رقم الهاتف</span>}
          span={2}>
          <div style={{ direction: 'ltr', textAlign: 'right' }}>
            {doctor.phoneNumber}
          </div>
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Typography
        className='yh-mb-10'
        style={{
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: 'bold',
          fontSize: 16,
          lineHeight: 1.5715,
        }}>
        تفاصيل الطلب
      </Typography>

      <Form.Item name='doctorId' noStyle>
        <Input type='hidden' />
      </Form.Item>

      <Form.Item name='content' noStyle>
        <Input.TextArea
          style={{ borderRadius: 8 }}
          placeholder='الرجاء إدخال تفاصيل الطلب...'
          autoSize={{ minRows: 5, maxRows: 9 }}
          allowClear
          showCount
        />
      </Form.Item>

      <br />

      <Button
        className='yh-w-100'
        type='primary'
        htmlType='submit'
        loading={loading}>
        طلب حجز
      </Button>
    </Form>
  );
}
