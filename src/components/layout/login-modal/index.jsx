import React from 'react';
import useLoginModalHook from './login-modal.hooks';
import AppContext from '../../../contexts/app.context';
import Login from '../../../pages/login';

const LoginModalComponent = () => {
  const { showLoginModal, onCloseLoginModal } = useLoginModalHook(AppContext);
  if (showLoginModal) {
    return (
      <div
        style={{
          position: 'fixed',
          zIndex: 999,
          backgroundColor: 'turquoise',
          height: '100%',
          width: '100%',
          top: 0,
          left: 0,
        }}
      >
        <button onClick={onCloseLoginModal}>Close</button>
        <Login />
      </div>
    );
  }
  return null;
};

const LoginModal = React.memo(LoginModalComponent);
export default LoginModal;
