import { useEffect, useState } from "react";

const useSetProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timeID = setTimeout(() => {
      setProgress(100);
    }, 100);

    return () => clearTimeout(timeID);
  }, []);

  return { progress, setProgress };
};

export default useSetProgressBar;
