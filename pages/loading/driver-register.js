import React from 'react';
import DriverRegister from '../../components/loading/DriverRegister';
import { useSession, getSession } from 'next-auth/react';
import BreadCrumb from '../../components/BreadCrumb';
import { Container } from '@mui/material';

const driverRegister = ({ result }) => {
  return (
    <div>
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <BreadCrumb />
      </Container>
      <DriverRegister data={result} />
    </div>
  );
};

export default driverRegister;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/drivers`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.status === 'success') {
      var result = data.data;
    } else {
      var result = [];
    }

  } else {
    var result = [];
  }

  // Pass data to the page via props
  return { props: { result } };
}
