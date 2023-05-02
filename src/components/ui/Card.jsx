import { Card as MuiCard, Fab, Grid, Typography } from "@mui/material";
import React from "react";

const Card = ({title, value, icon}) => {

  return (
    <MuiCard className="bg-darkaccent-800 m-4    ">
      <div className="flex flex-row p-2 ">
        <Fab
          size="large"
          color="primary"
          title={title}
          aria-label={title}
          className="mr-2"
        >
        {icon}
        </Fab>
        <div className="flex flex-col">
        <Typography variant="h2" sx={{ mt: 1 }}>
          {title}
        </Typography>
        <Typography variant="h3" sx={{ mt: 1 }}>
          {value}
        </Typography>
        </div>
      </div>
    </MuiCard>
  );
};

export default Card;
