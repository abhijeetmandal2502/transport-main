import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Input,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import ModalConfirmation from '../../components/ModalConfirmation';
import { useRouter } from 'next/router';
import { useSession, getSession } from 'next-auth/react';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const VehicleAssign = (props) => {
    // get token from session
    const { data: session } = useSession();
    const token = session.user.access_token;

    const router = useRouter();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [modalData, setModalData] = useState([]);
    const { lrinfo, vehicleInfo } = props;
    const [showPrice, setShowPrice] = useState(true);
    const [driverDetails, setDriverDetails] = useState([]);
    const [vehicleDetails, setVehicleDetails] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [price, setPrice] = useState('');

    const drivers = vehicleInfo.drivers;
    const vehicles = vehicleInfo.vehicles;

    const driverList = [];
    drivers.length > 0 &&
        drivers.map((item) => {
            driverList.push({ label: item.name + '/' + item.DL_no });
        });

    const vehicleList = [];
    vehicles.length > 0 &&
        vehicles.map((item) => [
            vehicleList.push({ label: item.vehicle_no + '/' + item.ownership }),
        ]);

    const driverInfo = (value) => {

        const tempArr = value.label.split('/');
        const driverName = tempArr[0];
        const driverDl = tempArr[1];

        for (var i = 0; i < drivers.length; i++) {
            if (driverName == drivers[i].name && driverDl == drivers[i].DL_no) {
                setDriverDetails({
                    id: drivers[i].driver_id,
                    name: drivers[i].name,
                    dl: drivers[i].DL_no,
                    mobile: drivers[i].mobile,
                });

                break;
            }
        }
    };

    const findVehicles = (value) => {
        const vehicleArray = value.label.split('/');
        const vehicleNo = vehicleArray[0];
        const vehicleType = vehicleArray[1];
        if (vehicleType === 'third-party') {
            setShowPrice(true);
        } else if (vehicleType === 'owned') {
            setShowPrice(false);
        }

        setVehicleDetails({ id: vehicleNo, type: vehicleType });
    };

    const onSubmit = async (data) => {
        setPrice(data.price);
        setModalData([
            { fieldName: 'LR Number', data: lrinfo.lr_id },
            { fieldName: 'Consignor', data: lrinfo.consignor_name },
            { fieldName: 'Consignee', data: lrinfo.consignee_name },
            { fieldName: 'From', data: lrinfo.from_location },
            { fieldName: 'To', data: lrinfo.to_location },
            { fieldName: 'Vehicle No.', data: vehicleDetails.id },
            { fieldName: 'Vehicle Type', data: vehicleDetails.type },
            {
                fieldName: 'Price',
                data: vehicleDetails.type === 'owned' ? '-' : data.price,
            },
            { fieldName: 'Driver', data: driverDetails.name },
            { fieldName: 'Mobie', data: driverDetails.mobile },
            { fieldName: 'DL', data: driverDetails.dl },
        ]);

        if (vehicleDetails.type === 'third-party') {
            setPrice(data.price);
        } else {
            setPrice(0);
        }

        setModalShow(true);
        setOpen(true);

    };

    const submitForm = async () => {
        setOpen(false);

        const formData = {
            booking_id: lrinfo.lr_id,
            driver_id: driverDetails.id,
            vehicle_id: vehicleDetails.id,
            amount: price,
            status: 'vehicle-assigned',
        };

        const res = await fetch(`${process.env.apiUrl}/vehicle-assign`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (data.status === 'success') {
            enqueueSnackbar(data.message, {
                variant: 'success',
            });
            router.push('/booking/vehicle-assignment');
        } else {
            enqueueSnackbar(data.errors, {
                variant: 'error',
            });
        }


    };

    return (
        <div style={{}}>
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
                                        Vehicle Assignment
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
                                                    <Typography>{lrinfo.lr_id}</Typography>
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
                                                    <Typography>{lrinfo.consignor_name}</Typography>
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
                                                    <Typography>{lrinfo.consignee_name}</Typography>
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
                                                    <Typography>{lrinfo.from_location}</Typography>
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
                                                    <Typography>{lrinfo.to_location}</Typography>
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
                                                            {...register('price', { required: true })}
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
                                                    <Autocomplete
                                                        style={{ width: '100%' }}
                                                        disablePortal
                                                        className="autocomp"
                                                        id="combo-box-demo"
                                                        options={vehicleList}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                sx={{ padding: 3 }}
                                                                {...params}
                                                                placeholder="Vehicle Assign"
                                                                variant="standard"
                                                                {...register('vehicle', { required: true })}
                                                            />
                                                        )}
                                                        onChange={(event, value) => findVehicles(value)}
                                                    />
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
                                                    <Autocomplete
                                                        style={{ width: '100%' }}
                                                        disablePortal
                                                        className="autocomp"
                                                        id="combo-box-demo"
                                                        onChange={(event, value) => driverInfo(value)}
                                                        options={driverList}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                sx={{ padding: 3 }}
                                                                {...params}
                                                                placeholder="Driver Details"
                                                                variant="standard"
                                                                {...register('driver', { required: true })}
                                                            />
                                                        )}
                                                    />
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
                                                        <Typography>{driverDetails.name}</Typography>
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
                                                        <Typography>{driverDetails.dl}</Typography>
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
                                                        <Typography>{driverDetails.mobile}</Typography>
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
                                            Confirmed
                                        </Button>
                                    </Box>
                                </Paper>
                            </Container>
                        </form>
                    </Grid>
                </Grid>

                {/* this portion is used for displying modal details */}

                <ModalConfirmation
                    open={open}
                    setOpen={setOpen}
                    confirmationData={modalData}
                    submitMethod={submitForm}
                    title={'Vehicle Assignment Confirmation Details'}
                />
            </Container>
        </div>
    );
};

export default VehicleAssign;
