const { Grid } = require("@mui/material");

const BGrid = ({ children }) => {
  return (
    <Grid
      container
      spacing={1}
      className="border border-darkaccent-100 rounded-2xl m-1 p-4 "
    >
      {children}
    </Grid>
  );
};

export default BGrid;
