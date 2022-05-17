import CNBooking from '../../components/booking/CnBooking';
import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import BreadCrumb from '../../components/BreadCrumb';
import { Container } from '@mui/material';
import { capitalize } from '@material-ui/core';

const LRBooking = ({ data, totalCount }) => {
  const { data: session } = useSession();
  const token = session.user.access_token;

  // 

  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 10));
  const [rows, setRows] = useState(data);
  const [slug, setSlug] = useState('');

  useEffect(() => {
    if (slug !== '') {
      fetchData(slug);
    }
  }, [slug]);

  const fetchData = async (newSlug) => {
    const req = await fetch(`${process.env.apiUrl}/lr-bookings${newSlug}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const newData = await req.json();
    var data = [];
    if (newData.status == 'success') {
      data = newData.data;
    }
    else {
      alert('No Record Found ')
    }

    setRows(data);
  };

  const searchData = (searchingElement) => {
    if (searchingElement.type === 'pagination') {
      setSlug(`/${searchingElement.key}`);
    } else {
      setSlug(`/1/${searchingElement.key}`);
    }
  };
  const column = [
    '#',
    'CN No.',
    'Consignor',
    'Consignee',
    'From',
    'To',
    'Amount',
    'Status',
    'Action'
  ];

  return (
    <div>
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <BreadCrumb />
      </Container>

      <CNBooking
        column={column}
        rows={rows}
        setSlug={setSlug}
        searchData={searchData}
        totalPages={totalPages}
      />
    </div>
  );
};

export default LRBooking;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    try {
      const req = await fetch(`${process.env.apiUrl}/lr-bookings`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await req.json();
      var totalCount = 0;
      if (res.status === 'success') {
        var data = res.data;
        totalCount = res.totalCount
      } else {
        var data = [];
      }
    } catch (err) {

      var data = [];
    }
  } else {
    var data = [];
  }

  return { props: { data, totalCount } };
}
