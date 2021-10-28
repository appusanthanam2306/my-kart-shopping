import React from "react";
import Carousel from "react-elastic-carousel";
import Card from "./Card";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "150px",
    "& .rec-pagination": { display: "none" },
    "& .rec-carousel .rec-arrow:hover": {
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const CarouselComp = () => {
  const classes = useStyles();
  return (
    <div>
      <Carousel
        className={classes.root}
        enableAutoPlay
        interval="3000"
        autoPlay="true"
      >
        <Card imgUrl="https://rukminim1.flixcart.com/flap/3376/560/image/a67ec4b3b8f4c74a.jpeg?q=50" />
        <Card imgUrl="https://rukminim1.flixcart.com/flap/3376/560/image/dd14632a2f4f5f22.jpg?q=50" />
        <Card imgUrl="https://rukminim1.flixcart.com/flap/1993/430/image/79b4b5da810f6c7c.jpg?q=50" />
      </Carousel>
    </div>
  );
};

export default CarouselComp;
