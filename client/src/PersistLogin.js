import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import { useRefreshToken } from "customHooks/useRefreshToken";
import { useAuthContext } from "context/AuthProvider";
import { Loader } from "components/Loader";

const styles = {
  loaderContainer: {
    height: "100vh",
  },
};
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
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && userPersist
      ? delayRefreh(verifyRefreshToken)
      : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  // }, [isLoading]);

  return !userPersist ? (
    <Outlet />
  ) : isLoading ? (
    <Loader styles={styles.loaderContainer} text="loading data..." />
  ) : (
    <Outlet />
  );
};

function delayRefreh(fn) {
  const timerID = setTimeout(fn, 1_000);

  return () => clearInterval(timerID);
}
