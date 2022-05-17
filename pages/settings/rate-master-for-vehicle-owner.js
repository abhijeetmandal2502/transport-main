import React from 'react';
import { useRouter } from 'next/router';
import NewBilty from '../../components/loading/NewBilty';
import BreadCrumb from '../../components/BreadCrumb';
import RateForVhOwnerList from '../../components/settings/RateForVhOwnerList';
import { useSession, getSession } from 'next-auth/react';

const RateMasterForVehicleOwner = (props) => {

  const router = useRouter();

  const lrId = router.query.id;

  return (
    <>
      <BreadCrumb id={lrId} />
      <RateForVhOwnerList data={props.data} />
    </>
  );
};

export default RateMasterForVehicleOwner;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(`${process.env.apiUrl}/distances/list`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      // method: 'POST',
    });
    const result = await res.json();

    if (result.status === 'success') {
      var data = result.data;
    } else {
      var data = [];
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}
