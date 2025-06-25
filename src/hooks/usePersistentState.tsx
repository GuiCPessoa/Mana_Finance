import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function usePersistentState<T>(key: string, initialState: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storageValue = window.localStorage.getItem(key);
      if (storageValue) {
        return JSON.parse(storageValue);
      }
    } catch (error) {
      console.error(`Error reading localStorage key “${key}”:`, error);
    }
    return initialState;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(`Error setting localStorage key “${key}”:`, error);
    }
  }, [key, state]);

  return [state, setState];
}

export default usePersistentState; 