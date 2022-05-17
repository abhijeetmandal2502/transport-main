import { Box, Container, Grid, Typography } from '@material-ui/core';
import Button from '@mui/material/Button';
import BreadCrumb from '../../components/BreadCrumb';
import TableComponent from '../../components/TableComponent';
import { useRouter } from 'next/router';
import { Print } from '@material-ui/icons';
import { useSession, getSession } from 'next-auth/react';

const actionButton = (id, router) => {
  const callUrl = (recieptName) => {
    router.push(
      {
        pathname: `/receipt/bilty-invoice/${recieptName}`,
        query: { invoiceId: id },
      },
      `/receipt/bilty-invoice/${recieptName}`
    );
  };

  return (
    <>
      <div>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginRight: '2px', fontSize: 8, fontWeight: 700 }}
          onClick={() => callUrl('driver-copy')}
        >
          Driver Copy
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginRight: '2px', fontSize: 8, fontWeight: 700 }}
          onClick={() => callUrl('consignor-copy')}
        >
          Consignor Copy
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginRight: '2px', fontSize: 8, fontWeight: 700 }}
          onClick={() => callUrl('consignee-copy')}
        >
          Consignee Copy
        </Button>
      </div>
      <div>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginRight: '2px', fontSize: 8, fontWeight: 700 }}
          onClick={() => callUrl('transporter-copy')}
        >
          Transorter Copy
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{ marginRight: '2px', fontSize: 8, fontWeight: 700 }}
          onClick={() => callUrl('extra-copy')}
        >
          Extra Copy
        </Button>
      </div>
    </>
  );
};

const GeneratedBilty = ({ data }) => {
  // grab data form api
  const router = useRouter();

  const printAll = (id) => {
    router.push(
      {
        pathname: `/receipt/bilty-invoice-all/`,
        query: { invoiceId: id },
      },
      `/receipt/bilty-invoice/bilty-invoice-all/`
    );
  };

  const rows = [];
  var i = 1;
  data.map((item) => {
    var vehicleNo = item.vehicle_no;
    var tempArr = [];
    if (item.bilty_count > 0) {
      item.bilties.map((bilty) => {
        rows.push([
          i + '.',
          bilty.invoice_no,
          item.shipment_no,
          bilty.booking_id,
          bilty.goods_value,
          vehicleNo.toUpperCase(),
          actionButton(bilty.id, router),
          //   <Print onClick={() => printAll(bilty.id)} />,
          <Button
            variant="outlined"
            size="small"
            sx={{ marginRight: '2px', fontSize: 8, fontWeight: 700 }}
            onClick={() => printAll(bilty.id)}
            key={i}
          >
            View All
          </Button>,
        ]);
        i++;
      });
    }
  });

  const column = [
    '#',
    'Invoice No',
    'Shipment No',
    'LR/CN No',
    'Amount',
    'Vehicle No',
    'Actions',
    'All',
  ];
  return (
    <>
      <BreadCrumb />
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              List of Generated Bilty
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            ></Box>
          </Grid>
        </Grid>

        <TableComponent column={column} rows={rows} />
      </Container>
    </>
  );
};

export default GeneratedBilty;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const res = await fetch(
      `${process.env.apiUrl}/lr-bookings-status/loading`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();
    var data = [];
    if (result.status === 'success') {
      data = result.data;
    }
  } else {
    var data = [];
  }

  // Pass data to the page via props
  return { props: { data } };
}

// pushed with empty space
