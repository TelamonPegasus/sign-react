import { styles } from "./styles";

const StyledForm = ({ children, onSubmit }) => (
  <form onSubmit={onSubmit} style={styles.form}>
    {children}
  </form>
);

export default StyledForm;
