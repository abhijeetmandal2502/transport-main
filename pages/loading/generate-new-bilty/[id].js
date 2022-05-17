import React from 'react';
import { useRouter } from 'next/router';
import NewBilty from '../../../components/loading/NewBilty';
import BreadCrumb from '../../../components/BreadCrumb';
// '../../../components/settings/BreadCrumb';

const GenerateNewBilty = () => {
  const router = useRouter();

  const lrId = router.query.id;

  return (
    <>
      <BreadCrumb id={lrId} />
      <NewBilty />
    </>
  );
};

export default GenerateNewBilty;
