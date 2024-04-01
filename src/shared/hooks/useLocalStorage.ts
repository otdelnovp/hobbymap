import { useState, useEffect } from "react";

function getLocalStorage(key: string, noParse?: boolean) {
  const storage = localStorage.getItem(key);
  if (storage && storage !== "undefined")
    return noParse ? storage : JSON.parse(storage);
  return undefined;
}

function setLocalStorage(key: string, value: any, noStringify?: boolean) {
  localStorage.setItem(key, noStringify ? value : JSON.stringify(value));
}

function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

function useLocalStorage(key: string, initialValue?: any) {
  const getValue = () => getLocalStorage(key) || initialValue;

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    setLocalStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}

export {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
  useLocalStorage,
};
