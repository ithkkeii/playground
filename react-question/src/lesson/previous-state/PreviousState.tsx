import React, { useCallback, useState } from 'react';
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

  return (
    <div>
      <p>{counter}</p>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleSyncClick}>Sync Click</button>
    </div>
  );
};

export default PreviousState;
