import { useState } from 'react';

export const useLocalStorage = (key: string, initialValue: any) => {
  const storedValue = localStorage.getItem(key);
  const parsedValue = storedValue ? JSON.parse(storedValue) : initialValue;
  const [value, setValue] = useState(parsedValue);

  const setStoredValue = (newValue: any) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue];
};
