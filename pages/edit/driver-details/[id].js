import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Input,
    Paper,
    Select,
    Typography,
} from '@material-ui/core';
import { Add, DoubleArrow, Search } from '@material-ui/icons';
import {
    Autocomplete,
    OutlinedInput,
    TextareaAutosize,
    TextField,
} from '@mui/material';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import BackButton from '../../../components/buttons/BackButton';
import { country, state } from '../../../components/Utils';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';


const DriverDetails = ({ driverData }) => {
    const router = useRouter();


    const [driverId, setDriverId] = useState(driverData.id)
    const driverStatus = [{ label: 'Active' }, { label: 'Deactive' }]

    // get token form session
    const { data: session } = useSession();
    const token = session.user.access_token;

    const url = '/loading/driver-register';
    const vehileOwnership = [{ label: 'India' }, { label: 'Nepal' }];
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmit = async (data) => {
        const res = await fetch(`${process.env.apiUrl}/update-driver/${driverId}`, {
            body: JSON.stringify({
                name: data.driver_name,
                mobile: data.mobile_no,
                DL_no: data.dl_no,
                DL_expire: data.expiry_date,
                address: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                status: data.status.toLowerCase(),
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
        });
        const result = await res.json();

        if (result.status === 'success') {
            var message = result.message;
            enqueueSnackbar(message, {
                variant: 'success',
            });
            router.push('/loading/driver-register');
        } else {
            var message = result.errors[0];
            result.errors.map((item) => {
                enqueueSnackbar(item, { variant: 'error' });
            });
        }
    };

    return (
        <div>
            {' '}
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
                        New Driver{' '}
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
                        <BackButton url={url} />
                    </Box>
                </Grid>
            </Grid>
            <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={12} sm={12} md={6}>
                    {' '}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Container
                            style={{
                                alignItems: 'center',
                                paddingLeft: 0,
                                paddingRight: 0,
                                marginTop: 5,
                                marginBottom: 5,
                            }}
                        >
                            <Paper
                                sx={{ width: '100%', overflow: 'hidden' }}
                                style={{ paddingBottom: 16, paddingTop: 16 }}
                                elevation={4}
                            >
                                <Typography
                                    variant="h6"
                                    style={{
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        paddingBottom: 16,
                                    }}
                                >
                                    Driver Details
                                </Typography>
                                <Divider />
                                <Box
                                    style={{
                                        display: 'block',
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        paddingTop: 16,
                                        paddingBottom: 16,
                                    }}
                                >
                                    <Box
                                        //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>Driver Name</Typography>
                                        <Box
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            <OutlinedInput
                                                placeholder="Driver Name"

                                                defaultValue={driverData.name}

                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                {...register('driver_name', { required: true })}
                                            />
                                            <br />
                                            {errors.driver_name?.type === 'required' &&
                                                'Driver Name is required'}
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>Mobile No</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            {' '}
                                            <OutlinedInput
                                                placeholder="Mobile No"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                defaultValue={driverData.mobile}
                                                {...register('mobile_no', { required: true })}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>DL Number</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            {' '}
                                            <OutlinedInput
                                                placeholder="DL Number"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                defaultValue={driverData.DL_no}
                                                {...register('dl_no', { required: true })}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>DL Validty Exp date</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 6,
                                            }}
                                        >
                                            <OutlinedInput
                                                placeholder="DL Number"
                                                type="date"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                defaultValue={driverData.DL_expire}
                                                {...register('expiry_date', { required: true })}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>Address Line 1</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            <TextareaAutosize
                                                //   className="autocomp1"
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Address 1"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    // height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                defaultValue={driverData.address}
                                                {...register('address', { required: true })}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>City</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            {' '}
                                            <OutlinedInput
                                                placeholder="City"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px',
                                                }}
                                                defaultValue={driverData.city}
                                                {...register('city', { required: true })}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>Country</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            <Autocomplete
                                                style={{ width: '100%' }}
                                                disablePortal
                                                className="autocomp1"
                                                id="combo-box-demo"
                                                options={country}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Country"
                                                        {...register('country', { required: true })}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            // display: { xs: "block", sm: "flex", md: "flex" },
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}
                                        <Typography>State</Typography>
                                        <Box
                                            className="drivdetailsbx"
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            <Autocomplete
                                                style={{ width: '100%' }}
                                                disablePortal
                                                className="autocomp1"
                                                id="combo-box-demo"
                                                options={state}
                                                //   defaultValue="Nepal"
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="State"
                                                        {...register('state', { required: true })}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>

                                    {/* driver status */}
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        {' '}

                                        <Typography>Driver Status </Typography>
                                        <Box
                                            style={{
                                                width: '60%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                                marginLeft: 10,
                                            }}
                                        >
                                            <Autocomplete
                                                style={{ width: '100%' }}
                                                disablePortal
                                                className="autocomp1"
                                                id="combo-box-demo"
                                                options={driverStatus}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="--Select--"
                                                        {...register('status', { required: true })}
                                                    />
                                                )}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box
                                    style={{
                                        paddingTop: 16,
                                        display: 'flex',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="outlined"
                                        style={{ background: '#28a745', color: 'white' }}
                                    >
                                        Save Driver
                                    </Button>
                                </Box>
                            </Paper>
                        </Container>
                        {/* <input type="submit" /> */}
                    </form>
                    {/* grid part */}
                </Grid>
            </Grid>
        </div>
    );
};

export default DriverDetails;


export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const { params } = ctx;
    const driverId = params.id;

    const session = await getSession(ctx);
    var driverData = [];
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;

        try {
            const req = await fetch(`${process.env.apiUrl}/drivers/${driverId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await req.json();

            if (res.status === 'success') {
                driverData = res.data;
            } else {
                driverData = [];
            }
        }
        catch (err) {

        }

    }

    // Pass data to the page via props
    return { props: { driverData } };
}