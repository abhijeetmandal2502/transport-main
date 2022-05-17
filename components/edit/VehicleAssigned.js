import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const VehicleAssigned = ({ lrno }) => {

    const { data: session, status } = useSession();
    const token = session && session.user.access_token;

    const router = useRouter()

    // use state setting up data
    const [drivers, setDrivers] = useState([])
    const [price, setPrice] = useState('')
    const [vehicles, setVehicles] = useState([])
    const [consignor, setConsignor] = useState({});
    const [vehicle, setVehicle] = useState('')
    const [driver, setDriver] = useState([])

    const [showPrice, setShowPrice] = useState(false)
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit } = useForm();

    // fom submit 
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
                    to_location: data.to,
                    driver_id: driver.id,
                    vehicle_id: data.vehicle,
                    amount: data.price

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

    // fetch consignor details 
    useEffect(() => {
        fetchObjects();
        fetchvehicle();
        fetchDriver();

    }, [lrno])

    const fetchObjects = async () => {
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
                setConsignor(data)
                data.ownership === 'third-party' ? setShowPrice(true) : setShowPrice(false)
                setVehicle(data.vehicle_no)
                setDriver({ dl: data.driver_dl, name: data.driver_name, mobile: data.driver_mobile })
                setPrice(data.amount)
            }
            else {

            }

        } catch (error) {
        }
    }

    const fetchvehicle = async () => {
        const req = await fetch(
            `${process.env.apiUrl}/free-vehicles/vehicle`,
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
            setVehicles(res.data)
        }
    }

    const fetchDriver = async () => {
        const req = await fetch(
            `${process.env.apiUrl}/free-vehicles/driver`,
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
            setDrivers(res.data)
        }


    }

    // delete lr

    const deleteItem = async () => {
        try {
            const req = await fetch(`${process.env.apiUrl}/lr-cancel`, {
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

                router.push('/booking/lr-booking')
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });



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

    const changeVehicle = (item, type) => {
        if (type === 'driver') {
            var index = (index) => index.DL_no == item;
            var findIndex = drivers.findIndex(index);
            if (findIndex != -1) {
                setDriver({ id: drivers[findIndex]['driver_id'], dl: drivers[findIndex]['DL_no'], name: drivers[findIndex].name, mobile: drivers[findIndex].mobile })
            }

        }
        else if (type === 'vehicle') {
            setVehicle(item)
            var index = (index) => index.vehicle_no == item;
            var findIndex = vehicles.findIndex(index);

            if (vehicles[findIndex].ownership === "owned") {
                setShowPrice(false)
            }
            else {
                setShowPrice(true)
            }

        }
    }


    return (Object.values(consignor).length > 0 &&
        <Container
            style={{
                alignItems: 'center',
                paddingLeft: 0,
                paddingRight: 0,
            }}
        >
            <Grid container style={{ marginBottom: 15 }}>
                <Grid
                    item
                    xs={8}
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
                            Vehicle Assignment
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Grid item xs={12} sm={12} md={8}>
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
                                        textAlign: 'center',
                                    }}
                                >
                                    Vehicle Update
                                </Typography>
                                <Divider />

                                <Grid container spacing={2} style={{ padding: 16 }}>
                                    <Grid item xs={12}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                LR Number :-
                                            </Typography>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                    justifyContent: 'space-between',
                                                    marginLeft: 10,
                                                }}
                                            >
                                                <Typography>{consignor.lr_id}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                Consignor :-
                                            </Typography>
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
                                                <Typography>{consignor.consignor_name}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                Consignee :-
                                            </Typography>
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
                                                <Typography>{consignor.consignee_name}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                From :-
                                            </Typography>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                    justifyContent: 'space-between',
                                                    marginLeft: 10,
                                                }}
                                            >
                                                <Typography>{consignor.from_location.toUpperCase()}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'baseline',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                To :-
                                            </Typography>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                    justifyContent: 'space-between',
                                                    marginLeft: 10,
                                                }}
                                            >
                                                <Typography>{consignor.to_location.toUpperCase()}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    {/* price section  */}
                                    {showPrice && (
                                        <Grid item xs={12}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                }}
                                            >
                                                <Typography style={{ fontWeight: 600 }}>
                                                    Price :-
                                                </Typography>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        justifyContent: 'space-between',
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    <TextField
                                                        id="standard-basic"
                                                        variant="standard"
                                                        placeholder="Enter Price"
                                                        value={price}

                                                        {...register('price', { required: true })}
                                                        onChange={(e) => setPrice(e.target.value)}
                                                    />
                                                </Box>
                                            </Box>
                                        </Grid>
                                    )}

                                    {/* end of price section  */}

                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                Vehicle Assign :-
                                            </Typography>
                                            <Box
                                                style={{
                                                    width: '58%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                    justifyContent: 'space-between',
                                                    marginLeft: 10,
                                                }}
                                            >
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Vehicle Assign</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        value={vehicle}
                                                        label="Vehicle Assign"
                                                        style={{ height: '40px' }}
                                                        {...register(`vehicle`, { required: true })}
                                                        onChange={(e) => changeVehicle(e.target.value, "vehicle")}

                                                    >
                                                        <MenuItem value={vehicle}>{vehicle.toUpperCase()}</MenuItem>

                                                        {
                                                            vehicles.map((item, key) => {
                                                                return (<MenuItem value={item.vehicle_no} key={key} >{item.vehicle_no.toUpperCase()}</MenuItem>)
                                                            })
                                                        }

                                                    </Select>
                                                </FormControl>


                                            </Box>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <Box
                                            style={{
                                                marginBottom: 8,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Typography style={{ fontWeight: 600 }}>
                                                Driver Details :-
                                            </Typography>
                                            <Box
                                                style={{
                                                    width: '58%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 5,
                                                    justifyContent: 'space-between',
                                                    marginLeft: 10,
                                                }}
                                            >
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">Driver</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"

                                                        label="Driver"
                                                        style={{ height: '40px' }}
                                                        value={driver.dl}
                                                        {...register(`driver`, { required: true })}

                                                        onChange={(e) => changeVehicle(e.target.value, "driver")}
                                                    >
                                                        <MenuItem value={consignor.driver_dl} >{consignor.driver_name}</MenuItem>
                                                        {drivers.map((item, key) => <MenuItem value={item.DL_no} key={key} >{item.name}</MenuItem>)}
                                                    </Select>
                                                </FormControl>

                                            </Box>
                                        </Box>
                                    </Grid>

                                    {/* Driver Detail */}
                                    <Grid container spacing={2} style={{ margin: 'auto' }}>
                                        <Grid item xs={12} sm={6}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                }}
                                            >
                                                <Typography style={{ fontWeight: 600 }}>
                                                    Name :-
                                                </Typography>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        justifyContent: 'space-between',
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    <Typography>{driver.name}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                }}
                                            >
                                                <Typography style={{ fontWeight: 600 }}>
                                                    DL :-
                                                </Typography>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        justifyContent: 'space-between',
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    <Typography>{driver.dl}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'baseline',
                                                }}
                                            >
                                                <Typography style={{ fontWeight: 600 }}>
                                                    Phone :-
                                                </Typography>
                                                <Box
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        borderRadius: 5,
                                                        justifyContent: 'space-between',
                                                        marginLeft: 10,
                                                    }}
                                                >
                                                    <Typography>{driver.mobile}</Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>

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
                                        Update
                                    </Button>
                                    <Button
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => deleteItem()}
                                        variant="contained"
                                        color='secondary'
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Paper>
                        </Container>
                    </form>
                </Grid>
            </Grid>


        </Container>
    )
}

export default VehicleAssigned