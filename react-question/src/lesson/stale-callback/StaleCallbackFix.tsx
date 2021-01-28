import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { delay } from '../../utils/delay';

type ActionType = {
  type: 'fetch' | 'resolve' | 'cancel';
};

type StateType = {
  status: 'loading' | 'success' | 'idle';
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'fetch':
      return { status: 'loading' };
    case 'resolve':
      return { status: 'success' };
    case 'cancel':
      return { status: 'idle' };
    default:
      return state;
  }
};

const StaleCallbackFix = () => {
  const [state, dispatch] = useReducer(reducer, { status: 'idle' });

  // Stale callback fix
  useEffect(() => {
    if (state.status === 'loading') {
      let canceled = false;

      delay(5000).then(() => {
        if (canceled) return;

        console.log('Resolve', canceled);
        dispatch({ type: 'resolve' });
      });

      return () => {
        canceled = true;
      };
    }
  }, [state.status]);

  return (
    <div>
      <p>{state.status}</p>
      <br />
      <button onClick={() => dispatch({ type: 'fetch' })}>
        Fetch something.
      </button>
      <button onClick={() => dispatch({ type: 'cancel' })}>Cancel</button>
    </div>
  );
};

export default StaleCallbackFix;
