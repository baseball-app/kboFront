import {useEffect, useRef} from 'react';

const useEffectOnce = (callback: () => void) => {
  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      callback();
      isCalled.current = true;
    }
  }, []);
};

export {useEffectOnce};
