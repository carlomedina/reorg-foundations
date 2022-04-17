import React, { useCallback, useContext } from 'react';

// DESIGN: when we allow guest browsing, for all routes that
// return 401 (ie. route requires user to be logged in, but it isn't)
// show a pop-up of login modal
const useLoginModalHook = (context) => {
  const { showLoginModal, setShowLoginModal } = useContext(context);

  const onCloseLoginModal = useCallback(() => {
    setShowLoginModal(false);
  }, []);
  return { showLoginModal, onCloseLoginModal };
};

export default useLoginModalHook;
