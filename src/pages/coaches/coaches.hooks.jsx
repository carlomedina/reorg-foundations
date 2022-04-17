import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useApi, useFormInputChange } from '../../hooks';

const useCoachesHook = (context) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [coaches, setCoaches] = useState([]);
  const [page, setPage] = useState(searchParams.get('page') || 1);

  const VERSION = 'noPage';
  const URL = {
    page: 'https://reqres.in/api/users',
    noPage: 'https://jsonplaceholder.typicode.com/users',
  }[VERSION];
  const { result, sendRequest, loading, loaded, error } = useApi({
    url: URL,
    params: { page },
  });

  useEffect(() => {
    if (loaded) {
      if (VERSION === 'page') {
        setCoaches(result.data);
      } else {
        setCoaches(result);
      }
    }
  }, [loaded, result]);

  const onChangeQuery = useCallback(
    async (queryParams) => {
      Object.keys(queryParams).forEach((queryParamKey) => {
        searchParams.set(queryParamKey, queryParams[queryParamKey]);
      });
      console.log(searchParams.toString(), {
        param: {
          ...queryParams,
        },
      });
      sendRequest({
        params: {
          ...queryParams,
        },
      });
      navigate(location.pathname + '?' + searchParams.toString(), {
        replace: true,
      });
    },
    [location, searchParams]
  );

  // CLEAN DESIGN(?): use the event.currentTarget's data- attribute to store info
  // then take that data for handlers
  const onCoachCardClick = useCallback((event) => {
    const username = event.currentTarget.getAttribute('data-username');
    navigate(`/coaches/${username}`);
  });

  return {
    onChangeQuery,
    onCoachCardClick,
    searchParams,
    coaches,
    loading,
    loaded,
    error,
  };
};

export default useCoachesHook;
