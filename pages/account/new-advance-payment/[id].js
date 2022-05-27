import React from 'react';
import NewAdvancePaymentForm from '../../../components/account/NewAdvancePaymentForm';
import BreadCrumb from '../../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';

const NewAdvancePayment = (props) => {
  const { petrolPumpData, price } = props;
  // console.log("price data ", price)
  return (
    <>
      <BreadCrumb />
      <NewAdvancePaymentForm petrolPumpData={petrolPumpData} price={price} />
    </>
  );
};

export default NewAdvancePayment;

export async function getServerSideProps(ctx) {
  const lrNo = ctx.query.id;
  const session = await getSession(ctx);
  var price = 0;
  var petrolPumpData = []
  try {
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

      // fetch total payment made from this order
      const req = await fetch(`${process.env.apiUrl}/vehicle-fair/${lrNo}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        // method: 'POST',
      });

      const resp = await req.json()
      if (resp.status == 'success') {
        price = resp.amount;
      }
      else {
        price = 0;
      }
    } else {
      var petrolPumpData = [];
    }
  } catch (error) {

  }


  return { props: { petrolPumpData, price } };
}
