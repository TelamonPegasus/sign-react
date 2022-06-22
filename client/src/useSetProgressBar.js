import { useEffect, useState } from "react";

export const useSetProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    //   ref.current.continuousStart();

    const timeID = setTimeout(() => {
      // ref.current.complete();
      setProgress(100);
    }, 100);

    return () => clearTimeout(timeID);
  }, []);

  return { progress, setProgress };
};

// const ref = useRef(null);

// useEffect(() => {
//   ref.current.continuousStart();

//   const timeID = setTimeout(() => {
//     ref.current.complete();
//   }, 100);

//   return () => clearTimeout(timeID);
// }, []);

// return ref;
