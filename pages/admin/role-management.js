import { Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import AddNewRole from '../../components/buttons/AddNewRole';
import NewBooking from '../../components/buttons/NewBooking';
import BreadCrumb from '../../components/BreadCrumb';
import TableComponent from '../../components/TableComponent';
import Link from 'next/link';
import { Add } from '@material-ui/icons';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const RoleManagement = ({ roleData }) => {

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // buttons

  const UpdateRoleButton = (props) => {
    return (
      <Link href={`/admin/update-role/${props.slug}`}>
        <Button className="newbookingbtn" variant="outlined" size="small">
          Update Role
        </Button>
      </Link>
    );
  };

  const columns = [
    'Role Id',
    'Role Name',

    'Update ',
  ];
  //   rows

  const [rowsData, setRowsData] = useState(roleData);
  const rows = [];

  var i = 1;
  if (rowsData !== null && rowsData !== undefined) {
    if (rowsData.length > 0) {
      rowsData.map((item, key) => {

        // 
        // setBookingNo(item.lr_id);
        rows.push([
          item.id,
          item.role_name,
          <UpdateRoleButton slug={item.role_slug} key={key} />,
        ]);
        i++;
      });
    }
  }
  //  end of rows

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const searchString = (searchValue) => {

    const filteredRows = rowsData.filter((row) => {
      return row.role_name
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        );
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(roleData);
  };
  return (
    <div>
      <BreadCrumb />
      <Grid
        container
        style={{
          marginBottom: { sx: 4, md: 15 },
        }}
      >
        <Grid
          item
          xs={6}
          sm={6}
          style={{
            marginBottom: 4,
            display: 'flex',
          }}
        >
          <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            Role Management
          </Typography>
        </Grid>

        <Grid item xs={6} sm={6}>
          <Box
            style={{
              marginBottom: 4,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Link href="/admin/add-role">
              <Button
                className="newbookingbtn"
                variant="outlined"
                style={{ background: 'green', color: 'white' }}
              >
                <Add style={{ fontSize: '20px' }} />
                Add New Role
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <TableComponent
        rows={rows}
        column={columns}
        searchString={searchString}
        totalPage={5}
        searchName={'Search By Name'}
      />
    </div>
  );
};

export default RoleManagement;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session !== null && session !== undefined) {
    const token = session.user.access_token;
    try {
      const req = await fetch(
        // `${process.env.apiUrl}/vehicle-due-payments`,
        `${process.env.apiUrl}/all-roles`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await req.json();
      if (res.status === 'success') {
        var roleData = res.data;
      } else {
        var roleData = [];
      }
    } catch (err) {

      var roleData = [];
    }
  } else {
    var roleData = [];
  }

  return { props: { roleData } };
}