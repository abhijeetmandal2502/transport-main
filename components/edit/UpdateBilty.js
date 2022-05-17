import { Button, Container, Divider, Grid, OutlinedInput, Paper, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useForm } from 'react-hook-form'
import dateFormat from 'dateformat'
import { useSnackbar } from 'notistack'
import { useSession } from 'next-auth/react'

const UpdateBilty = ({ bilty, setStatus, pageStatus }) => {

    const { data: session, status } = useSession();
    const token = session && session.user.access_token;

    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {



        try {
            const req = await fetch(`${process.env.apiUrl}/bilty-update/${bilty.id}`, {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                body: JSON.stringify({
                    shipment_no: data.shipment_no,
                    invoice_no: data.invoice_no,
                    packages: data.packages,
                    description: data.description,
                    date: data.date,
                    weight: data.weight,
                    goods_value: data.goods_value
                })
            })

            const res = await req.json();
            if (res.status === 'success') {
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 2000,
                });

                setStatus(!pageStatus);
            }
            else {
                enqueueSnackbar(res.errors, {
                    variant: 'error',
                    autoHideDuration: 2000,
                });
            }

        }
        catch (err) {

        }


    }

    return (
        <div>
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
                        Update Bilty
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
                        <Button size="small" color="primary" variant='contained' onClick={() => setStatus(!pageStatus)} >Back</Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '30px',
                }}
            >
                <Grid item xs={12} sm={12} md={6}>
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
                                    New Bilty ({bilty.booking_id})
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
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>Shipment Number</Typography>
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
                                                {...register('shipment_no', { required: true })}
                                                defaultValue={bilty.shipment_no}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>No of Packages</Typography>
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
                                            <OutlinedInput
                                                type="number"
                                                defaultValue={bilty.packages}
                                                {...register('packages', { required: true })}
                                                placeholder="No of Packages"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'baseline',
                                        }}
                                    >
                                        <Typography>Description</Typography>
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
                                                aria-label="minimum height"
                                                minRows={3}
                                                placeholder="Enter Description"
                                                {...register('description', { required: true })}
                                                defaultValue={bilty.description}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    borderRadius: '4px ',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>Invoice Number</Typography>
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
                                            <OutlinedInput
                                                {...register('invoice_no', { required: true })}
                                                placeholder="Invoice Number"
                                                defaultValue={bilty.invoice_no}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography> Date</Typography>
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
                                                id="date"
                                                type="date"
                                                defaultValue={dateFormat(bilty.date, "yyyy-mm-dd")}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                {...register('date', { required: true })}

                                            />
                                        </Box>
                                    </Box>


                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>Weight</Typography>
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
                                            <OutlinedInput
                                                {...register('weight', { required: true })}
                                                placeholder="Enter Weight Value"
                                                type="number"
                                                defaultValue={bilty.weight}


                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>Goods Value</Typography>

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
                                            <OutlinedInput
                                                {...register('goods_value', { required: true })}
                                                placeholder="Enter Goods Value"
                                                type="number"
                                                defaultValue={bilty.goods_value}
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
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
                                        Update Bilty
                                    </Button>
                                </Box>
                            </Paper>
                        </Container>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default UpdateBilty