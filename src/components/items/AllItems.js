import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getItems,
  addToCart,
  removeFromCart,
  addToWishList,
  removeFromWishList
} from "../../state/action-creators/index";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state/index";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1rem",
    padding: "1rem",
    "& > img": {
      width: "300px",
      objectFit: "scale-down"
    }
  },
  titleStyle: {
    width: "100%",
    margin: "1.5rem 0.5rem 0"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "1rem"
  },
  actionItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  itemHeading: {
    padding: "8px"
  },
  imgStyling: {
    width: "40vw",
    marginTop: "1rem"
  }
}));

export default function AllItems() {
  const classes = useStyles();
  // const [items, setItems] = useState([]);

  // const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const itemsListData = useSelector((state) => state.item);
  let { items, filtersApplied } = itemsListData;
  const cartItems = useSelector((state) => state.cart);
  const wishListItems = useSelector((state) => state.wishList);

  items = items
    .map((item) => ({
      ...item,
      inCart: cartItems.includes(item.id),
      inWishList: wishListItems.includes(item.id)
    }))
    .filter(
      (item) =>
        item.category.includes(filtersApplied.category) &&
        item.itemName.toLowerCase().includes(filtersApplied.searchText)
    );

  console.log(items);

  /*   const { addToCart, removeFromCart } = bindActionCreators(
    actionCreators,
    dispatch
  ); */

  /*   useEffect(() => {
    getItem().then(({ data }) => setItems(data));
  }, []); */

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const toggleCartValues = (item) => {
    if (item.inCart) {
      dispatch(removeFromCart(item.id));
    } else {
      dispatch(addToCart(item.id));
    }
  };

  const toggleWishListValues = (item) => {
    if (item.inWishList) {
      dispatch(removeFromWishList(item.id));
    } else {
      dispatch(addToWishList(item.id));
    }
  };

  return (
    <div className={classes.container}>
      <Typography
        variant="h4"
        noWrap
        component="div"
        align="center"
        className={classes.titleStyle}
      >
        Deal of the day
      </Typography>
      {items.length ? (
        items.map((item, index) => (
          <Card key={item.id} sx={{ maxWidth: 280 }} className={classes.root}>
            <CardMedia
              component="img"
              alt={item.itemName}
              height="200"
              image={item.imgUrl}
            />
            <CardContent className={classes.itemHeading}>
              <Typography variant="p" component="div" align="center">
                {item.itemName}
              </Typography>
            </CardContent>
            <CardActions className={classes.actionItems}>
              <Button size="small" onClick={() => toggleCartValues(item)}>
                {item.inCart ? (
                  <RemoveShoppingCartIcon color="error" />
                ) : (
                  <AddShoppingCartIcon />
                )}
              </Button>
              <Typography variant="h6" color="text.primary">
                ${item.itemRate}
              </Typography>
              <Button size="small" onClick={() => toggleWishListValues(item)}>
                {item.inWishList ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <div>
          <img src="/assets/no-results.png" className={classes.imgStyling} />
          <Typography
            variant="h4"
            component="div"
            align="center"
            margin="1rem 0"
          >
            No Results Found
          </Typography>
        </div>
      )}
    </div>
  );
}
