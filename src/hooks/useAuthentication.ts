import { useState } from "react";

function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginWithGoogle = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return {
    isLoggedIn,
    loginWithGoogle,
    logout,
  };
}

export default useAuthentication;
