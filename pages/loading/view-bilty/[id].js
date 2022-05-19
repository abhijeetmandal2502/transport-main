import React, { useContext, useEffect, useState } from 'react';
import BiltyList from '../../../components/loading/BiltyList';
import { useRouter } from 'next/router';
import BreadCrumb from '../../../components/BreadCrumb';
import { BiltyDataContext } from '../../../helpers/BiltyData';
import { useSession, getSession } from 'next-auth/react';
import useSWR from 'swr';
import { fetchData } from 'next-auth/client/_utils';

const ViewBilty = () => {
  const router = useRouter();

  const lrId = router.query.id;
  const { data: session, status } = useSession();
  const token = session && session.user.access_token;
  const [bilties, setBilties] = useState([]);

  try {
    useEffect(() => {
      fetchData();
    }, [lrId]);

    const fetchData = async () => {
      const req = await fetch(
        `${process.env.apiUrl}/lr-booking/single/${lrId}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      );

      const res = await req.json();
      if (res.status === 'success') {
        const biltyData = res.data;
        setBilties(biltyData[0].bilties);
      }
    };
  } catch (error) {
    // console.log(error)
  }

  return (
    <>
      <BreadCrumb id={lrId} />
      {bilties && <BiltyList id={lrId} biltyData={bilties} />}
    </>
  );
};

export default ViewBilty;
