import { useState, useEffect } from "react";
import axios from "axios";

import { axiosPrivate } from "api/axios";
import { usePopupContext } from "context/PopupProvider";

const useGetData = (endpoint) => {
  const [data, setData] = useState({ status: "loading", data: [] });
  const { openToast } = usePopupContext();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getDataCollections = async () => {
      try {
        const { data } = await axiosPrivate.get(endpoint, {
          cancelToken: source.token,
        });

        setData({ status: "success", data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          openToast(error.message, "error");
          setData((prev) => ({ ...prev, status: "error" }));
        }
      }
    };

    const timeID = setTimeout(getDataCollections, 2_000);

    return () => {
      source.cancel();
      clearTimeout(timeID);
    };
  }, [endpoint, openToast]);

  return { data, setData };
};

export default useGetData;
