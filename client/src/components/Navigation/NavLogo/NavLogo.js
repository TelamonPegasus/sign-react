const styles = {
  container: {
    display: "flex",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
  },
  logo: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 6,
    fontWeight: "bold",
  },
  text: { fontSize: 15, padding: 0, marginLeft: 20, color: "black" },
};

const NavLogo = () => (
  <div style={styles.container}>
    <div variant="h4" style={styles.logo}>
      Ca
    </div>

    <div style={styles.text}>
      <p style={{ margin: 0 }}>Code</p>
      <p style={{ margin: 0 }}>academy</p>
    </div>
  </div>
);

export default NavLogo;
