import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Grid,
  ButtonBase,
  Typography,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {updateCart, clearInput, updateInput} from "../store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    opacity: "80%",
    marginBottom: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: "60vw",
  },
  image: {
    width: 200,
    height: 150,
  },
  img: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const Cart = ({
  products,
  total,
  removeItem,
  itemQuantity,
  quantity,
  dispatch,
  updateQuantity,
  activeOrders,
}) => {
  useEffect(() => {
    dispatch(clearInput());
  }, []);
  const createOption = (num) => {
    const options = [];
    for (let i = 1; i < num; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className="cart">
      <h2> My Shopping Cart </h2>
      <hr />
      <h4> {itemQuantity} Items! </h4>
      {products.length ? (
        products.map((product) => {
          return (
            <div className={classes.root} key={product.id}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt="complex"
                        src={product.product.image}
                        width={250}
                        height={200}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                          {product.product.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {product.product.description}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {product.product.id}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <select value={quantity} onChange={(e) => updateQuantity(e)}>
                          <option value={0}>0</option>
                          {createOption(product.quantity)}
                          <option value="remove all">Remove all</option>
                        </select>
                        <Button
                          onClick={(e) => removeItem(e, activeOrders, product, quantity)}
                          disabled={
                            quantity > 0 || quantity === "remove all" ? false : true
                          }
                        >
                          Remove Item
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">$19.00</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          );
        })
      ) : (
        <h2>No items in cart! Buy Items</h2>
      )}
      <div>
        <h3>Total Amount ({itemQuantity}) Items</h3>
        <hr />
        <span>${total}</span>
        <hr />
        <Button
          variant="contained"
          onClick={(e) => history.push("/checkout")}
          disabled={products.length ? false : true}
          color="secondary"
        >
          Submit Order
        </Button>
      </div>
    </div>
  );
};

const mapState = ({cart, input, orders}) => {
  const {products, total, itemQuantity} = cart;
  const {quantity} = input;
  const {activeOrders} = orders;
  return {
    products,
    total,
    itemQuantity,
    activeOrders,
    quantity,
  };
};

const mapDispatch = (dispatch) => {
  const removeItem = async (e, order, product, quantity) => {
    e.preventDefault();
    if (quantity === "remove all") {
      return dispatch(updateCart("remove", order.id, product.productId, quantity));
    }
    await dispatch(updateCart("remove", order.id, product.productId, -quantity));
  };
  const updateQuantity = (e) => {
    return dispatch(updateInput("quantity", e.target.value));
  };
  return {
    removeItem,
    dispatch,
    updateQuantity,
  };
};
export default connect(mapState, mapDispatch)(Cart);
