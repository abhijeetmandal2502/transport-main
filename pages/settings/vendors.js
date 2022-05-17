import { Box, Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import TableComponent from '../../components/TableComponent'
import { useSession, getSession } from 'next-auth/react';
import { useState } from 'react';
import BtnNewBooking from '../../components/buttons/NewBooking';
import UpdateButton from '../../components/buttons/UpdateButton';

const Vendors = ({ data }) => {
    // 
    const [rowsData, setRowsData] = useState(data);
    const column = ['#', 'Main Vendor', 'Created By User', 'Edit'];



    const rows = [];
    rowsData.map((item, i) => {
        const slug = item.slug.replace(/_/g, '-');
        rows.push([i + 1, item.name, item.created_by, <UpdateButton url={`/edit/edit-vendor/${slug}`} key={i} />])
    })

    var totalPages = Math.ceil(rowsData.length / 10);

    const searchString = (searchValue) => {
        var serachStr = searchValue.replace(/ /g, '_');
        if (searchValue != null) {
        }
        const filteredRows = rowsData.filter((row) => {
            return (row.name.toLowerCase().includes(serachStr.toLowerCase()) || row.name.toLowerCase().includes(serachStr.toLowerCase()));
        });

        setRowsData(filteredRows);

        if (searchValue === '') {
            reset();
        }
    };

    const reset = () => {
        setRowsData(data);
    };

    return (
        <>
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
                        Vendors List
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
                        {/* <BackButton url={'/settings/location-mapping'} /> */}
                        <BtnNewBooking name={'Add vendor'} url={'/settings/add-new-vendor'} />
                    </Box>
                </Grid>
            </Grid>

            <TableComponent column={column} rows={rows} searchName={'Search By Main Vendor'} searchString={searchString} totalPages={totalPages} />
        </>
    );
};

export default Vendors;

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    var data = [];
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;
        try {
            const req = await fetch(`${process.env.apiUrl}/vendors`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await req.json();
            if (res.status === 'success') {
                data = res.data
            } else {
                data = []
            }
        }
        catch (err) {
            data = []
        }

    } else {
        data = [];
    }

    // Pass data to the page via props
    return { props: { data } };
}
