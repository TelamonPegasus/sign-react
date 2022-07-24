const styles = {
  form: { maxWidth: 400, margin: "0 auto", marginTop: 50 },
};

const StyledForm = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} style={styles.form}>
    {children}
  </form>
);

export default StyledForm;
