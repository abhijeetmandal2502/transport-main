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
//
const CNStepper = () => {
  const steps = 5;
  const tempArr = [1, 2, 3, 4, 5, 6, 7];
  const router = useRouter();

  const customwidth = `${100 / steps}%`;

  const cnNo = 'LR11052022S5';
  const { data: session } = useSession();
  const token = session.user.access_token;

  const [stagesData, setStagesData] = useState();

  const fetchData = async () => {
    // console.log('checkresponse', res);
    // console.log('checkresponse 1 ', token);

    const req = await fetch(`${process.env.apiUrl}/lr-stages/LR11052022S5`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log('checkresponse 2', req);
    const res = await req.json();
    // console.log('checkresponse 3', res);
    setStagesData(res.data);
    return res;
  };
  useEffect(() => {
    fetchData();
  }, []);

  {
    // console.log('checkresponse', Object.entries(stagesData)[0]);
  }

  //   console.log('');

  let procesingIndex;

  return (
    <Box
      display={'flex'}
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
          if (item[1] == 'pending' && procesingIndex == null) {
            procesingIndex = value;
          }

          console.log('checkprocess', item);
          return (
            <Box
              display={'flex'}
              alignItems={'center'}
              // alignSelf="center"
              // textAlign="center"
              marginLeft={'auto'}
              marginRight={'auto'}
              marginBottom={'25px'}
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
                      ? `/booking/vehicle-assignment/${cnNo}`
                      : item[0] == 'loading'
                      ? '/loading/bilty-generate'
                      : item[0] == 'advance'
                      ? `/account/new-advance-payment/${cnNo}`
                      : item[0] == 'unload'
                      ? `/account/unload-vehicle/${cnNo}`
                      : item[0] == 'v-payment'
                      ? `/account/final-payment-list/${cnNo}`
                      : item[0] == 'c-payment'
                      ? `/account/pending-consignor-payment/${cnNo}`
                      : '';

                  if (procesingIndex == value) {
                    router.push(slug);
                  }
                }}
              >
                <motion.div
                  whileHover={{ scale: procesingIndex == value ? 1.8 : 1.0 }}
                  id="imghgt"
                >
                  <Image
                    src={
                      item[1] == 'completed'
                        ? verifyTruck
                        : procesingIndex == value
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
                      : procesingIndex == value
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
                      : procesingIndex == value
                      ? '#FFD600'
                      : 'gray'
                  }
                ></Box>
              ) : null}
            </Box>
          );
        })}
    </Box>
  );
};

export default CNStepper;
