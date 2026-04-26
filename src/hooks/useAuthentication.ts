import { useEffect, useState } from "react";

function useAuthentication() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/health`, {
      credentials: "include",
    })
      .then(async (res) => {
        const data = await res.json();
        if (data.user.email !== null) {
          setIsLoggedIn(true);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("userInfo");
        }
      })
      .catch(() => {
        localStorage.removeItem("userInfo");
        console.log("Server not reachable or user is logged out");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const loginWithGoogle = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const logout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).then(() => {
      setIsLoggedIn(false);
      localStorage.removeItem("userInfo");
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
