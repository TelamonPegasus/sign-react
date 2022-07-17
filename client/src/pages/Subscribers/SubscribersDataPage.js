import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { StyledButton } from "components/StyledButton";
import { SubscribersTable } from "components/SubscribersTable";
import { Loader } from "components/Loader";

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

const SubscribersDataPage = ({ allowedRoles }) => {
  const endpoint = "/api/subscribers";
  const [subscribers, setSubscribers] = useState({
    status: "loading",
    data: [],
  });
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSubscribers = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          signal: controller.signal,
        });

        isMounted && setSubscribers({ status: "success", data: response.data });
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    const timeID = setTimeout(getSubscribers, 500);

    return () => {
      isMounted = false;
      controller.abort();
      clearTimeout(timeID);
    };
  }, []);

  const removeSubscriberHandler = async (id) => {
    const controller = new AbortController();

    try {
      await axiosPrivate.delete(`${endpoint}/${id}`, {
        signal: controller.signal,
      });

      const filteredList = subscribers.data.filter((item) => item._id !== id);
      setSubscribers({ data: filteredList });
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

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
          <Loader text="loading table" />
        ) : subscribers.data?.length ? (
          <SubscribersTable
            subscribersData={subscribers.data}
            onRemove={removeSubscriberHandler}
            allowedRoles={allowedRoles}
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
