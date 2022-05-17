import { Box, Button, Container, Divider, Grid, Paper, Snackbar, Typography } from "@material-ui/core";
import { Alert, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import React, { useState } from 'react'
import BreadCrumb from '../../components/BreadCrumb';
import BackButton from "../../components/buttons/BackButton";
import { useForm } from "react-hook-form";
import { useSession, getSession } from "next-auth/react";
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'


const VehicleType = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { register, handleSubmit, setValue } = useForm();

  const router = useRouter();

  // get token from session
  const { data: session } = useSession()
  const token = session.user.access_token


  const onSubmit = async (data) => {

    try {
      const req = await fetch(`${process.env.apiUrl}/create-category`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type_name: data.vehicle_type
        })
      })

      const res = await req.json();

      if (res.status === 'success') {
        enqueueSnackbar(res.message, {
          variant: 'success',
          autoHideDuration: 2000
        });


        router.push("/settings/vehicle-category")
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
                url={"/settings/vehicle-category"}
                name={"Add New Location"}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
      <form onSubmit={handleSubmit(onSubmit)} >

        {/* Trisha */}

        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={12} sm={8}>
            <Paper
              sx={{ width: '100%', overflow: 'hidden' }}
              style={{ paddingBottom: 16, paddingTop: 16 }}
              elevation={4}
            >

              <Grid container spacing={2} style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                paddingBottom: 16,
              }} >
                <Grid item xs={12} md={12}>
                  <Box
                    style={{
                      marginBottom: 8,
                      display: 'flex',
                      // justifyContent: 'flex-end',
                      alignItems: 'baseline',
                    }}
                  >
                    <Typography>Add Vehicle Type</Typography>
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
                        placeholder="Add Vehicle Type"
                        // inputProps={{ style: { textTransform: 'uppercase' } }}
                        style={{
                          width: '-webkit-fill-available',
                          paddingLeft: 5,
                          height: 36,
                          borderRadius: '4px ',
                        }}
                        {...register('vehicle_type', { required: true })}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Box
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Button
                  type="submit"
                  variant="outlined"
                  style={{
                    marginRight: 10,
                    background: 'green',
                    color: 'white',
                    padding: '5px 40px',
                  }}
                >
                  Add
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

      </form>
    </>
  )
}

export default VehicleType