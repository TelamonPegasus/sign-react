import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAxiosPrivate } from "customHooks/useAxiosPrivate";
import { StyledButton } from "components/StyledButton";
import { SubscribersTable } from "components/SubscribersTable";

const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
  heading: { color: "#d63e2f" },
};

const SubscribersDataPage = ({ allowedRoles }) => {
  const endpoint = "/api/subscribers";
  const [subscribers, setSubscribers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getEmployees = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          signal: controller.signal,
        });

        isMounted && setSubscribers(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getEmployees();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const removeSubscriberHandler = async (id) => {
    const controller = new AbortController();

    try {
      await axiosPrivate.delete(`${endpoint}/${id}`, {
        signal: controller.signal,
      });

      const newList = subscribers.filter((item) => item._id !== id);
      setSubscribers(newList);
    } catch (err) {
      console.error(err);
      // navigate("/login", { state: { from: location }, replace: true });
    }
  };

  const handleNavigate = () => navigate(-1);

  return (
    <div style={styles.container}>
      <h1>
        Users <span style={styles.heading}>LIST</span>
      </h1>

      <h2>
        Here will CRUD data functionality available only for an admin or editor
        (updating data).
      </h2>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum. Why do we use it? It is a long established fact that a
        reader will be distracted by the readable content of a page when looking
        at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using
        'Content here, content here', making it look like readable English. Many
        desktop publishing packages and web page editors now use Lorem Ipsum as
        their default model text, and a search for 'lorem ipsum' will uncover
        many web sites still in their infancy. Various versions have evolved
        over the years, sometimes by accident, sometimes on purpose (injected
        humour and the like).
      </p>

      <div>
        {subscribers?.length ? (
          <SubscribersTable
            subscribersData={subscribers}
            onRemove={removeSubscriberHandler}
            allowedRoles={allowedRoles}
          />
        ) : (
          <p>No subscribers to display</p>
        )}
      </div>

      <StyledButton onClick={handleNavigate} />
    </div>
  );
};

export default SubscribersDataPage;
