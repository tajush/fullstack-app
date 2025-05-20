// pages/dashboard.js
import { useEffect, useState } from 'react';
import API from '../../lib/api';
import withAuth from '../../public/components/WithAuth';

function Dashboard() {
  const [data, setData] = useState('');

  useEffect(() => {
    API.get('/auth/dashboard')
      .then((res) => setData(res.data))
      .catch(() => setData('Access denied'));
  }, []);

  return <div>{data}</div>;
}

export default withAuth(Dashboard);
