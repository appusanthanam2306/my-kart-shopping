import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { makeStyles } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  placeOrder,
  removeFromWishList,
  placeOrderFromWishList
} from "../../state/action-creators/index";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTypography-h6": {
      marginBottom: 0
    }
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1rem",

    "& .MuiTypography-body1": {
      marginTop: 0,
      fontSize: "0.85rem"
    }
  },
  imageStyle: {
    width: "60px",
    height: "60px",
    objectFit: "scale-down"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "1rem 1rem 0.5rem"
  },
  iconStyling: {
    cursor: "pointer"
  },
  cartEmpty: {
    width: "10vw",
    marginTop: "1rem"
  },
  modalBody: {
    minHeight: "30vh",
    padding: "1rem",
    maxHeight: "45vh",
    overflowY: "scroll"
  },
  modalHeader: {
    padding: "0 1rem 0.5rem",
    borderBottom: "1px solid #ccc"
  }
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "8px 0",
  borderRadius: "5px"
};

export default function SavedItemsModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const itemsListData = useSelector((state) => state.item);
  let { items } = itemsListData;

  let selectedItems = [];
  const itemIds = useSelector((state) => {
    return props.fromCart ? state.cart : state.wishList;
  });
  if (props.fromCart) {
    selectedItems = items.filter((item) => itemIds.includes(item.id));
  } else {
    selectedItems = items.filter((item) => itemIds.includes(item.id));
  }

  const removeCartItemHandler = (itemId) => {
    props.fromCart
      ? dispatch(removeFromCart(itemId))
      : dispatch(removeFromWishList(itemId));
  };

  const placeOrderHandler = () => {
    props.fromCart
      ? dispatch(placeOrder())
      : dispatch(placeOrderFromWishList());
    props.close();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.close}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={props.open}>
          <Box sx={style} className={classes.root}>
            <Typography
              variant="h6"
              component="h6"
              marginBottom="1rem"
              className={classes.modalHeader}
            >
              {props.fromCart ? "My Cart" : "My Wishlist"}
            </Typography>
            <div className={classes.modalBody}>
              {selectedItems.length ? (
                selectedItems.map((cartItem) => (
                  <div className={classes.container}>
                    <img src={cartItem.imgUrl} className={classes.imageStyle} />
                    <div>
                      <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        {cartItem.itemName}
                      </Typography>
                      <Typography
                        id="transition-modal-description"
                        sx={{ mt: 2 }}
                        className={classes.description}
                      >
                        Duis mollis, est non commodo luctus, nisi erat porttitor
                        ligula.
                      </Typography>
                    </div>
                    <div>
                      <DeleteIcon
                        color="error"
                        className={classes.iconStyling}
                        onClick={() => removeCartItemHandler(cartItem.id)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <Typography
                    variant="h5"
                    component="div"
                    align="center"
                    margin="1rem 0"
                  >
                    {props.fromCart
                      ? "Your Cart is Empty"
                      : "Your Wishlist is Empty"}
                  </Typography>
                </div>
              )}
            </div>

            <div className={classes.buttonContainer}>
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={props.close}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </Stack>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
