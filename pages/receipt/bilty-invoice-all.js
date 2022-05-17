// import BiltyInvoice from '../../../components/receipt/BiltyInvoice';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useSession, getSession } from 'next-auth/react';
import BiltyInvoiceAll from '../../components/receipt/BiltyInvoiceAll';
import { Box } from '@mui/material';

const InvoiceAll = () => {
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
  return (
    <Box>
      <BiltyInvoiceAll invoiceName={invoiceName} data={result} />
    </Box>
  );
};

export default InvoiceAll;
// pushed with emptyspace
