import React, { useCallback, useContext, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useApi, useFormInputChange } from '../../hooks';
import useLoginHook from './login.hooks';
import AppContext from '../../contexts/app.context';

const LoginComponent = () => {
  const { loginForm, onLoginFormInputChange, onSubmit, error, loading } =
    useLoginHook(AppContext);

  return (
    <div>
      <p>Login</p>
      <form onSubmit={onSubmit}>
        <input
          value={loginForm.email}
          onChange={onLoginFormInputChange}
          type="email"
          name="email"
        />
        <input
          value={loginForm.password}
          onChange={onLoginFormInputChange}
          type="password"
          name="password"
        />
        <input type="submit" value="Submit" />
        {loading && <div> LOADING </div>}
      </form>
      {error && <div> {JSON.stringify(error)} </div>}
    </div>
  );
};

const Login = React.memo(LoginComponent);
export default Login;
