const styles = {
  container: { marginTop: 70, padding: "0 20px 0 20px" },
  heading: { color: "#d63e2f" },
};

const NotFoundPage = () => (
  <div style={styles.container}>
    <h1>
      Page <span style={styles.heading}>Not Found</span>
    </h1>

    <p>Please check your url address.</p>
  </div>
);

export default NotFoundPage;
