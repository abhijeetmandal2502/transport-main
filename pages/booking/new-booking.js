import NewBooking from '../../components/booking/newbooking';
import { useSession, getSession } from 'next-auth/react';
import BreadCrumb from '../../components/BreadCrumb';
import { Container } from '@material-ui/core';
import NewBookingNew from '../../components/booking/NewBookingNew';

const Booking = ({ data }) => {
  const originFrom = data.location;

  return (
    <>
      {' '}
      <Container
        maxWidth="md"
        style={{
          maxWidth: 1080,
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        <BreadCrumb />
      </Container>
      <NewBookingNew
        consigneeData={data}
        consignorData={data}
        originFrom={originFrom}
      />
    </>
  );
};

export default Booking;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  var data = [];
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;
    // Fetch data from external API


    const fetchConsignor = await fetch(`${process.env.apiUrl}/consignors`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await fetchConsignor.json();
    if (res.status === 'success') {
      data = res.data;
    } else {
      data = [];
    }

  } else {
    var data = [];
  }

  return { props: { data } };

  // Pass data to the page via props
}
