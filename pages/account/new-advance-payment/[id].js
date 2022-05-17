import React from 'react';
import NewAdvancePaymentForm from '../../../components/account/NewAdvancePaymentForm';
import BreadCrumb from '../../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';

const NewAdvancePayment = (props) => {
  const { petrolPumpData } = props;

  return (
    <>
      <BreadCrumb />
      <NewAdvancePaymentForm petrolPumpData={petrolPumpData} />
    </>
  );
};

export default NewAdvancePayment;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const result = await fetch(`${process.env.apiUrl}/petrol-pumps`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      // method: 'POST',
    });

    const res = await result.json();
    // const petrolPumpData = [];
    // 
    if (res.status === 'success') {
      var petrolPumpData = res.data;
    } else {
      var petrolPumpData = [];
    }
  } else {
    var petrolPumpData = [];
  }

  return { props: { petrolPumpData } };
}
