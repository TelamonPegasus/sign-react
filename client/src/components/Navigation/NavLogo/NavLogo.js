const stylesLogo = {
  backgroundColor: "black",
  padding: 10,
  borderRadius: 6,
  fontWeight: "bold",
};

const NavLogo = () => (
  <div
    style={{
      display: "flex",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      color: "white",
    }}
  >
    <div variant="h4" style={stylesLogo}>
      Ca
    </div>

    <div style={{ fontSize: 15, padding: 0, marginLeft: 20 }}>
      <p style={{ margin: 0 }}>Code</p>
      <p style={{ margin: 0 }}>academy</p>
    </div>
  </div>
);

export default NavLogo;
