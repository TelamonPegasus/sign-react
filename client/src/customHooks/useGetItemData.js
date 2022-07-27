import { useState, useEffect } from "react";
import axios from "axios";

import { axiosPrivate } from "api/axios";
import { usePopupContext } from "context/PopupProvider";

const useGetItemData = (endpoint) => {
  const [itemData, setItemData] = useState({ status: "loading", data: [] });
  const { openToast } = usePopupContext();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getItemData = async () => {
      try {
        const { data } = await axiosPrivate.get(endpoint, {
          cancelToken: source.token,
        });

        setItemData({ status: "success", data });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          openToast("Something went wrong - reload the page", "error");
          setItemData((prev) => ({ ...prev, status: "error" }));
        }
      }
    };

    const timeID = setTimeout(getItemData, 100);

    return () => {
      source.cancel();
      clearTimeout(timeID);
    };
  }, [endpoint, openToast]);

  return { itemData, setItemData };
};

export default useGetItemData;
