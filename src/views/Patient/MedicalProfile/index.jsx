import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import {
  patientGetMedicalProfile,
  patientUpdateMedicalProfile,
} from 'api/patient';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import moment from 'moment';

import PatientLayout from 'components/patient/PatientLayout';

export default function PatientMedicalProfileView() {
  const {
    data: medicalProfile,
    isLoading,
    isFetching,
  } = useQuery('pat-medical-profile', patientGetMedicalProfile);
  const queryClient = useQueryClient();
  const mutation = useMutation(patientUpdateMedicalProfile);

  const onFinish = (values) => {
    values.birthDate = new Date(values.birthDate).toISOString();

    mutation.mutate(values, {
      onSuccess: () => {
        queryClient.invalidateQueries('pat-medical-profile');
        message.success('تم تعديل بيانات الملف الطبي بنجاح');
      },
      onError: (error) => {
        message.error(error.response?.data?.message || 'حدث خطأ ما');
      },
    });
  };

  return (
    <PatientLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>الملف الطبي</Typography.Title>
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
            <Form
              onFinish={onFinish}
              layout='vertical'
              initialValues={{
                ...medicalProfile,
                birthDate: moment(medicalProfile.birthDate),
              }}>
              <Row gutter={[20, 20]}>
                <Col span={8}>
                  <Form.Item
                    label='الاسم'
                    name='name'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل الاسم' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='اسم الأب'
                    name='middleName'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل اسم الأب' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='اسم الجد'
                    name='grandFatherName'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل اسم الجد' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='اسم العائلة'
                    name='lastName'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل اسم العائلة' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='الجنس'
                    name='gender'
                    rules={[{ required: true }]}>
                    <Select placeholder='الرجاء اختيار الجنس'>
                      <Select.Option value='m'>ذكر</Select.Option>
                      <Select.Option value='f'>أنثى</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='رقم الهاتف'
                    name='phoneNumber'
                    rules={[{ required: true }]}>
                    <Input
                      style={{ direction: 'ltr', textAlign: 'right' }}
                      placeholder='أدخل رقم الهاتف'
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='تاريخ الميلاد'
                    name='birthDate'
                    rules={[{ required: true }]}>
                    <DatePicker
                      className='yh-w-100'
                      placeholder='أدخل تاريخ الميلاد'
                    />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='رقم الهوية'
                    name='idNumber'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل رقم الهوية' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='المدينة'
                    name='city'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل المدينة' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='الحي/الشارع'
                    name='street'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل الحي/الشارع' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label='مكان الولادة'
                    name='birthCity'
                    rules={[{ required: true }]}>
                    <Input placeholder='أدخل مكان الولادة' />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label='البريد الإلكتروني' name='email'>
                    <Input
                      style={{ direction: 'ltr', textAlign: 'right' }}
                      placeholder='أدخل البريد الإلكتروني'
                    />
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Button
                      className='yh-w-100'
                      type='primary'
                      htmlType='submit'
                      loading={isLoading || isFetching || mutation.isLoading}>
                      حفظ بيانات الملف الطبي
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
      </Row>
    </PatientLayout>
  );
}
