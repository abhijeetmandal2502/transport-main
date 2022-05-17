import { useRouter } from 'next/router';
import useSWR from 'swr';
import VehicleAssign from '../../../components/booking/VehicleAssign';
import BreadCrumb from '../../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const VehicleAsgn = ({ vehicleInfo }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session.user.access_token;
  const [result, setResult] = useState([]);

  const lrId = router.query.id;

  useEffect(() => {
    fetchData();
  }, [lrId]);

  const fetchData = async () => {
    const req = await fetch(`${process.env.apiUrl}/lr-bookings/1/${lrId}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await req.json();
    if (res.status == 'success') {
      var result = res.data[0];
      setResult(result);
    } else {
    }
  };

  return (
    <>
      <BreadCrumb id={lrId} />
      <VehicleAssign id={lrId} lrinfo={result} vehicleInfo={vehicleInfo} />
    </>
  );
};

export default VehicleAsgn;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    // Fetch data from external API
    const driversResult = await fetch(
      `${process.env.apiUrl}/free-vehicles/driver`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const drivers = await driversResult.json();
    const vehicleResult = await fetch(
      `${process.env.apiUrl}/free-vehicles/vehicle`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const vehicles = await vehicleResult.json();

    var vehicleInfo = { vehicles: [], drivers: [] };
    var driversArr = [];
    var vehiclesArr = [];

    if (vehicles.status === 'success') {
      vehiclesArr = vehicles.data;
    }

    if (drivers.status === 'success') {
      driversArr = drivers.data;
    }

    vehicleInfo = {
      vehicles: vehiclesArr,
      drivers: driversArr,
    };
  } else {
    var vehicleInfo = [];
  }

  // Pass data to the page via props
  return { props: { vehicleInfo } };
}
