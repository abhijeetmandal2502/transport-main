import { useState, createContext, useMemo } from 'react';

const BiltyDataContext = createContext();

const BiltyDataProvider = (props) => {
  const [biltyData, setBiltyData] = useState('');
  // the state that we'll be storing the username into

  /* because we will be providing an object to the provider, it is better to put the value inside a useMemo so that the component will only re-render when there's a change in the value. */

  const value = useMemo(() => ({ biltyData, setBiltyData }), [biltyData]);

  return (
    <BiltyDataContext.Provider value={value}>
      {props.children}
    </BiltyDataContext.Provider>
  );
};
export { BiltyDataContext, BiltyDataProvider };
