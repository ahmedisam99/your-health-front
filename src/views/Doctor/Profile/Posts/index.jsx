import { useCallback, useEffect, useState } from 'react';
import { message } from 'antd';

import { doctorGetMyPosts } from 'api/doctor';
import Feed from './Feed';

export default function PostsTab() {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const nextPage = page + 1;
      const data = await doctorGetMyPosts(nextPage);

      setPosts([...posts, ...data.posts]);
      setPage(nextPage);
    } catch (error) {
      message.error(error.message);
    }
  }, [page, posts]);

  useEffect(() => {
    (async () => {
      try {
        const data = await doctorGetMyPosts(1);

        setPosts(data.posts || []);
        setTotal(data.total || 0);
      } catch (error) {
        message.error(
          error.response?.data?.message || 'حدث خطأ أثناء تحميل المنشورات',
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Feed loading={loading} posts={posts} fetchData={fetchData} total={total} />
  );
}
