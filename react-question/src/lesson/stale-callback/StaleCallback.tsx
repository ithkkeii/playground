import React, { useCallback, useEffect, useState } from 'react';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const StaleCallback = () => {
  const [counter, setCounter] = useState(0);
  const [cancel, setCancel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // The counter function will snapshot counter value when it's created (function itself created).
  // and don't re create when we not provide dependence
  // hence counter always equal 0.
  const handleIncrement = useCallback(() => {
    setCounter(counter + 1);
  }, []);

  const fetchSomething = () => {
    console.log('created');
    setCancel(false);
    setIsLoading(true);

    // Counter will always be the value when delay is trigger,
    // at that time the counter's value is snapshot and regardless
    // whatever counter's value become when delay is not resolve yet
    // counter inside console.log will not be affected.
    delay(3000).then(() => {
      if (cancel) return;

      console.log(cancel);
      console.log(counter);
      setIsLoading(false);
    });
  };

  const handleFetchSomething = () => {
    fetchSomething();
    // setIsLoading(true);
  };

  const handleCancel = () => {
    setCancel(true);
    setIsLoading(false);
  };

  return (
    <div>
      <p>{counter}</p>
      <p>{isLoading ? 'loading...' : 'idle'}</p>
      <button onClick={handleIncrement}>INCREMENT</button>
      <br />
      <button onClick={handleFetchSomething}>Fetch something.</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default StaleCallback;
