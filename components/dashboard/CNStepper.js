import React, { useEffect, useState } from 'react';
import { Divider, Stack, Box, HStack, Typography } from '@mui/material/';
import { useSession, getSession } from 'next-auth/react';
import logo from '../../public/img/Ta_Sidcul__white_-removebg-preview.png';
import Image from 'next/image';
import disableTruck from '../../public/img/disable-turck.png';
import yelloTruk from '../../public/img/yellow-truck.png';
import redTruck from '../../public/img/red-truck.png';
import verifyTruck from '../../public/img/verified-truck.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Card, CardContent, Paper } from '@mui/material';
//
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { height } from '@mui/system';

export const textState = atom({
  key: 'textState', // unique ID (with respect to other atoms/selectors)
  default: 'LR11052022S5', // default value (aka initial value)
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const text = get(textState);

    return text;
  },
});

const styles = (theme) => ({
  modalStyle1: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    overflow: 'scroll',
    height: '100%',
    display: 'block',
  },
});

const CNStepper = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    scrollBehavior: 'auto',
  }));

  const steps = 5;
  const tempArr = [1, 2, 3, 4, 5, 6, 7];
  const router = useRouter();

  const customwidth = `${100 / steps}%`;

  // const cnNo = 'LR11052022S5';
  const { data: session } = useSession();
  const token = session.user.access_token;

  const [stagesData, setStagesData] = useState();
  const searchValue = useRecoilValue(charCountState);

  const fetchData = async () => {
    // console.log('checkresponse', res);
    console.log('fetchData 1 ');

    if (searchValue != null) {
    }

    const req = await fetch(`${process.env.apiUrl}/lr-stages/${searchValue}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('checkresponse 2', req);
    const res = await req.json();
    console.log('checkresponse 3', res);
    setStagesData(res.data);
    return res;
  };

  useEffect(() => {
    // console.log('chcksounnt', stagesData);
    fetchData();
  }, [searchValue]);

  // useEffect(() => {}, [searchValue]);

  {
    // console.log('checkresponse', Object.entries(stagesData)[0]);
  }

  //   console.log('');

  let procesingIndexForMobile;
  let procesingIndexForDeskTop;

  return (
    <Box>
      {
        <Paper
          style={{
            padding: 20,
            marginBottom: 30,
            paddingTop: 10,
            boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          }}
        >
          <Typography
            style={{ fontWeight: 600, fontSize: 14 }}
            marginBottom={'5px'}
          >
            Result for: {searchValue}
          </Typography>
          {stagesData === undefined ? (
            <Typography
              style={{ fontWeight: 600, fontSize: 14 }}
              color="white"
              gutterBottom
              position="relative"
              backgroundColor="#3f3e3e54"
              width={'max-content'}
              paddingX={'5px'}
              borderRadius={'10px'}
              textAlign={'center'}
              marginX="auto"
              // background="white"
            >
              no data available
            </Typography>
          ) : (
            <div></div>
          )}
          {/* for mobile */}
          <Box
            paddingTop={'0px'}
            // overflow={true}
            // height={}
            sx={{ width: '100%' }}
            // style={{ overflow: 'auto' }}
            display={{
              xs: 'contents',
              base: 'contents',
              md: 'none',
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 2, md: 3 }}
              // scroll
            >
              {stagesData &&
                Object.entries(stagesData).map((item, value) => {
                  if (item[1] == 'pending' && procesingIndexForMobile == null) {
                    procesingIndexForMobile = value;
                  }
                  return (
                    <Grid item xs={12} gap={5} mx={'0px'}>
                      <motion.div
                        whileHover={{
                          scale: procesingIndexForMobile == value ? 1.1 : 1.0,
                        }}
                        id="imghgt"
                      >
                        <Box>
                          <Paper
                          //  style={{ position: 'relative ' }}
                          >
                            <Card
                              variant="outlined"
                              style={{
                                height: '40px',
                                alignContent: 'center',
                                alignItems: 'start',
                                // paddingBottom: 24,
                                // border: '2px',
                                borderColor: '#FFD600',
                                borderWidth: '2px',
                                // backgroundColor: '#FFF4BB',
                                background:
                                  'linear-gradient(to right bottom, #5b6073, #5b607387)',
                                // backgroundImage:
                                //   'url(https://wptesting.thenwg.xyz/wp-content/uploads/2022/03/background-wave-red-blue.png), linear-gradient(45deg, #3ad11e42, transparent)',
                                // backgroundSize: 'cover',
                              }}
                              onClick={() => {
                                const slug =
                                  item[0] == 'fresh'
                                    ? `/booking/new-booking`
                                    : item[0] == 'v-assigned'
                                    ? `/booking/vehicle-assignment/${searchValue}`
                                    : item[0] == 'loading'
                                    ? '/loading/bilty-generate'
                                    : item[0] == 'advance'
                                    ? `/account/new-advance-payment/${searchValue}`
                                    : item[0] == 'unload'
                                    ? `/account/unload-vehicle/${searchValue}`
                                    : item[0] == 'v-payment'
                                    ? `/account/final-payment-list/${searchValue}`
                                    : item[0] == 'c-payment'
                                    ? `/account/pending-consignor-payment/${searchValue}`
                                    : '';

                                if (procesingIndexForMobile == value) {
                                  router.push(slug);
                                }
                              }}
                            >
                              <CardContent>
                                <Box
                                  display="flex"
                                  justifyContent={'space-between'}
                                  // paddingY="auto"
                                  alignItems={'center'}
                                >
                                  <Typography
                                    style={{ fontWeight: 500, fontSize: 8 }}
                                    color="white"
                                    // gutterBottom
                                    // position="relative"
                                    backgroundColor="#3f3e3e54"
                                    width={'max-content'}
                                    paddingX={'5px'}
                                    borderRadius={'10px'}
                                    textAlign="center"
                                    // background="white"
                                  >
                                    {item[0].toLocaleUpperCase()}
                                  </Typography>

                                  <Image
                                    // height="10px"
                                    // width="50px"
                                    height="20px"
                                    width="40px"
                                    alignItems="center"
                                    src={
                                      item[1] == 'completed'
                                        ? verifyTruck
                                        : procesingIndexForMobile == value
                                        ? yelloTruk
                                        : disableTruck
                                    }
                                    objectFit="fill"
                                  ></Image>
                                </Box>

                                {/* <Typography
                              style={{
                                background: 'white',
                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                                width: 26,
                                display: 'flex',
                                border: '1px solid #cdcdcd',
                                borderRadius: 25,
                                justifyContent: 'center',
                                position: 'absolute',
                                bottom: 5,
                                right: 5,
                              }}
                            >
                              pk 2
                            </Typography> */}
                              </CardContent>
                            </Card>
                          </Paper>
                        </Box>
                      </motion.div>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
          {/* for desktop */}

          <Box
            display={{
              xs: 'none',
              base: 'none',
              md: 'flex',
            }}
            alignItems={'center'}
            alignSelf="center"
            textAlign="center"
            marginLeft={'auto'}
            marginRight={'auto'}
            //   backgroundColor="orange"
          >
            {stagesData &&
              Object.entries(stagesData).map((item, value) => {
                console.log('items', value, item);
                if (item[1] == 'pending' && procesingIndexForDeskTop == null) {
                  procesingIndexForDeskTop = value;
                }

                // console.log('checkprocess', item);
                return (
                  <Box
                    display={{
                      xs: 'none',
                      base: 'none',
                      md: 'flex',
                    }}
                    alignItems={'center'}
                    alignContent={'center'}
                    // alignSelf="center"
                    // textAlign="center"
                    marginLeft={'auto'}
                    marginRight={'auto'}
                    // marginBottom={'25px'}
                    // backgroundColor="purple"
                    width={'100%'}
                  >
                    <Stack
                      alignItems={'center'}
                      width="100px"
                      sx={{ cursor: 'pointer' }}
                      // marginBottom={'10px'}
                      onClick={() => {
                        const slug =
                          item[0] == 'fresh'
                            ? `/booking/new-booking`
                            : item[0] == 'v-assigned'
                            ? `/booking/vehicle-assignment/${searchValue}`
                            : item[0] == 'loading'
                            ? `/loading/generate-new-bilty/${searchValue}`
                            : // '/loading/bilty-generate'
                            item[0] == 'advance'
                            ? `/account/new-advance-payment/${searchValue}`
                            : item[0] == 'unload'
                            ? `/account/unload-vehicle/${cnsearchValueNo}`
                            : item[0] == 'v-payment'
                            ? `/account/final-payment-list/${searchValue}`
                            : item[0] == 'c-payment'
                            ? `/account/pending-consignor-payment/${searchValue}`
                            : '';

                        if (procesingIndexForDeskTop == value) {
                          router.push(slug);
                        }
                      }}
                    >
                      <motion.div
                        whileHover={{
                          scale: procesingIndexForDeskTop == value ? 1.8 : 1.0,
                        }}
                        id="imghgt"
                      >
                        <Image
                          src={
                            item[1] == 'completed'
                              ? verifyTruck
                              : procesingIndexForDeskTop == value
                              ? yelloTruk
                              : disableTruck
                          }
                          height="20px"
                          width="30px"
                          objectFit="cover"
                        />
                      </motion.div>
                      {/* <Box
                  borderRadius={'10px'}
                  sx={{
                    backgroundColor: 'gray',
                    height: '20px',
                    width: '20px',
                  }}
                ></Box> */}
                      <Typography
                        marginTop={'5px'}
                        fontSize={'8px'}
                        fontFamily={'serif'}
                        fontWeight={'bold'}
                        color={
                          item[1] == 'completed'
                            ? '#36a426'
                            : procesingIndexForDeskTop == value
                            ? '#FFD600'
                            : 'gray'
                        }
                      >
                        {item[0].toLocaleUpperCase()}
                      </Typography>
                    </Stack>

                    {value != Object.entries(stagesData).length - 1 ? (
                      <Box
                        height={'3px'}
                        width={'100%'}
                        backgroundColor={
                          item[1] == 'completed'
                            ? '#36a426'
                            : procesingIndexForDeskTop == value
                            ? '#FFD600'
                            : 'gray'
                        }
                      ></Box>
                    ) : null}
                  </Box>
                );
              })}
          </Box>
        </Paper>
      }
    </Box>
  );
};

export default CNStepper;
