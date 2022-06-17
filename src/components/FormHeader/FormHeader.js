import { Grid, Avatar } from "@material-ui/core";

const avatarStyle = { backgroundColor: "#1bbd7e" };
const headingStyle = { textTransform: "uppercase" };

const FormHeader = ({ avatar, heading }) => {
  return (
    <Grid align="center">
      <Avatar style={avatarStyle}>{avatar}</Avatar>
      <h2 style={headingStyle}>{heading}</h2>
    </Grid>
  );
};

export default FormHeader;
