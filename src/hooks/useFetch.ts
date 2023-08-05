import { StringKeyValueObject } from '@interfaces/app';
import HttpProvider from '@providers/HttpProvider';
import { useEffect, useState } from 'react';

const httpProvider = new HttpProvider();

const useFetch = <T, V>(
  url: string,
  mapResponse: (data: T) => V,
  params?: StringKeyValueObject,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<V>();

  const fetchData = async () => {
    const response = await httpProvider.get<T>(url, params);
    const responseMapper = mapResponse(response);
    setData(responseMapper);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const getFetchData = async (queryParams?: StringKeyValueObject) => {
    const response = await httpProvider.get<T>(url, queryParams);
    const responseMapper = mapResponse(response);
    return responseMapper;
  };

  return {
    isLoading,
    data,
    getFetchData,
  };
};

export default useFetch;
