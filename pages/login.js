import React, { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Typography,
  Grid,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
} from "@mui/material";
import Image from "next/image";

// from saurabh
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loader from "../components/utilities/Loader";

import logo1 from "../public/TA_sidcul__black_-removebg-preview.png";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  role: yup.string().required('Select role for login'),
  userid: yup.string().required('userid is required Field'),
  userid: yup.string().required('userid is required Field'),
}).required();


// end

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const linkStyle = { marginTop: 10 };
  const avtarStyle = { backgroundColor: "#6881dc" };
  const paperStyle = {
    padding: 20,
    paddingBottom: 40,
    maxWidth: 400,
    height: "auto",
    margin: "20px auto",
    radius: 10,
    borderRadius: 10,
    border: "1px solid lightgray",
  };

  const router = useRouter();
  const { data: session, status } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();



  const getData = async () => {
    if (status == "authenticated") {
      router.push("/");
    }
  };
  // useEffect(() => {
  //   getData();
  // }, []);

  const [allRoles, setRoles] = useState([]);

  useEffect(() => {
    getData();
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.apiUrl}/roles`);
      allRoles = await res.json();
      if (allRoles.status == "success") {
        const tempRoles = [];
        allRoles.data.map((item) => {
          tempRoles.push({ roleId: item.roleId, roleName: item.roleName });
        });
        setRoles(tempRoles);
      }
    } catch (err) {

      // alert(err);
    }
  };

  const [loader, setLoader] = useState(false);

  const onSubmit = async (formData) => {
    setLoader(true);

    var result = await signIn("credentials", {
      redirect: false,
      email: formData.userid,
      password: formData.password,
      role: formData.role,
    });

    if (result.error) {
      setLoader(false);
      enqueueSnackbar(result.error, {
        variant: "error",
        autoHideDuration: 3000,
      });
    } else {
      setLoader(false);
      enqueueSnackbar("Successfully logged in !", {
        variant: "success",
        autoHideDuration: 3000,
      });
      router.push("/");
    }
  };

  if (status == "authenticated") return null;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Typography
            style={{ marginBottom: 10, fontWeight: 400 }}
            component="h1"
            variant="h5"
          >
            Sign in
          </Typography>
          <Image src={logo1} />

          <Grid style={{ alignItems: "center" }} sx={{ mt: 1 }}>
            <FormControl margin="normal" fullWidth>
              <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
              <Select
                style={{ textAlign: "start" }}
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Select Role"
                {...register("role", { required: true })}
              >
                {allRoles.map((item) => (
                  <MenuItem value={item.roleId} key={item.roleId}>
                    {item.roleName.replace(/\b\w/g, (l) => l.toUpperCase())}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address / Username"
                name="email"
                autoComplete="email"
                autoFocus
                {...register("userid", { required: true })}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="outlined-basic"
                variant="outlined"
                {...register("password", { required: true })}
              />
            </FormControl>
            <Link style={{ marginBottom: "10" }} href="/">
              Forget Password?{" "}
            </Link>

            {loader ? (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  // my='10px'
                }}
                sx={{
                  my: 5,
                }}
              >
                <Loader />
              </Box>
            ) : (
              <Button
                style={{
                  marginTop: "20px",
                  borderRadius: "6px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
                color="primary"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Sign In
              </Button>
            )}
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};
export default Login;
