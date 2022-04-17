import axios from 'axios';
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useReducer,
} from 'react';

export default function useApi({
  url,
  method = 'GET',
  skip = false,
  params,
  data,
  lazy = false,
}) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState();
  const [refreshIndex, setRefreshIndex] = useState(0);
  const [statusCode, setStatusCode] = useState();

  const refresh = () => {
    setRefreshIndex(refreshIndex + 1);
  };

  const sendRequest = useCallback((opts) => {
    let request;
    switch (method) {
      case 'GET':
        request = axios.get(url, { params: { ...opts.params } });
        break;
      case 'POST':
        request = axios.post(url, { ...opts.data });
      default:
        break;
    }

    if (skip) {
      setResult(null);
      setLoading(false);
      setLoaded(false);
    } else {
      setLoading(true);
      setError(false);
      request
        .then((r) => {
          setResult(r.data);
          setLoading(false);
          setLoaded(true);
          setStatusCode(r.status);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            setStatusCode(error.response.status);
            setError(error.response.data);
          } else {
            console.log('crap2', error.message);
            setError(error.message);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (lazy) {
      return;
    }

    let cancelled = false;
    sendRequest({ params, data });

    return () => {
      cancelled = true;
    };
  }, [url, refreshIndex]);

  return { result, loading, loaded, error, refresh, statusCode, sendRequest };
}
