import BiltyInvoice from '../../../components/receipt/BiltyInvoice';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession, getSession } from 'next-auth/react';

const Invoice = () => {
  const router = useRouter();

  const invoiceId = router.query.invoiceId;
  const invoiceName = router.query.invoiceName;

  // token from session
  const { data: session } = useSession();
  const token = session.user.access_token;

  const fetcher = (...args) =>
    fetch(...args, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/bilties/${invoiceId}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const result = data.data;
  // 
  return <BiltyInvoice invoiceName={invoiceName} data={result} />;
};

export default Invoice;
// pushed with emptyspace
