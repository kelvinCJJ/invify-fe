import { AttachMoney, Money, Person, ProductionQuantityLimits, ShoppingBag } from "@mui/icons-material";
import { Card, Fab, Grid, Typography } from "@mui/material";
import React from "react";

const TopCard = () => {
  const cards = [
    {
      title: "Customers",
      icon: <Person/>,
      value: 39354,
      growth: -9,
    },
    {
      title: "Products",
      icon: <ShoppingBag/>,
      value: 4396,
      growth: 23,
    },
    {
      title: "Sales",
      icon: <AttachMoney/>,
      value: 42339,
      growth: 38,
    },
    {
      title: "Refunds",
      icon: <Money />,
      value: 835,
      growth: -12,
    },
  ];

  const growthClassname = "text-";
  
  return (
    <Card>
      <Grid container spacing={3}>
        {cards.map((card, i) => (
          <Grid item xs={6} sm={3} lg={3} key={i}>
            <title>{card.title}</title>
            <Fab
              size="large"
              color="primary"
              aria-label={card.title}
            >
              {card.icon}
            </Fab>
            
            <Typography variant="h3" sx={{ mt: 1 }}>
              {card.value}
            </Typography>
            <Typography variant="caption" className="text-success-500">
              {card.growth}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default TopCard;
