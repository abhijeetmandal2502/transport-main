import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import {
  Autocomplete,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import DatePickers from '../../components/DatePickers';
import BreadCrumb from '../../components/BreadCrumb';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import ModalConfirmation from '../../components/ModalConfirmation';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import useSWR from 'swr';
// import { useSession, getSession } from 'next-auth/react';
// import { useForm } from 'react-hook-form';
// import { useSnackbar } from 'notistack';
const options = ['Option 1', 'Option 2'];

const EmployeeRegistration = () => {
  const [selectedValue, setSelectedValue] = React.useState('a');

  const [gender, setGender] = React.useState('');
  const [role, setRole] = React.useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleRoleChange = (event) => {
    setRole(event.target.value);

  };

  // start variable

  // for modal

  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = session && session.user.access_token;
  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // / swr start

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then((res) => res.json());

  // 

  const { data, error } = useSWR(`${process.env.apiUrl}/roles`, fetcher);
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  if (data) {
    if (data.status === 'success') {
      const roleList = data.data;
    } else {
      const roleList = [];
    }
  }


  // end

  // submit

  const onSubmit = async (data) => {

    setFormData({
      employee_id: data.employee_id,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      date_of_join: data.date_of_join,
      date_of_birth: data.date_of_birth,
      salary: data.salary,
      gender: data.gender,
      role: data.role,
      password: data.password,
    });

    setModalData([
      { fieldName: 'Employee Id', data: data.employee_id },
      {
        fieldName: 'Employee Name',
        data: data.name,
      },
      { fieldName: 'Mobile No ', data: data.mobile },
      { fieldName: 'Email', data: data.email },
      { fieldName: 'Date of Join', data: data.date_of_join },
      { fieldName: 'Date of Birth', data: data.date_of_birth },
      { fieldName: 'Salary', data: data.salary },
      { fieldName: 'Gender', data: data.gender },
      { fieldName: 'Emplyee Role', data: data.role },
    ]);

    setModalShow(true);
    setOpen(true);
  };
  const submitForm = async () => {
    setOpen(false);
    const res = await fetch(`${process.env.apiUrl}/register`, {
      body: JSON.stringify(formData),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'POST',
    });

    const result = await res.json();


    if (result.status === 'success') {
      var message = result.message;
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/');
    } else {
      var message = result.errors;
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  // end variable

  return (
    <>
      <FormControl className="suraj" style={{ display: 'flex' }}>
        <BreadCrumb />
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
              Fill User Details
            </Typography>
          </Grid>

          <Grid item xs={6} sm={6}>
            <Box
              style={{
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            ></Box>
          </Grid>
        </Grid>
        <Grid style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Grid item xs={12} sm={12} md={6}>
            {' '}
            <Container
              style={{
                alignItems: 'center',
                paddingLeft: 0,
                paddingRight: 0,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
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
                      // fontWeight: 'bold',
                    }}
                  >
                    User Details
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
                    {/* <Box
                  //   sx={{ display: { xs: "block", sm: "none", lg: "none" } }}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    //   alignItems: "baseline",
                  }}
                >
                  {' '}
                  <Typography>Main Vendor</Typography>
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
                    <Autocomplete
                      style={{ width: '100%' }}
                      disablePortal
                      className="autocomp1"
                      id="combo-box-demo"
                      // options={vendorList}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Main Vendor List"
                          //   {...register('vendorName', { required: true })}
                        />
                      )}
                    />
                  </Box>
                </Box> */}
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
                      <Typography>Employee ID</Typography>
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
                          placeholder="Enter Employee ID"
                          {...register('employee_id', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                        //   {...register('plantName', { required: true })}
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
                      <Typography>Employee Name</Typography>
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
                          placeholder="Enter Employee Name"
                          {...register('name', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                        //   {...register('plantName', { required: true })}
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
                      <Typography>Mobile No.</Typography>
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
                          type="number"
                          placeholder="Enter Mobile No."
                          {...register('mobile', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                        //   {...register('plantName', { required: true })}
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
                      <Typography>Email ID</Typography>
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
                          placeholder="Enter Email ID"
                          {...register('email', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                        //   {...register('plantName', { required: true })}
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
                      <Typography>Date Of Join</Typography>
                      {/* <Box
                        className="suraj"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      > */}
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
                        <TextField
                          style={{
                            width: '-webkit-fill-available',
                            // paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                          type="date"
                          {...register('date_of_join', { required: true })}
                        />
                        {/* </Box> */}
                        {/* <DatePickers
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                          {...register('date_of_join', { required: true })}
                        /> */}
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
                      <Typography>Date Of Birth</Typography>
                      {/* <Box
                        className="suraj"
                        style={{
                          width: '60%',
                          display: 'flex',
                          alignItems: 'center',
                          borderRadius: 5,
                          justifyContent: 'space-between',
                          marginLeft: 10,
                        }}
                      > */}
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
                        <TextField
                          style={{
                            width: '-webkit-fill-available',
                            // paddingLeft: 5,
                            // height: 42,
                            borderRadius: '4px ',
                          }}
                          type="date"
                          {...register('date_of_birth', { required: true })}
                        />
                        {/* </Box> */}
                        {/* <DatePickers
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                          {...register('date_of_join', { required: true })}
                        /> */}
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
                      <Typography>Salary</Typography>
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
                          type="number"
                          placeholder="Enter Amount"
                          {...register('salary', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                        //   {...register('plantName', { required: true })}
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
                      <FormLabel style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                        Gender
                      </FormLabel>{' '}
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
                        <FormControl fullWidth>
                          <Select
                            style={{ height: 42 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            defaultValue="male"
                            {...register('gender', { required: true })}
                            onChange={handleGenderChange}
                          >
                            <MenuItem
                              style={{ padding: 16, display: 'block' }}
                              value={'male'}
                            >
                              Male
                            </MenuItem>
                            <MenuItem
                              style={{ padding: 16, display: 'block' }}
                              value={'female'}
                            >
                              Female
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Box>{' '}
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
                      <FormLabel style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
                        Employee Role
                      </FormLabel>{' '}
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
                        <FormControl fullWidth>
                          <Select
                            style={{ height: 42 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue="Vendor"
                            value={role}
                            {...register('role', { required: true })}
                            onChange={handleRoleChange}
                          >
                            {/* <MenuItem
                              style={{ padding: 16, display: 'block' }}
                              value={'vendor'}
                            >
                              Vendor
                            </MenuItem> */}

                            {roleList.map((item, key) => {
                              return (
                                <MenuItem
                                  style={{ padding: 16, display: 'block' }}
                                  value={item.roleId}
                                  key={key}
                                >
                                  {item.roleName}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
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
                      <Typography>Empoloyee Password</Typography>
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
                          type="password"
                          placeholder="Enter Password"
                          {...register('password', { required: true })}
                          style={{
                            width: '-webkit-fill-available',
                            paddingLeft: 5,
                            height: 42,
                            borderRadius: '4px ',
                          }}
                        //   {...register('plantName', { required: true })}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Divider />
                  <Box
                    style={{
                      paddingTop: 16,
                      marginRight: 16,
                      display: 'flex',
                      justifyContent: 'end',
                    }}
                  >
                    <Button
                      variant="outlined"
                      style={{ background: '#28a745', color: 'white' }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Paper>
              </form>
            </Container>
          </Grid>
          <ModalConfirmation
            open={open}
            setOpen={setOpen}
            confirmationData={modalData}
            submitMethod={submitForm}
            title={'User Registration Confirmation Details'}
          />
        </Grid>
      </FormControl>
    </>
  );
};

export default EmployeeRegistration;