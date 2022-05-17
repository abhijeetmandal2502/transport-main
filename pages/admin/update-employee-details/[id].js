import { Divider } from '@material-ui/core';
import {
  Autocomplete,
  Button,
  Container,
  Grid,
  OutlinedInput,
  Paper,
  TextField,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import BackButton from '../../../components/buttons/BackButton';
import DatePickers from '../../../components/DatePickers';
import BreadCrumb from '../../../components/BreadCrumb';
import Link from 'next/link';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import ModalConfirmation from '../../../components/ModalConfirmation';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const UpdateEmployeeRole = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [modalData, setModalData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //  const [role, setRole] = React.useState('');

  const token = session && session.user.access_token;


  const {
    register,
    resetField,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const roleData = [];
  var roleList = [];
  const userData = [];
  const [roleName, setRoleName] = useState();
  const [roles, setRoles] = useState();
  const [gender, setGender] = React.useState();
  const [empData, setEmpData] = React.useState();

  // / swr start

  const fetchData = async (url) => {
    const req = await fetch(`${process.env.apiUrl}/${url}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    return req;
  };

  const [dataFetchStatus, setDataFetchStatus] = useState('loading');

  useEffect(async () => {
    setDataFetchStatus('loading');
    userData = await fetchData(`employees/${router.query.id}`);
    roleData = await fetchData('roles');
    await initializeData();

    setDataFetchStatus('loaded');
  }, []);

  const initializeData = async () => {
    if (roleData.status === 'success') {

      if (roleData.data.length > 0) {
        roleData.data.map((item) => {
          roleList.push({ title: item.roleName, slug: item.roleId });
        });
      }
      setRoles(roleList);
    } else {
      setRoles();
    }

    if (userData.status === 'success') {
      // 
      if (
        userData.data !== undefined &&
        userData.data !== null &&
        userData.data.length > 0
      ) {
        userData.data.slice(0, 1).map((item) => {
          setEmpData(item);
          //   roleList.push({ title: item.roleName, slug: item.roleId });
          // });
        });
        empData && setGender(empData.gender);
      }

      // if (userData.data.length > 0) {
      //   // userData.data.map((item) => {
      //   //   roleList.push({ title: item.roleName, slug: item.roleId });
      //   // });
      // }
      // setRoles(roleList);
    } else {
      // roleList = [];
    }


  };

  if (dataFetchStatus == 'loading') return <div>Loading...</div>;

  const chooseRoleMethod = (event, value) => {
    // 
    roles.map((role) => {
      if (role.title == value) {
        setRoleName(role.slug);
      } else {
      }
    });
  };

  const handleGenderChange = (event, value) => {
    if (value) {
      setGender(value);
    } else {
      setGender();
    }
  };

  const onSubmit = async (data) => {
    setFormData({
      employee_id: empData.emp_id,
      name: data.name,
      mobile: data.mobile,
      email: data.email,
      gender: gender,
      date_of_join: data.doj,
      date_of_birth: data.dob,
      salary: data.salary,
      password: data.password,
      role: roleName,
    });


    setModalData([
      {
        fieldName: ' Employee Id',
        data: roleName,
      },
      { fieldName: 'Name', data: data.name },

      {
        fieldName: ' Mobile No',
        data: data.mobile,
      },
      {
        fieldName: ' Email',
        data: data.email,
      },
      {
        fieldName: ' Gender',
        data: gender,
      },
      {
        fieldName: ' DOJ',
        data: data.doj,
      },
      {
        fieldName: ' DOB',
        data: data.dob,
      },
      {
        fieldName: ' Salary',
        data: data.salary,
      },
      {
        fieldName: ' Password',
        data: data.password,
      },
    ]);

    setModalShow(true);
    setOpen(true);
  };
  const submitForm = async () => {
    setOpen(false);
    const res = await fetch(
      `${process.env.apiUrl}/update-employees/${empData.id}`,
      {
        body: JSON.stringify(formData),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'POST',
      }
    );

    const result = await res.json();


    if (result.status === 'success') {
      var message = result.message;
      // router.push('/');
      enqueueSnackbar(message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      router.push('/admin/all-employee-list');
    } else {
      var message = result.errors;
      enqueueSnackbar(message, { variant: 'error', autoHideDuration: 2000 });
    }
  };

  // end variable

  return (
    <div>
      {' '}
      {/* <BreadCrumb /> */}
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
          {/* <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
            Add New Role
          </Typography> */}
        </Grid>

        <Grid item xs={6} sm={6}>
          <Box
            style={{
              marginTop: 20,
              marginBottom: 10,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <BackButton url={'/admin/role-management'} />
          </Box>
        </Grid>
      </Grid>
      <form onSubmit={handleSubmit(onSubmit)}>
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
                  Update Employee Details
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
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    {' '}
                    <Typography>Update Role</Typography>
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
                      <Autocomplete
                        fullWidth
                        // multiple
                        id="tags-standard"
                        options={roles.map((item) => {
                          return item.title;
                        })}
                        onChange={chooseRoleMethod}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            placeholder="Choose Role"
                          />
                        )}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Typography> Name</Typography>
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
                      placeholder="Enter user  name"
                      defaultValue={
                        empData.name !== undefined && empData.name !== null
                          ? empData.name
                          : ''
                      }
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 42,
                        borderRadius: '4px ',
                      }}
                      {...register('name', { required: false })}
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Typography> Email</Typography>
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
                      placeholder="Enter email  "
                      defaultValue={empData.email}
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 42,
                        borderRadius: '4px ',
                      }}
                      {...register('email', { required: false })}
                    />
                  </Box>
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  {' '}
                  <Typography>Update Gender</Typography>
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
                    <Autocomplete
                      fullWidth
                      // multiple
                      id="tags-standard"
                      options={['male', 'female']}
                      defaultValue={
                        empData.gender !== undefined && empData.gender !== null
                          ? empData.gender
                          : ''
                      }
                      onChange={handleGenderChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          placeholder="Choose Gender"
                        />
                      )}
                    />
                  </Box>
                </Box>
                {/* <Box
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
                      <InputLabel id="demo-simple-select-label">
                        Select Gender
                      </InputLabel>
                      <Select
                        // label="Select gender"
                        style={{ height: 42 }}
                        // labelId="demo-simple-select-label"
                        // id="demo-simple-select"
                        // labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        // defaultValue="male"
                        {...register('gender', { required: false })}
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
                </Box> */}
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
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Date Of Join</Typography>
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
                      <TextField
                        fullWidth
                        id="date"
                        // label="Date"
                        variant="outlined"
                        type="date"
                        defaultValue={empData.doj}
                        register={register('doj', {
                          required: false,
                          value: empData.doj,
                        })}
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onChange={(e) => dateSelect(e.target.value)}
                      />
                      {/* <DatePickers
                        defaultValue={empData.doj}
                        register={register('doj', { required: false })}
                      /> */}
                    </Box>
                  </Box>
                </Box>
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
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Date Of Birth</Typography>
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
                      <TextField
                        fullWidth
                        id="date"
                        // label="Date"
                        variant="outlined"
                        type="date"
                        defaultValue={empData.dob}
                        register={register('dob', {
                          required: false,
                          value: empData.dob,
                        })}
                        // className={classes.textField}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      // onChange={(e) => dateSelect(e.target.value)}
                      />
                      {/* <DatePickers
                        defaultValue={empData.dob}
                        register={register('dob', { required: false })}
                      /> */}
                    </Box>
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Mobile No </Typography>
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
                      placeholder="Enter Mobile No  "
                      defaultValue={empData.mobile}
                      // onChange={(event, value) => {
                      //   
                      //   if (event.target.value < 0) {
                      //     event.target.value = 0;
                      //   } else {
                      //     event.target.value = event.target.value;
                      //   }
                      // }}
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 42,
                        borderRadius: '4px ',
                      }}
                      {...register('mobile', {
                        required: false,
                        maxLength: 10,
                      })}
                      onChange={(event) =>
                        event.target.value < 0
                          ? (event.target.value = 0)
                          : event.target.value
                      }
                    />
                  </Box>
                </Box>

                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Salary </Typography>
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
                      placeholder="Enter Salary  "
                      defaultValue={empData.salary}
                      // onChange={(event, value) => {
                      //   
                      //   if (event.target.value < 0) {
                      //     event.target.value = 0;
                      //   } else {
                      //     event.target.value = event.target.value;
                      //   }
                      // }}
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 42,
                        borderRadius: '4px ',
                      }}
                      {...register('salary', { required: false })}
                      onChange={(event) =>
                        event.target.value < 0
                          ? (event.target.value = 0)
                          : event.target.value
                      }
                    />
                  </Box>
                </Box>
                <Box
                  style={{
                    display: 'flex',
                    marginBottom: 8,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Password</Typography>
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
                      placeholder="Enter Password  "
                      defaultValue={empData.view_pass}
                      style={{
                        width: '-webkit-fill-available',
                        paddingLeft: 5,
                        height: 42,
                        borderRadius: '4px ',
                      }}
                      {...register('password', {
                        required: false,
                        value: empData.view_pass,
                      })}
                    />
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
            </Container>
          </Grid>
        </Grid>
      </form>
      <ModalConfirmation
        open={open}
        setOpen={setOpen}
        confirmationData={modalData}
        submitMethod={submitForm}
        title={'Update Employee Confirmation Details'}
      />
    </div>
  );
};

export default UpdateEmployeeRole;
