import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Avatar,
  Badge,
  Col,
  Dropdown,
  Image,
  Input,
  message,
  Row,
  Space,
  Spin,
  Typography,
} from 'antd';
import Icon, { UserOutlined, SendOutlined } from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import EmojiPicker from 'emoji-picker-react';
import { ChatList, MessageList } from 'react-chat-elements';

import {
  adminCreateComplaint,
  adminGetComplaints,
  adminGetMe,
} from 'api/admin';
import faceImg from 'assets/icons/face.png';
import styles from './style.module.css';
import AdminLayout from 'components/admin/AdminLayout';
import groupBy from 'lodash.groupby';

export default function AdminComplaintsView() {
  const [admin, setAdmin] = useState(null);
  const [complaint, setComplaint] = useState('');
  const [complaints, setComplaints] = useState(null);
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(true);
  const { data: me } = useQuery('admin-me', adminGetMe);
  const { data, isLoading, isFetching } = useQuery(
    'admin-complaints',
    adminGetComplaints,
  );
  const mutation = useMutation(adminCreateComplaint);
  const queryClient = useQueryClient();

  const onEmojiClick = (_, emoji) => {
    setComplaint(complaint + emoji.emoji);
  };

  const handleCreate = () => {
    if (!complaint || !active) return;

    const splitted = active.split(':');
    const toModel = splitted[0];
    const to = splitted[1];

    mutation.mutate(
      { content: complaint, toModel, to },
      {
        onSuccess: () => {
          queryClient.refetchQueries('admin-complaints');
          setComplaint('');
        },
        onError: (error) => {
          message.error(
            error.response?.data?.message || 'حدث خطأ أثناء تحميل المنشورات',
          );
        },
      },
    );
  };

  useEffect(() => {
    if (data?.[0]?.fromModel === 'Admin') setAdmin(data?.[0]?.to);
    else setAdmin(data?.[0]?.from);

    const _complaints = groupBy(data, (rec) => {
      if (rec?.fromModel === 'Admin') return `${rec?.toModel}:${rec?.to?._id}`;
      else return `${rec?.fromModel}:${rec?.from?._id}`;
    });

    setComplaints(_complaints);
    setActive(Object.keys(_complaints)[0]);
  }, [data]);

  useEffect(() => {
    if (!isLoading && !isFetching && !!admin && !!complaints && !!active)
      setLoading(false);
  }, [active, admin, complaints, isFetching, isLoading]);

  const getTypeInAr = useCallback(
    (model) => (model === 'Doctor' ? 'طبيب' : 'مريض'),
    [],
  );

  const getName = useCallback(
    (name, model) => (model === 'Doctor' ? `د. ${name}` : name),
    [],
  );

  const chatList = useMemo(() => {
    if (!complaints || !active) return [];

    return Object.keys(complaints).map((key) => {
      const isFromMe = complaints?.[key]?.[0]?.fromModel === 'Admin';

      return {
        avatar: isFromMe
          ? complaints?.[key]?.[0]?.to?.profilePicture
          : complaints?.[key]?.[0]?.from?.profilePicture,
        alt: isFromMe
          ? complaints?.[key]?.[0]?.to?.name
          : complaints?.[key]?.[0]?.from?.name,
        title: isFromMe
          ? getName(
              complaints?.[key]?.[0]?.to?.name,
              complaints?.[key]?.[0]?.toModel,
            )
          : getName(
              complaints?.[key]?.[0]?.from?.name,
              complaints?.[key]?.[0]?.fromModel,
            ),
        subtitle: isFromMe
          ? getTypeInAr(complaints?.[key]?.[0]?.toModel)
          : getTypeInAr(complaints?.[key]?.[0]?.fromModel),
        date: complaints?.[key]?.[complaints?.[key]?.length - 1]?.createdAt,
        key,
      };
    });
  }, [active, complaints, getName, getTypeInAr]);

  const messageList = useMemo(() => {
    if (!complaints || !active) return [];

    return complaints?.[active].map((complaint) => {
      const isFromMe = complaint?.fromModel === 'Admin';

      return {
        position: isFromMe ? 'right' : 'left',
        type: 'text',
        title: isFromMe ? 'مدير النظام' : complaint?.from?.name,
        text: complaint.content,
        date: new Date(complaint.createdAt),
        status: 'received',
      };
    });
  }, [active, complaints]);

  const activeUser = useMemo(() => {
    if (!complaints || !active) return [];

    const complaint = complaints?.[active]?.[0];
    const isFromMe = complaint?.fromModel === 'Admin';

    if (isFromMe) return complaint.to;
    else return complaint.from;
  }, [active, complaints]);

  return (
    <AdminLayout>
      <Row className='acv' gutter={[50, 15]}>
        <Col span={24}>
          <Typography.Title className='yh-mb-0' level={2}>
            الشكاوى
          </Typography.Title>
        </Col>

        <Col span={24}>
          {loading ? (
            <Spin
              style={{ padding: 10, marginTop: 15 }}
              className='yh-center-row'
              size='large'
            />
          ) : (
            <Row>
              <Col span={8}>
                <div className={styles.chatListContainer}>
                  <ChatList
                    className='chat-list'
                    dataSource={chatList}
                    onClick={(chatObj) => setActive(chatObj.key)}
                  />
                </div>
              </Col>

              <Col span={16}>
                <div className={styles.chatContainer}>
                  <div className={styles.chatHeader}>
                    <Space
                      className='yh-h-100'
                      direction='horizontal'
                      align='center'
                      size={10}>
                      <Avatar
                        alt={activeUser?.name}
                        icon={<UserOutlined />}
                        src={activeUser?.profilePicture}
                        size={40}
                      />

                      <Typography className='yh-wc'>
                        {activeUser?.name}
                      </Typography>
                    </Space>
                  </div>

                  <div className={styles.chatBody}>
                    <MessageList
                      className='message-list'
                      lockable={true}
                      dataSource={messageList}
                    />
                  </div>

                  <div className={styles.chatFooter}>
                    <Badge color='green' offset={[0, 20]} dot>
                      <Avatar
                        alt='Admin'
                        icon={<UserOutlined />}
                        src={me.profilePicture}
                        size={50}
                      />
                    </Badge>

                    <Input
                      className={styles.chatFooterComplaintInput}
                      type='text'
                      placeholder='اكتب رسالتك هنا'
                      value={complaint}
                      size='small'
                      onChange={(e) => setComplaint(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key !== 'Enter') return;

                        handleCreate();
                      }}
                      suffix={
                        <Space direction='horizontal' align='center' size={10}>
                          <Dropdown
                            trigger={['click']}
                            overlay={
                              <EmojiPicker onEmojiClick={onEmojiClick} />
                            }>
                            <Image
                              style={{ cursor: 'pointer' }}
                              preview={false}
                              src={faceImg}
                              width={24}
                            />
                          </Dropdown>

                          <Icon
                            onClick={handleCreate}
                            className={styles.chatFooterActionsIcon}
                            component={SendOutlined}
                          />
                        </Space>
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </AdminLayout>
  );
}
