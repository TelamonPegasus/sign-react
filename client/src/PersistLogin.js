import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAuthContext } from "context/AuthProvider";
import { useRefreshToken } from "customHooks/useRefreshToken";

export const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, userPersist } = useAuthContext();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
        // sends the cookie refresh endpoint and is send back an access token
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // only runs when we do have an access token
    // do not hit an endpoint refresh every time we will request the protected page
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  return (
    <>
      {!userPersist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
    </>

    // outlet represents all of the child components inside of the persist login route
  );
};
