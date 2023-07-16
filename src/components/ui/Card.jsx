import { Card as MuiCard, Fab, Grid, Typography } from "@mui/material";
import React from "react";

const Card = ({ title, value, icon }) => {
  return (
    <MuiCard className="bg-darkaccent-800">
      <div className="flex flex-col p-2">
        <div className=" flex flex-row text-lg p-2 gap-x-2">
          {icon}
          {title}
        </div>
        <div className="text-2xl md:text-3xl px-4">{value}</div>
      </div>
    </MuiCard>
  );
};

export default Card;
