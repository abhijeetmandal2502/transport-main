import React from 'react';
import TrackAssociationInvoice from '../../../components/receipt/TrackAssociationInvoice';
import useSWR from 'swr';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const TruckAssociation = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const token = session.user.access_token;
  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/bilties/${router.query.id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  var res = [];
  if (data.status === 'success') {
    res = data.data;
  }



  return (
    <div>
      {data.status === 'success' ? (
        <TrackAssociationInvoice info={res} />
      ) : null}
    </div>
  );
};

export default TruckAssociation;
