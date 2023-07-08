import { Card as MuiCard, Fab, Grid, Typography } from "@mui/material";
import React from "react";

const Card = ({title, value, icon}) => {

  return (
    <MuiCard className="bg-darkaccent-800">
      <div className="flex flex-col p-2">
      <div className="flex flex-row m-2">
        {icon}
        {title}
      </div>
      <Typography variant="h3" sx={{ mt: 1 }}>
          {value}
        </Typography>
      </div>
    </MuiCard>
  );
};

export default Card;
