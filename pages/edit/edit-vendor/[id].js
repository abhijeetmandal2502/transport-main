import { Box, Button, Container, Divider, Grid, Paper, Snackbar, Typography } from "@material-ui/core";
import { Alert, MenuItem, OutlinedInput, Select } from "@mui/material";

import React, { useState } from 'react'
import BreadCrumb from '../../../components/BreadCrumb';
import BackButton from "../../../components/buttons/BackButton";
import { useForm } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'

const UpdateVendor = ({ vendorData }) => {


    // Active unactive 
    const [status, setStatus] = useState('active');
    const [id, setId] = useState(vendorData[0].id)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const { register, handleSubmit, setValue } = useForm();

    const router = useRouter();

    // get token from session
    const { data: session } = useSession()
    const token = session.user.access_token


    const onSubmit = async (data) => {


        try {
            const req = await fetch(`${process.env.apiUrl}/vendors/${id}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: data.vendorName,
                    status: data.status
                })
            })

            const res = await req.json();



            if (res.status === 'success') {
                enqueueSnackbar(res.message, {
                    variant: 'success',
                    autoHideDuration: 3000
                });


                router.push("/settings/vendors")
            }
            else {
                enqueueSnackbar(res.errors, {
                    variant: 'error',
                    autoHideDuration: 3000
                });
            }
        }
        catch (err) {
            enqueueSnackbar(err, {
                variant: 'error',
                autoHideDuration: 3000
            });
        }


    }

    return (
        <>
            <BreadCrumb />
            <Container
                style={{
                    alignItems: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <Grid container style={{ marginBottom: 15 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
                            Add New Vendor
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "flex-start", sm: "flex-end" },
                            }}
                        >
                            <BackButton
                                url={"/settings/vendors"}
                                name={"Add New Location"}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Paper
                        sx={{ width: "100%", overflow: "hidden" }}
                        style={{ paddingBottom: 16, paddingTop: 16, width: "70%", display: "flex", justifyContent: "space-between" }}
                        elevation={4}
                    >
                        <Box ><Typography variant="h6" style={{ width: "max-content", paddingLeft: 16, paddingRight: 16, paddingBottom: 16, }}>
                            Vendor Name
                        </Typography>
                        </Box>


                        <Box
                            style={{
                                width: "inherit",
                                display: 'flex',
                                alignItems: 'center',
                                borderRadius: 5,
                                justifyContent: 'space-between',
                                marginLeft: 10,
                                paddingRight: 16
                            }}
                        >
                            <OutlinedInput
                                placeholder="Vendor Name"
                                style={{
                                    width: '-webkit-fill-available',
                                    paddingLeft: 5,
                                    height: 36,
                                    borderRadius: '4px ',
                                }}
                                defaultValue={vendorData[0].name}
                                {...register("vendorName", { required: true })}

                            />
                            <Select
                                labelId="demo-simple-select-label"
                                // id="demo-simple-select"
                                displayEmpty
                                style={{ width: 165, marginLeft: 10, marginRight: 10, height: 36 }}
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                {...register("status", { required: true })}
                            >
                                <MenuItem value='active'>Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                            <Button style={{ border: "1px solid lightgray", marginLeft: 4, background: "green", color: "white" }}
                                type="submit"
                            >Update</Button>

                        </Box>
                    </Paper>
                </Box>
            </form>
        </>
    )
}

export default UpdateVendor;

export async function getServerSideProps(ctx) {
    // Fetch data from external API
    const { params } = ctx;
    const slug = params.id.replace(/-/g, '_');

    const session = await getSession(ctx);
    var vendorData = [];
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;

        try {
            const req = await fetch(`${process.env.apiUrl}/vendors/${slug}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const res = await req.json();

            if (res.status === 'success') {
                vendorData = res.data;
            } else {
                vendorData = [];
            }
        }
        catch (err) {

        }

    }

    // Pass data to the page via props
    return { props: { vendorData } };
}