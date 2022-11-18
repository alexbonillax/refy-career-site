import { useState } from "react";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  let timeout: string | number | NodeJS.Timeout;

  const setDebounce = (newValue: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setDebouncedValue(newValue), delay);
  };

  return [debouncedValue, setDebounce];
};