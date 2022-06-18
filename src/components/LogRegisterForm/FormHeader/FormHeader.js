import { Grid, Avatar } from "@material-ui/core";

const avatarStyle = { backgroundColor: "#d63e2f" };
const headingStyle = { textTransform: "uppercase" };

const FormHeader = ({ avatar, heading }) => (
  <Grid align="center">
    <Avatar style={avatarStyle}>{avatar}</Avatar>
    <h2 style={headingStyle}>{heading}</h2>
  </Grid>
);

export default FormHeader;
