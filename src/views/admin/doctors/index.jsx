import { Avatar, Button, Col, message, Row, Table, Typography } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserOutlined } from '@ant-design/icons';

import AdminLayout from 'components/admin/AdminLayout';
import { adminDeleteDoctor, adminGetDoctors } from 'api/admin';
import { useCallback, useMemo } from 'react';

export default function AdminDoctorsView() {
  const {
    data: doctors,
    isLoading,
    isFetching,
  } = useQuery('admin-doctors', adminGetDoctors);
  const queryClient = useQueryClient();
  const mutation = useMutation(adminDeleteDoctor);

  const onDelete = useCallback(
    (doctorId) => {
      mutation.mutate(doctorId, {
        onSuccess: async () => {
          queryClient.invalidateQueries('admin-doctors');
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
      });
    },
    [mutation, queryClient],
  );

  const columns = useMemo(
    () => [
      {
        title: 'الصورة',
        dataIndex: 'profilePicture',
        key: 'profilePicture',
        render: (txt) => (
          <Avatar
            style={{ border: '1px solid #182533' }}
            alt='Doctor'
            icon={<UserOutlined />}
            src={txt}
            size={50}
          />
        ),
      },
      {
        title: 'الاسم',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'البريد الإلكتروني',
        dataIndex: 'email',
        key: 'email',
        render: (txt) => (
          <Typography style={{ direction: 'ltr' }}>{txt}</Typography>
        ),
      },
      {
        title: 'رقم الهاتف',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        render: (txt) => (
          <Typography style={{ direction: 'ltr' }}>{txt}</Typography>
        ),
      },
      {
        title: 'التخصص',
        dataIndex: 'specialization',
        key: 'specialization',
      },
      {
        title: 'العمليات',
        key: 'action',
        render: (_, record) => (
          <Button type='primary' danger onClick={() => onDelete(record._id)}>
            حذف
          </Button>
        ),
      },
    ],
    [onDelete],
  );

  return (
    <AdminLayout>
      <Row gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title level={2}>قائمة الأطباء</Typography.Title>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            dataSource={doctors}
            loading={isLoading || isFetching || mutation.isLoading}
            pagination={{ pageSize: 6 }}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}
