import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { useToastContext } from "context/ToastProvider";
import { useAuthContext } from "context/AuthProvider";
import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { StyledButton } from "components/StyledButton";
import { SubscribersTable } from "components/SubscribersTable";
import { Loader } from "components/Loader";
import { Error } from "components/Error";

const styles = {
  container: {
    marginTop: 70,
    padding: "0 20px 0 20px",
  },
  heading: { textAlign: "center" },
  span: { color: "#d63e2f" },
  tableContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  informationText: {
    padding: "20px 0",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
};

const SubscribersDataPage = () => {
  const endpoint = "/api/subscribers";
  const [subscribers, setSubscribers] = useState({
    status: "loading",
    data: [],
  });
  const { displayToast } = useToastContext();
  const { auth } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const getSubscribers = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          cancelToken: source.token,
        });

        setSubscribers({ status: "success", data: response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log(error);
        } else {
          displayToast(error.message, "error");
          setSubscribers((prev) => ({ ...prev, status: "error" }));
        }
      }
    };

    const timeID = setTimeout(getSubscribers, 2000);

    return () => {
      source.cancel();
      clearTimeout(timeID);
    };
  }, []);

  const removeSubscriberHandler = async (id) => {
    const { REACT_APP_SECRET_USER_ID } = process.env;

    if (id === REACT_APP_SECRET_USER_ID) {
      displayToast("Sorry, can not remove this data", "error");
      return;
    }

    try {
      await axiosPrivate.delete(`${endpoint}/${id}`, {
        data: { roles: auth?.roles },
      });
      const filteredList = subscribers.data.filter((item) => item._id !== id);
      setSubscribers((prevState) => ({ ...prevState, data: filteredList }));
    } catch (error) {
      displayToast(error.message, "error");
    }
  };

  function checkUserId(id) {
    const { REACT_APP_SECRET_USER_ID } = process.env;

    if (id === REACT_APP_SECRET_USER_ID) {
      displayToast("Sorry, can not update this data", "error");
      return;
    }

    navigate(`/update-subscriber/${id}`);
  }

  const handleNavigate = () => navigate(-1);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>
        Subscribers <span style={styles.span}>LIST</span>
      </h1>

      <h2>CRUD data functionality available only for an admin and editor.</h2>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>

      <div style={styles.tableContent}>
        {subscribers.status === "loading" ? (
          <Loader text="loading list" />
        ) : subscribers.status === "error" ? (
          <Error text="error occurred" />
        ) : subscribers.status === "success" && subscribers.data.length ? (
          <SubscribersTable
            subscribersData={subscribers.data}
            onRemove={removeSubscriberHandler}
            checkUserId={checkUserId}
          />
        ) : (
          <p style={styles.informationText}>
            List is empty - please add a new subscriber
          </p>
        )}
      </div>

      <StyledButton onClick={handleNavigate} />
    </div>
  );
};

export default SubscribersDataPage;
