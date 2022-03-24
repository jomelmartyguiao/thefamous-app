import { useEffect, useState } from 'react';

const useGetLocalStorage = (key: string, defaultValue: any): any => {
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    const localData = localStorage.getItem(key);
    const newData = localData ?? defaultValue;
    setData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return data;
};

export default useGetLocalStorage;
