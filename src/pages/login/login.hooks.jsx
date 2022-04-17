import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useApi, useFormInputChange } from '../../hooks';

const useLoginHook = (context) => {
  const { setLoggedUser } = useContext(context);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const onLoginFormInputChange = useFormInputChange(loginForm, setLoginForm);

  const { result, sendRequest, loading, loaded, error } = useApi({
    url: 'https://reqres.in/api/register',
    method: 'POST',
    lazy: true,
  });

  useEffect(() => {
    if (loaded) {
      setLoggedUser({ ...result });
      const redirectUrl = searchParams.get('redirectUrl') || '';
      const pathname = location.pathname;
      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (pathname !== '/login') {
        navigate(pathname); // refresh
      } else {
        navigate('/');
      }
    }
  }, [loaded]);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      sendRequest({
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      });
    },
    [loginForm, loaded]
  );

  return {
    loginForm,
    onLoginFormInputChange,
    onSubmit,
    loading,
    loaded,
    error,
  };
};

export default useLoginHook;
