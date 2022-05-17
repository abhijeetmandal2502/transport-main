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
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import useSWR, { useSWRConfig } from 'swr'
import { useSession, getSession } from 'next-auth/react';


const AddVehiclePrice = (props) => {

    const { mutate } = useSWRConfig()
    const { register, handleSubmit, setValue } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { to, from, vendor } = props

    const { data: session } = useSession();
    const token = session.user.access_token;
    const router = useRouter();

    // fetcher on is used for find only the get method
    const fetcher = (...args) => fetch(...args, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        }
    }).then((res) => res.json());

    // fetcher 2 is used for calling post method data that have already definded some vehicle price 
    const fetcher2 = (...args) => fetch(...args, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
            consignor: vendor,
            from_location: from,
            to_location: to
        })
    }).then((res) => res.json());


    const { data: vehicleData, error: vehcileDataerror } = useSWR(`${process.env.apiUrl}/categories`, fetcher)
    const { data: vehiclePrice, error: vehiclePriceError } = useSWR(`${process.env.apiUrl}/all-rates`,
        fetcher2
    );

    if (vehcileDataerror || vehcileDataerror) return <div>Failed to load</div>
    if (!vehicleData || !vehiclePrice) return <div>Loading...</div>


    var vehicleList = [];
    var vehiclePriceArr = []
    if (vehicleData.status === 'success') {
        vehicleList = vehicleData.data;
    }
    else {
        vehicleList = [];
    }

    if (vehiclePrice.status == 'success') {
        vehiclePriceArr = vehiclePrice.data;
        mutate(`${process.env.apiUrl}/all-rates`)
    }



    // form submit find data 
    const onSubmit = async (res) => {

        try {
            const req = await fetch(`${process.env.apiUrl}/create-distance`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    from_location: from,
                    to_location: to,
                    own_per_kg_rate: res.owner_price,
                    vendor_per_kg_rate: res.ta_price,
                    consignor: vendor,
                }),
            });

            const result = await req.json();

            if (result.status === 'success') {
                var message = result.message;
                enqueueSnackbar(message, {
                    variant: 'success',
                });

                router.push('/settings/location-mapping');
            } else {
                var message = result.errors;
                enqueueSnackbar(message, {
                    variant: 'error',
                });
            }
            location.reload();
        }
        catch (err) {



        }
        mutate(`${process.env.apiUrl}/all-rates`)


    }


    // check valid integer value 
    const checkvalue = (value) => {
        if (value <= 0) {
            alert('Price should be greater than zero');
        }

    }

    const temp_owner_list = Array()

    vehicleList.map((vehicle, key) => {
        temp_owner_list.push(vehiclePriceArr[vehicle.type_id]['own_rate'])

    })



    return (
        <>
            <Grid
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: 20,
                }}
            >
                <Grid item xs={12} sm={12} md={10}>
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
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    textShadow: 'rgb(207 207 207 / 63%) 2px 2px',
                                }}
                            >
                                Set Price List For ({vendor})
                            </Typography>
                            <Divider />

                            <form onSubmit={handleSubmit(onSubmit)} >
                                <Box
                                    style={{
                                        display: 'block',
                                        paddingLeft: 16,
                                        paddingRight: 16,
                                        paddingTop: 16,
                                        paddingBottom: 16,
                                        // paddingBottom: 16,
                                    }}
                                >
                                    <Box
                                        style={{
                                            //   marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box
                                            style={{
                                                width: '20%',
                                                display: 'flex',
                                                alignItems: 'start',
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 'large',
                                                }}
                                            >
                                                Vehicle Type
                                            </Typography>
                                        </Box>
                                        <Box
                                            style={{
                                                width: '20%',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 'bold' }}>
                                                Owner Price
                                            </Typography>
                                        </Box>
                                        <Box
                                            style={{
                                                width: '20%',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 'bold' }}>
                                                TA Price
                                            </Typography>
                                        </Box>
                                        <Box
                                            style={{
                                                width: '20%',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 'bold' }}>
                                                From
                                            </Typography>
                                        </Box>
                                        <Box
                                            style={{
                                                width: '20%',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                marginLeft: 10,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 'bold' }}>To</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                                <Divider />
                                {

                                    vehicleList.map((vehicle, key) => {

                                        //

                                        const ownerRate = vehiclePriceArr[vehicle.type_id]['own_rate'];
                                        const vendorrate = vehiclePriceArr[vehicle.type_id]['vendor_rate'];
                                        console.log("owner rate", ownerRate)
                                        return (<Box
                                            style={{
                                                display: 'block',
                                                paddingLeft: 16,
                                                paddingRight: 16,
                                                paddingTop: 16,
                                            }}
                                            key={key}
                                        >
                                            <Box
                                                style={{
                                                    marginBottom: 16,
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <Box
                                                    style={{
                                                        width: '20%',
                                                        display: 'flex',
                                                        alignItems: 'start',
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography
                                                        style={{
                                                            fontWeight: 'bold',
                                                            textAlign: 'center',
                                                            fontSize: 14,
                                                        }}
                                                    >
                                                        {vehicle.type_name}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    style={{
                                                        width: '20%',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <OutlinedInput
                                                        className="textbox"
                                                        type='number'
                                                        defaultValue={ownerRate}
                                                        // value={ownerRate}
                                                        style={{ height: 26, width: '60%', fontSize: 14 }}
                                                        placeholder="Enter Price"
                                                        {...register(`owner_price[${vehicle.type_id}]`, { required: true })}

                                                    />
                                                </Box>
                                                <Box
                                                    style={{
                                                        width: '20%',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <OutlinedInput
                                                        className="textbox"
                                                        type='number'
                                                        defaultValue={vendorrate}
                                                        // value={vendorrate}
                                                        style={{ height: 26, width: '60%', fontSize: 14 }}
                                                        placeholder="Enter Price"
                                                        {...register(`ta_price[${vehicle.type_id}]`, { required: true })}

                                                    />
                                                </Box>
                                                <Box
                                                    style={{
                                                        width: '20%',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                        {from}
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    style={{
                                                        width: '20%',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        marginLeft: 10,
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                        {to}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>)
                                    })
                                }



                                <Divider />
                                <Box
                                    style={{
                                        textAlign: 'center',
                                        marginTop: '15px',
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        className="setpricebtn"
                                        variant="outlined"
                                        style={{
                                            background: 'green',
                                            color: 'white',
                                            paddingLeft: 10,
                                            paddingRight: 10,
                                        }}
                                    >
                                        Update Vehicle Price
                                    </Button>
                                </Box>
                            </form>
                        </Paper>
                    </Container>
                </Grid>
            </Grid>
        </>
    );
};

export default AddVehiclePrice;
