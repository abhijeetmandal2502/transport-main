import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from '@material-ui/core';
import { Add, DoubleArrow, Search } from '@material-ui/icons';
import {
    Autocomplete,
    OutlinedInput,
    TextareaAutosize,
    TextField,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';
import BackButton from '../../../components/buttons/BackButton';
import { state, country } from '../../../components/Utils';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';
import { useState } from 'react';

const UpdatePetolPump = ({ pumpData }) => {
    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();


    const [id, setId] = useState(pumpData.id)
    const pumpStatus = [{ label: 'Active' }, { label: 'Inactive' }];

    // get token from session
    const { data: session } = useSession();
    const token = session.user.access_token;

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmit = async (data) => {
        const res = await fetch(`${process.env.apiUrl}/update-ppump/${id}`, {
            body: JSON.stringify({
                pump_name: data.pump_name,
                mobile: data.mobile,
                address: data.address,
                city: data.city,
                country: data.country,
                state: data.state,
                status: data.status.toLowerCase()
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
            router.push('/loading/petrol-pump-register');
        } else {
            var message = result.errors[0];
            result.errors.map((item) => {
                enqueueSnackbar(item, { variant: 'error' });
            });
        }
    };

    const url = '/loading/petrol-pump-register';

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
                        New Petrol Pump{' '}
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
                    <Container
                        style={{
                            alignItems: 'center',
                            paddingLeft: 0,
                            paddingRight: 0,
                            marginTop: 5,
                            marginBottom: 5,
                        }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                    Petrol Pump Details
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
                                        <Typography>Petrol Pump Name</Typography>
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
                                                placeholder="Petrol Pump Name"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                defaultValue={pumpData.pump_name}
                                                {...register('pump_name', { required: true })}
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
                                                type="number"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                defaultValue={pumpData.mobile}
                                                {...register('mobile', { required: true })}
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
                                                defaultValue={pumpData.address}
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
                                                defaultValue={pumpData.city}
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
                                                        placeholder="country"
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
                                                        placeholder="state"
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
                                                options={pumpStatus}
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
                                        Save Petrol Pump
                                    </Button>
                                </Box>
                            </Paper>
                        </form>
                    </Container>
                </Grid>
            </Grid>
        </div>
    );
};

export default UpdatePetolPump;
export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const { params } = ctx;
    const pump_id = params.id;

    const session = await getSession(ctx);
    var pumpData = [];
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;

        try {
            const req = await fetch(`${process.env.apiUrl}/petrol-pumps/${pump_id}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await req.json();

            if (res.status === 'success') {
                pumpData = res.data;
            } else {
                pumpData = [];
            }
        }
        catch (err) {

        }

    }

    // Pass data to the page via props
    return { props: { pumpData } };
}