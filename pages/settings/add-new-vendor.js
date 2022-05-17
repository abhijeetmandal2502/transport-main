import { Box, Button, Container, Divider, Grid, Paper, Snackbar, Typography } from "@material-ui/core";
import { Alert, OutlinedInput } from "@mui/material";

import React, { useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb';
import BackButton from "../../components/buttons/BackButton";
import { useForm } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'


const AddNewVendor = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit, setValue } = useForm();

  const router = useRouter();

  // get token from session
  const { data: session } = useSession()
  const token = session.user.access_token


  const onSubmit = async (data) => {

    try {
      const req = await fetch(`${process.env.apiUrl}/create-vendor`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: data.vendorName
        })
      })

      const res = await req.json();

      if (res.status === 'success') {
        enqueueSnackbar(res.message, {
          variant: 'success',
          autoHideDuration: 3000
        });


        router.push("/settings/vendors-list")
      }
      else {
        enqueueSnackbar(res.errors, {
          variant: 'error',
          autoHideDuration: 3000
        });
      }
    }
    catch (err) {
      alert(err)
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
            id="surjid"
            sx={{ overflow: "hidden" }}
            style={{ paddingBottom: 16, paddingTop: 16, display: "flex", justifyContent: "space-between" }}
            elevation={4}
          >
            <Box style={{ width: "100%", }} sx={{ display: { sm: 'block', md: 'flex' } }}>
              <Box style={{ minWidth: "fit-content" }} ><Typography variant="h6" style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16, }}>
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
                  {...register("vendorName", { required: true })}

                />
                <Button style={{ border: "1px solid lightgray", marginLeft: 4, background: "green", color: "white" }}
                  type="submit"
                >Add</Button>
              </Box>
            </Box>
          </Paper>
        </Box>
      </form>
    </>
  )
}

export default AddNewVendor