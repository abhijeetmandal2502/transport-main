import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    MenuItem,
    Modal,
    OutlinedInput,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import {
    Add,
    AddCircleOutline,
    ArrowBackRounded,
    DoubleArrow,
    RemoveCircleOutline,
    RemoveCircleOutlineTwoTone,
    Router,
    ShoppingBasket,
    ShoppingCart,
    Visibility,
} from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';
import DatePickers from '../DatePickers';
import { useSnackbar } from 'notistack';
import ModalConfirmation from '../ModalConfirmation';
import { useSession, getSession } from 'next-auth/react';
import BackButton from '../buttons/BackButton';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { array } from 'yup';
import { route } from 'next/dist/server/router';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const NewBookingNew = (props) => {

    // get data from page props 
    const { consignorData } = props;

    // get token from session
    const router = useRouter();
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm();

    const { data: session } = useSession();
    const token = session.user.access_token;
    const [count, setCount] = useState(1);

    const [dataDetails, setDatadetails] = useState([])
    const [origins, setOrigins] = useState({})
    const [originState, setOriginState] = useState({})
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();



    // form submit 
    const onSubmit = async (data) => {

        const tempconsignee = data.consignee;
        const tempconsignor = data.consignor;
        const consignee = [];
        const consignor = [];
        for (var i = 0; i < tempconsignee.length; i++) {
            consignor.push(tempconsignor[i].toLowerCase().replace(/ /g, '_'));
            consignee.push(tempconsignee[i].toLowerCase().replace(/ /g, '_'));
        }

        try {
            const req = await fetch(`${process.env.apiUrl}/create-lr-booking`,
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        consignor: consignor,
                        consignee: consignee,
                        reporting_date: data.bookingDate,
                        indent_date: data.indentDate,
                        from_location: data.from,
                        destination_location: data.to,
                    }),
                }
            );

            const res = await req.json();
            if (res.status === 'success') {
                var message = res.message;
                enqueueSnackbar(message, {
                    variant: 'success',
                });
                router.push('/')
            }
            else {
                var message = res.errors[0];
                enqueueSnackbar(message, {
                    variant: 'error',
                });
            }

        } catch (error) {
            // enqueueSnackbar(error[1], {
            //     variant: 'error',
            // }); comment added fot git push


        }

    }

    // looping through a specific number
    const number = []
    var i = 0;
    while (i < count) {
        number.push(i)
        i++;
    }

    // create consignor autocomplete 
    const consignorDetails = []
    consignorData && consignorData.map((item, i) => {
        if (item.active_status === 'active') {
            const name = item.name.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
            consignorDetails.push({ label: name, cons_id: item.cons_id, key: i })
        }

    })

    // check for calling consignor key
    const callConsignor = async (value, index) => {

        const cons_id = value && value.cons_id;
        var locationArr = {}
        // alert(index)
        setOriginState({ ...originState, [index]: cons_id })

        try {
            const req = await fetch(
                `${process.env.apiUrl}/distances/${cons_id}`,
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
                const data = res.data
                // find consignor 
                const temporigin = [];

                var i = 0;

                for (var key in data) {
                    temporigin.push({ label: key, key: i })
                    const destinationArr = data[key];
                    var tempdestination = [];
                    Object.values(destinationArr).map((item, i) => {
                        tempdestination.push({ label: item.to_location, key: i })
                    })
                    i++;
                }
                const temp = { from: temporigin, to: tempdestination };
                locationArr = { [cons_id]: temp }
                setOrigins({ ...origins, [cons_id]: temp })

            }

        } catch (error) {

        }

        if (Object.keys(locationArr).length > 0) {

        }
    }


    const removeCount = (index) => {
        setCount(count > 1 ? count - 1 : 1)
        // remove(index)
    }



    // function for capitalize word
    function capitalize(word) {
        return word
            .toLowerCase()
            .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
    }

    return (
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
                            <Typography
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    width: 'fit-content',
                                    paddingLeft: 3,
                                    paddingRight: 3,
                                    paddingTop: 2,

                                    lineHeight: 'normal',
                                    borderRadius: 4,
                                    height: 'fit-content',
                                    // marginLeft: 3,
                                    // marginRight: 3,
                                    fontWeight: '700',
                                    fontSize: 16,
                                }}
                                variant="h6"
                                component="h4"
                                sx={{
                                    fontWeight: 'bold',
                                }}
                            >
                                EXCLUSIVE TAX SALE
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <Grid container sx={{ justifyContent: { sm: 'flex-end' }, mt: { xs: '10px', sm: '0px' } }} >

                            <Grid item xs={4} md={3}>
                                <Box sx={{ textAlign: { xs: 'center', sm: 'end' } }}>
                                    <BackButton url={'/booking/lr-booking'} />
                                </Box>
                            </Grid>

                        </Grid>


                    </Grid>
                </Grid>
                {/* paper first */}
                {
                    number.map((index) => {

                        var key = originState[index] && originState[index];
                        const from = origins[key] ? origins[key]['from'] : [];
                        const to = origins[key] ? origins[key]['to'] : [];


                        return (
                            <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={4} key={index} >
                                <Box style={{ float: 'right', display: 'flex', padding: 16, paddingBottom: 0, paddingTop: 10 }} >
                                    {
                                        index === 0 ? <AddCircleOutline onClick={() => setCount(count + 1)} /> : <> <AddCircleOutline onClick={() => setCount(count <= 10 ? count + 1 : 10)} /> <RemoveCircleOutline onClick={() => setCount(count > 1 ? count - 1 : 1)} /></>
                                    }

                                </Box>

                                <Grid
                                    container
                                    spacing={4}
                                    style={{ padding: 16, paddingTop: 0, display: { sm: 'block', md: 'flex' } }}
                                >
                                    {/* grid1 */}
                                    <Grid item xs={12} md={6} sm={6} style={{ paddingTop: 6 }}>
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
                                            <Autocomplete
                                                className="removepadding"
                                                style={{ width: '100%', height: '10px !important' }}
                                                disablePortal
                                                id="combo-box-demo trisha "
                                                options={consignorDetails}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder='consignor details' {...register(`consignor[${index}]`, { required: true })} />
                                                )}

                                                onChange={(e, value) => callConsignor(value, index)}

                                            />
                                        </Box>
                                    </Grid>
                                    {/* grid 2 */}

                                    <Grid item xs={12} md={6} sm={6} style={{ paddingTop: 6 }}>
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
                                            <Autocomplete
                                                className="removepadding"
                                                style={{ width: '100%' }}
                                                disablePortal
                                                // id="combo-box-demo"
                                                options={consignorDetails}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Consignee" {...register(`consignee[${index}]`, { required: true })} />
                                                )}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={4} style={{ padding: 16 }}>
                                    {/* second p first grid */}
                                    <Grid item xs={12} md={3} sm={6} style={{ paddingTop: 6 }}>
                                        <Box style={{ marginBottom: 4 }}>
                                            <Typography style={{ fontWeight: 'bolder' }}>
                                                Origin(From)
                                            </Typography>
                                        </Box>
                                        <Box
                                            className='padremove'
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Autocomplete
                                                className="removepadding"
                                                style={{ width: '100%' }}
                                                disablePortal
                                                // id="combo-box-demo"
                                                options={from}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="from location" {...register(`from[${index}]`, { required: true })} />
                                                )}
                                            />


                                            {/* <Add className="addcontrol" sx={{ px: 4 }} /> */}
                                        </Box>
                                    </Grid>

                                    {/* scnd p scnd grid */}

                                    <Grid item xs={12} md={3} sm={6} style={{ paddingTop: 6 }} >
                                        <Box style={{ marginBottom: 4 }}>
                                            <Typography style={{ fontWeight: 'bolder' }}>
                                                Destination(To)
                                            </Typography>
                                        </Box>
                                        <Box
                                            className='padremove'
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <Autocomplete
                                                className="removepadding"
                                                style={{ width: '100%' }}
                                                disablePortal
                                                // id="combo-box-demo"
                                                options={to}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Consignee" {...register(`to[${index}]`, { required: true })} />
                                                )}
                                            />


                                            {/* <Add className="addcontrol" sx={{ px: 4 }} /> */}
                                        </Box>
                                    </Grid>

                                    {/* second p fifth grid */}
                                    <Grid item xs={12} md={3} sm={6} style={{ paddingTop: 6 }}>
                                        <Box style={{ marginBottom: 4 }}>
                                            <Typography style={{ fontWeight: 'bolder' }}>
                                                Booking Date
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
                                            <TextField
                                                style={{ width: '100%', padding: '0px' }}
                                                type="date"
                                                {...register(`bookingDate[${index}]`, { required: true })}
                                            />
                                        </Box>
                                    </Grid>

                                    {/* second p fifth grid */}
                                    <Grid item xs={12} md={3} sm={6} style={{ paddingTop: 6 }}>
                                        <Box style={{ marginBottom: 4 }}>
                                            <Typography style={{ fontWeight: 'bolder' }}>
                                                Indent Date
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
                                            {/* <DatePickers date={setIndesntDate} /> */}
                                            <TextField
                                                style={{ width: '100%', padding: ' 7.5px 14px' }}
                                                type="date"
                                                {...register(`indentDate[${index}]`, { required: true })}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    })
                }

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
                </Box>

            </Container>
        </form >
    );
};

export default NewBookingNew;
