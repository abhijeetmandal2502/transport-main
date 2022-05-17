import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';

const FreshLR = ({ lrno }) => {


    const [lrData, setLrData] = useState([])
    const { router } = useRouter();

    // use state data for 
    const [vendors, setVendors] = useState([])
    const [consignor, setConsignor] = useState([])
    const [consignee, setConsignee] = useState([])
    const [allFromLocation, setFromLocation] = useState([])
    const [allToLocation, setToLocation] = useState([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [indentDate, setIndentDate] = useState('')


    const { data: session, status } = useSession();
    const token = session && session.user.access_token;

    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        try {
            const req = await fetch(`${process.env.apiUrl}/lr-update`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                method: 'post',
                body: JSON.stringify({
                    booking_id: lrno,
                    consignor_id: data.consignor,
                    consignee_id: data.consignee,
                    indent_date: data.indentDate,
                    reporting_date: data.bookingDate,
                    from_location: data.from,
                    to_location: data.to
                })

            })

            const res = await req.json()

            if (res.status === 'success') {
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });

                router.push(`/booking/lr-booking`)

            }
            else {
                enqueueSnackbar(res.errors, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }


        } catch (error) {

        }


    }


    useEffect(() => {
        fetchDetails()
        fetchAllConsignor()
    }, [lrno])

    const fetchDetails = async () => {

        try {
            const req = await fetch(`${process.env.apiUrl}/lr-booking/single/${lrno}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            })

            const res = await req.json();
            if (res.status === 'success') {
                const data = res.data;
                setConsignor({ name: data.consignor_name, key: data.consignor_id });
                setConsignee({ name: data.consignee_name, key: data.consignee_id });
                setFrom(data.from_location);
                setTo(data.to_location);
                setIndentDate(dateFormat(data.indent_date, "yyyy-mm-dd"));
                setBookingDate(dateFormat(data.reporting_date, "yyyy-mm-dd"));
                setFromLocation([data.from_location])
                setToLocation([data.to_location])
            }
            else {

            }


        } catch (error) {

        }



    }

    const fetchAllConsignor = async () => {
        try {
            // get all consignor details 
            const consFetch = await fetch(`${process.env.apiUrl}/consignors`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const resCons = await consFetch.json();
            if (resCons.status === 'success') {

                var tempArr = [];
                resCons.data.map((item) => {
                    tempArr.push({ key: item.cons_id, name: item.name })
                })
                setVendors(tempArr)
            }
        } catch (error) {

        }
    }
    const callConsignFunc = async (cons_id) => {
        // 

        const req = await fetch(
            `${process.env.apiUrl}/distances/${cons_id}`,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

        const res = await req.json()

        if (res.status === 'success') {
            const data = res.data;

            const tempFrom = [];
            const tempTo = [];
            for (var key in data) {
                tempFrom.push(key);
                Object.values(data[key]).map((item) => {
                    tempTo.push(item.to_location)
                })

            }

            setFromLocation(tempFrom)
            setToLocation(tempTo)
        }



    }

    const deleteLr = async () => {
        try {
            const req = await fetch(`${process.env.apiUrl}/lr-update`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                method: 'post',
                body: JSON.stringify({
                    booking_id: lrno,
                })

            })

            const res = await req.json()

            if (res.status === 'success') {
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });


                router.push(`/booking/lr-booking`)

            }
            else {
                enqueueSnackbar(res.errors, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }


        } catch (error) {

        }
    }



    return ((consignor.name != undefined && consignee.name != undefined) &&
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container
                maxWidth="md"
                style={{
                    maxWidth: 1080,
                    alignItems: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >

                <Grid container style={{ marginBottom: 15 }} >
                    <Grid
                        item
                        xs={12} sm={8}
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                display: { sx: 'block', sm: 'flex' },
                                alignItems: 'center',
                            }}
                        >
                            <Typography
                                variant="h6"
                                component="h4"
                                sx={{ fontWeight: 'bold' }}
                                style={{ marginRight: 5 }}
                            >
                                New Booking
                            </Typography>

                        </Box>
                    </Grid>

                </Grid>
                {/* paper first */}
                <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={4}>
                    <Grid
                        container
                        spacing={4}
                        style={{ padding: 16, display: { sm: 'block', md: 'flex' } }}
                    >
                        {/* grid1 */}
                        <Grid item xs={12} md={6} sm={6} style={{}}>
                            <Box style={{ marginBottom: 4 }}>
                                <Typography style={{ fontWeight: 'bolder' }}>
                                    Consignor/Sender
                                </Typography>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Consignor</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"

                                        value={consignor.key}
                                        label="Consignor"
                                        onChange={(e) => callConsignFunc(e.target.value)}
                                        {...register(`consignor`, { required: true })}
                                    >
                                        {
                                            vendors.map((item, i) => <MenuItem value={item.key} key={i} >{item.name}</MenuItem>)
                                        }
                                        {/* <MenuItem value={consignor.key}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>

                            </Box>
                        </Grid>
                        {/* grid 2 */}

                        <Grid item xs={12} md={6} sm={6} style={{}}>
                            <Box style={{ marginBottom: 4 }}>
                                <Typography style={{ fontWeight: 'bolder' }}>
                                    Consignee/Receiver
                                </Typography>
                            </Box>
                            <Box
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Consignee</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"

                                        value={consignee.key}
                                        label="Consignee"
                                        {...register(`consignee`, { required: true })}
                                    >
                                        {
                                            vendors.map((item, i) => <MenuItem value={item.key} key={i} >{item.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>

                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                {/* paper second */}
                <Paper
                    sx={{ width: '100%', overflow: 'hidden' }}
                    style={{ marginTop: 30 }}
                    elevation={4}

                >
                    <Grid container spacing={4} style={{ padding: 16 }}>
                        {/* second p first grid */}
                        <Grid item xs={12} md={3} sm={6} style={{}}>
                            <Box style={{ marginBottom: 4 }}>
                                <Typography style={{ fontWeight: 'bolder' }}>
                                    Origin(From)
                                </Typography>
                            </Box>
                            <Box
                                className="bookngdte padremove"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    justifyContent: 'space-between',
                                }}
                            >
                                <FormControl fullWidth  >
                                    <InputLabel id="demo-simple-select-label">From</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"

                                        className='divheight'
                                        label="From"
                                        style={{ width: '100%', padding: 0 }}
                                        value={from}
                                        onChange={(e) => setFrom(e.target.value)}
                                        {...register(`from`, { required: true })}
                                    >
                                        {allFromLocation.map((item, key) => <MenuItem value={item} key={key} >{item.toUpperCase()}</MenuItem>)}

                                        {/* <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem> */}
                                    </Select>
                                </FormControl>

                            </Box>
                        </Grid>

                        {/* scnd p scnd grid */}

                        <Grid item xs={12} md={3} sm={6} >
                            <Box style={{ marginBottom: 4 }}>
                                <Typography style={{ fontWeight: 'bolder' }}>
                                    Destination(To)
                                </Typography>
                            </Box>
                            <Box
                                className="bookngdte padremove"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    justifyContent: 'space-between',
                                    padding: "16.5px 14px !important"
                                }}
                            >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">To</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"

                                        value={to}
                                        label="To"
                                        onChange={(e) => setTo(e.target.value)}
                                        {...register(`to`, { required: true })}

                                    >
                                        {allToLocation.map((item, key) => <MenuItem value={item} key={key} >{item.toUpperCase()}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                {/* <Add className="addcontrol" sx={{ px: 4 }} /> */}
                            </Box>
                        </Grid>

                        {/* second p fifth grid */}
                        <Grid item xs={12} md={3} sm={6} style={{}}>
                            <Box style={{ marginBottom: 4 }}>
                                <Typography style={{ fontWeight: 'bolder' }}>
                                    Booking Date
                                </Typography>
                            </Box>
                            <Box
                                className=" padremove"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    justifyContent: 'space-between',
                                    padding: "16.5px 14px !important"
                                }}
                            >
                                <TextField
                                    style={{ width: '100%', padding: '0px' }}
                                    type="date"
                                    value={bookingDate}
                                    {...register(`bookingDate`, { required: true })}
                                />
                            </Box>
                        </Grid>

                        {/* second p fifth grid */}
                        <Grid item xs={12} md={3} sm={6} style={{}}>
                            <Box style={{ marginBottom: 4 }}>
                                <Typography style={{ fontWeight: 'bolder' }}>
                                    Indent Date
                                </Typography>
                            </Box>
                            <Box
                                className="padremove"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    justifyContent: 'space-between',
                                }}
                            >
                                {/* <DatePickers date={setIndesntDate} /> */}
                                <TextField
                                    style={{ width: '100%', }}
                                    type="date"
                                    value={indentDate}
                                    {...register(`indentDate`, { required: true })}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                <Box sx={{ p: '10px', textAlign: 'end', marginTop: '20px' }}>
                    <Button
                        variant="outlined"
                        type="submit"
                        style={{
                            color: 'white',
                            borderColor: '17a2b8',
                            background: '#17a2b8',
                        }}
                    >
                        Submit
                    </Button>

                    <Button
                        variant="outlined"
                        color="error"
                        style={{

                            borderColor: '17a2b8',

                        }}
                        onClick={() => deleteLr()}
                    >
                        Delete
                    </Button>
                </Box>
            </Container>
        </form >
    )
}

export default FreshLR