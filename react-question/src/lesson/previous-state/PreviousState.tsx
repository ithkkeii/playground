import React, { useCallback, useEffect, useState } from 'react';
import { delay } from '../../utils/delay';

const PreviousState = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = useCallback(() => {
    setCounter((prev) => prev + 1);
  }, []);

  // prev always the newest value although nothing is provided
  // in dependency array.
  const handleSyncClick = useCallback(() => {
    delay(5000).then(() => setCounter((prev) => prev + 1));
  }, []);

  let isTriggerReturn = false;

  // return will execute when counter is change.
  useEffect(() => {
    return () => {
      isTriggerReturn = true;
      console.log(isTriggerReturn);
    };
  }, [counter]);

  // setCounter will not recreate when state change.
  useEffect(() => {
    console.log('re render');
  }, [setCounter]);

  return (
    <div>
      <p>{counter}</p>
      <p>{isTriggerReturn ? 'true' : 'false'}</p>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleSyncClick}>Sync Click</button>
    </div>
  );
};

export default PreviousState;
