import { Grid, Avatar } from "@material-ui/core";

import { styles } from "./styles";

const FormHeader = ({ avatar, heading }) => (
  <Grid align="center">
    <Avatar style={styles.avatar}>{avatar}</Avatar>
    <h2 style={styles.heading}>{heading}</h2>
  </Grid>
);

export default FormHeader;
