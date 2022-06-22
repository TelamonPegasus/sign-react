// import { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const LoadingBarPage = ({ progress, setProgress }) => {
  //   const ref = useRef(null);

  //   useEffect(() => {
  //     //   ref.current.continuousStart();

  //     const timeID = setTimeout(() => {
  //       // ref.current.complete();
  //       setProgress(100);
  //     }, 100);

  //     return () => clearTimeout(timeID);
  //   }, []);

  return (
    <LoadingBar
      color="#d63e2f"
      onLoaderFinished={() => setProgress(0)}
      progress={progress}
    />
  );
};

export default LoadingBarPage;
