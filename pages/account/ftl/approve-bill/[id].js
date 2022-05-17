import { Box, Button, Container, Divider, Grid, OutlinedInput, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import BreadCrumb from '../../../../components/BreadCrumb'
import { useSession, getSession } from 'next-auth/react'
import { useForm } from "react-hook-form";
import { string } from 'yup';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

const ChangeBillStatus = ({ data }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { data: session } = useSession();
    const token = session.user.access_token;

    const router = useRouter();
    const id = router.query.id;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const req = await fetch(
                `${process.env.apiUrl}/offline-invoice/${id}`,
                {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        status: 'closed',
                        received_amount: data.amount_recieved,
                        tds_amount: data.tds,
                        narration: data.narattion
                    })
                }
            );

            const res = await req.json();


            if (res.status === 'success') {

                router.push("/account/ftl/approve-bill")

                var message = res.message;
                enqueueSnackbar(message, {
                    variant: 'success',
                })
            }
            else {
                var message = res.errors;
                enqueueSnackbar(message, {
                    variant: 'error',
                })
            }
        }
        catch (err) {

            enqueueSnackbar(err, {
                variant: 'error',
            })

            // 
        }


    }
    return (
        <>
            <BreadCrumb />
            <Grid container style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                        Approve Bill
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                        }}
                    ></Box>
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
                                    Bill No : {data.bill_no}
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
                                        <Typography>Consignor : </Typography>
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
                                            <Typography >{data.consignor}</Typography>
                                        </Box>
                                    </Box>
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
                                        <Typography>GST No. : </Typography>
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
                                            <Typography >{data.gst_no}</Typography>
                                        </Box>
                                    </Box>

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
                                        <Typography>Weight : </Typography>
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
                                            <Typography >{parseFloat(data.total_weight)} Kg</Typography>
                                        </Box>
                                    </Box>
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
                                        <Typography>Bill Amount : </Typography>
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
                                            <Typography >{parseFloat(data.total_amount)}</Typography>
                                        </Box>
                                    </Box>

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
                                        <Typography>Rec. Amount : </Typography>
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
                                                placeholder="Recieved Amount"
                                                type="number"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                {...register('amount_recieved', { required: true })}
                                            />
                                        </Box>
                                    </Box>

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
                                        <Typography>TDS : </Typography>
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
                                                placeholder="TDS Amount"
                                                type="number"
                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}

                                                {...register('tds', { required: true })}
                                            />
                                        </Box>
                                    </Box>
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
                                        <Typography>Narattion : </Typography>
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
                                                placeholder="Narattion"

                                                style={{
                                                    width: '-webkit-fill-available',
                                                    paddingLeft: 5,
                                                    height: 36,
                                                    borderRadius: '4px ',
                                                }}
                                                {...register('narattion', { required: true })}
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
                                        Update
                                    </Button>
                                </Box>
                            </Paper>
                        </Container>
                        {/* <input type="submit" /> */}
                    </form>
                    {/* grid part */}
                </Grid>
            </Grid>

        </>
    )
}

export default ChangeBillStatus

export async function getServerSideProps(ctx) {

    // @Id Get id from params 
    const id = ctx.query.id;
    // get token from session
    const session = await getSession(ctx);
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;


        var data = [];
        try {
            const req = await fetch(
                `${process.env.apiUrl}/offline-invoice/${id}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
                }
            );
            var res = await req.json();

            if (res.status === 'success') {
                data = res.data;
            } else {
                data = [];
            }
        } catch (error) {
            data = [];
        }
    } else {
        var data = [];
    }

    // Pass data to the page via props
    return { props: { data } };
}