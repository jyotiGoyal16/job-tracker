import { useEffect, useState } from "react";

function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setIsLoggedIn(true);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginWithGoogle = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setIsLoggedIn(false);
    });
  };

  return {
    isLoggedIn,
    isLoading,
    loginWithGoogle,
    logout,
  };
}

export default useAuthentication;
