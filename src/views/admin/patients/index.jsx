import { useCallback, useMemo } from 'react';
import { Avatar, Button, Col, message, Row, Table, Typography } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { UserOutlined } from '@ant-design/icons';

import AdminLayout from 'components/admin/AdminLayout';
import { adminDeletePatient, adminGetPatients } from 'api/admin';

export default function AdminPatientsView() {
  const {
    data: patients,
    isLoading,
    isFetching,
  } = useQuery('admin-pat', adminGetPatients);
  const queryClient = useQueryClient();
  const mutation = useMutation(adminDeletePatient);

  const onDelete = useCallback(
    (patientId) => {
      mutation.mutate(patientId, {
        onSuccess: async () => {
          queryClient.invalidateQueries('admin-pat');
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
          <Typography.Title level={2}>قائمة المرضى</Typography.Title>
        </Col>

        <Col span={24}>
          <Table
            columns={columns}
            dataSource={patients}
            loading={isLoading || isFetching || mutation.isLoading}
            pagination={{ pageSize: 6 }}
          />
        </Col>
      </Row>
    </AdminLayout>
  );
}
