/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from 'react';
import deepEqual from 'fast-deep-equal';

const useDeepCompareMemoize = (value) => {
  const ref = useRef();

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

const useDeepCompareEffect = (callback, dependencies) => {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
};

export default useDeepCompareEffect;
