/* eslint-disable react/jsx-boolean-value */
import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
  Paper,
  Tabs,
  Tab,
  TableContainer,
  TableCell,
  TableHead,
  TableBody,
  Table,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Checkbox,
  IconButton,
  Select,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {
  clearView,
  changeView,
  selectData,
  updateSelected,
  updateNewProduct,
} from "../store/viewReducer";
import {useHistory} from "react-router-dom";
import {
  clearAdmin,
  fetchAdminData,
  updateOrder,
  updateProduct,
  promote,
  demote,
  deleteProduct,
  addProduct,
  fetchAdminAdmins,
  fetchAdminUsers,
  fetchAdminPendingOrders,
  fetchAdminCompletedOrders,
  fetchAdminProducts,
} from "../store/adminReducer";
import {updateInput, clearInput} from "../store/actions";

const {toast} = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");

toast.configure();

const Admin = ({
  user,
  loggedIn,
  selected,
  view,
  product,
  dispatch,
  setView,
  setSelected,
  completeSelected,
  add,
  edit,
  deleteItem,
  pendingOrders,
  completedOrders,
  admins,
  users,
  products,
  setRow,
  page,
  size,
  setData,
  updateText,
  changePage,
  filter,
  search,
  updateProductInput,
}) => {
  useEffect(() => {
    dispatch(fetchAdminData());
    dispatch(clearView());
  }, []);
  const history = useHistory();
  return (
    <div>
      {user.clearance === 5 ? (
        <div className="adminPage">
          <div className="AdminNavContainer">
            <Paper square>
              <img src={user.image} alt="admin" className="adminImage" />
              <h4>
                {user.firstName} {user.lastName}
              </h4>
              <h4>Admin</h4>
              <hr />
              <Tabs
                value={view}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, value) => setView(e, value, pendingOrders)}
                orientation="vertical"
                variant="scrollable"
                className="adminNav"
              >
                <Tab
                  label={`Pending (${pendingOrders ? pendingOrders.count : 0})`}
                  value="Pending"
                />
                <Tab
                  label={`Completed (${completedOrders ? completedOrders.count : 0})`}
                  value="Completed"
                />
                <Tab label={`Users (${users ? users.count : 0})`} value="Users" />
                <Tab label={`Admins (${admins ? admins.count : 0})`} value="Admins" />
                <Tab
                  label={`Products (${products ? products.count : 0})`}
                  value="Products"
                />
                <Tab label="Add Product" value="Add Product" />
              </Tabs>
            </Paper>
          </div>
          <hr />
          <div className={view === "Pending" ? "adminTable" : "ghost"}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={pendingOrders && pendingOrders.count ? pendingOrders.count : 0}
              rowsPerPage={size}
              page={page - 1}
              onChangePage={(e, value) => changePage(e, value, "pending", size, filter)}
              onChangeRowsPerPage={(e) => setData(e, "pendingOrders", filter)}
            />
            <TableContainer component={Paper} className="adminTableChild">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Pending Orders</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Address</TableCell>
                    <TableCell align="left">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingOrders && pendingOrders.rows ? (
                    pendingOrders.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">${row.total}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox
                            onChange={(e) => setRow(e, row)}
                            value={row.selected ? "on" : "off"}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No data</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              onClick={(e) => completeSelected(e, pendingOrders, history)}
              variant="outlined"
              align="right"
              color="primary"
              fullWidth
            >
              Complete Selected Orders
            </Button>
          </div>
          <div className={view === "Completed" ? "adminTable" : "ghost"}>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={completedOrders && completedOrders.count ? completedOrders.count : 0}
              rowsPerPage={size}
              page={page - 1}
              onChangePage={(e, value) => changePage(e, value, "completed", size, filter)}
              onChangeRowsPerPage={(e) => setData(e, "completed", filter)}
            />
            <TableContainer component={Paper} className="adminTableChild">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Completed Orders</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {completedOrders && completedOrders.rows ? (
                    completedOrders.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">${row.total}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No data</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={view === "Users" ? "adminTable" : "ghost"}>
            <form>
              <TextField
                label="Search"
                value={filter}
                onChange={(e) => search(e, "users")}
              />
            </form>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={users && users.count ? users.count : 0}
              rowsPerPage={size}
              page={page - 1}
              onChangePage={(e, value) => changePage(e, value, "users", size, filter)}
              onChangeRowsPerPage={(e) => setData(e, "users", filter)}
            />
            <TableContainer component={Paper} className="adminTableChild">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Users</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Clearance</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users && users.rows ? (
                    users.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.username}
                        </TableCell>
                        <TableCell align="right">firstName</TableCell>
                        <TableCell align="right">lastName</TableCell>
                        <TableCell align="right">{row.clearance}</TableCell>
                        <TableCell align="right">image</TableCell>
                        <TableCell>
                          <IconButton onClick={(e) => setSelected(e, row)}>
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No data</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={view === "Admins" ? "adminTable" : "ghost"}>
            <form>
              <TextField
                label="Search"
                value={filter}
                onChange={(e) => search(e, "admins")}
              />
            </form>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={admins && admins.count ? admins.count : 0}
              rowsPerPage={size}
              page={page - 1}
              onChangePage={(e, value) => changePage(e, value, "admins", size, filter)}
              onChangeRowsPerPage={(e) => setData(e, "admins", filter)}
            />
            <TableContainer component={Paper} className="adminTableChild">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Admins</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Clearance</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {admins && admins.rows ? (
                    admins.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.username}
                        </TableCell>
                        <TableCell align="right">firstName</TableCell>
                        <TableCell align="right">lastName</TableCell>
                        <TableCell align="right">{row.clearance}</TableCell>
                        <TableCell align="right">image</TableCell>
                        <TableCell>
                          <IconButton
                            onClick={(e) => {
                              setSelected(e, row);
                            }}
                            align="center"
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No data</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={view === "Products" ? "adminTable" : "ghost"}>
            <form>
              <TextField
                label="Search"
                value={filter}
                onChange={(e) => search(e, "products")}
              />
            </form>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={products && products.count ? products.count : 0}
              rowsPerPage={size}
              page={page - 1}
              onChangePage={(e, val) => changePage(e, val, "products", size, filter)}
              onChangeRowsPerPage={(e) => setData(e, "products", filter)}
              className="adminTablePaginate"
            />
            <TableContainer component={Paper} className="adminTableChild">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Products</TableCell>
                    <TableCell align="right">Id</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Rating</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Edit</TableCell>
                    <TableCell align="right">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products && products.rows ? (
                    products.rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.id}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">{row.description}</TableCell>
                        <TableCell align="right">${row.price}</TableCell>
                        <TableCell align="right">{row.rating}</TableCell>
                        <TableCell align="right">
                          <img src={row.image} alt={row.name} height={100} width={100} />
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={(e) => setSelected(e, row)} align="center">
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={(e) => deleteItem(e, row.id)}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell>No data</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className={view === "Add Product" ? "adminTable" : "ghost"}>
            <h2>Add Product</h2>
            <form className="adminTableChild">
              <TextField
                label="name"
                value={product.name}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateProductInput(e, "name")}
              />
              <TextField
                label="price USD"
                value={product.price}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateProductInput(e, "price")}
              />
              <TextField
                label="quantity"
                value={product.quantity}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateProductInput(e, "quantity")}
              />
              <TextField
                label="image"
                value={product.image}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateProductInput(e, "image")}
              />
              <TextField
                label="description"
                value={product.description}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateProductInput(e, "description")}
              />
              <select
                value={product.categoryId}
                onChange={(e) => updateProductInput(e, "categoryId")}
                className="selectBar"
              >
                <option value={1}>(1) Weapons</option>
                <option value={2}>(2) Armours</option>
                <option value={3}>(3) Magic</option>
                <option value={4}>(4) Items</option>
              </select>
              <Button onClick={(e) => add(e, product)} variant="outlined">
                Add
              </Button>
            </form>
          </div>
          <hr />
          <div className={view !== "Add Product" ? "editForm" : "ghost"}>
            <h2>Edit Form</h2>
            {selected && selected.name ? <h4>Now Editing {selected.name}</h4> : null}
            {selected && selected.username ? (
              <h4>Now Editing {selected.username}</h4>
            ) : null}
            <form className="editFormChild">
              <TextField
                label="clearance"
                value={selected && selected.clearance ? selected.clearance : ""}
                disabled={!(view === "Users" || view === "Admins")}
                onChange={(e) => updateText(e, "clearance")}
              />
              <TextField
                label="name"
                value={selected && selected.name ? selected.name : ""}
                disabled={view !== "Products"}
                onChange={(e) => updateText(e, "name")}
              />
              <TextField
                label="price USD"
                value={selected && selected.price >= 0 ? selected.price : ""}
                disabled={view !== "Products"}
                onChange={(e) => updateText(e, "price")}
              />
              <TextField
                label="quantity"
                value={selected && selected.quantity >= 0 ? selected.quantity : ""}
                disabled={view !== "Products"}
                onChange={(e) => updateText(e, "quantity")}
              />
              <TextField
                label="image"
                value={selected && selected.image ? selected.image : ""}
                disabled={view !== "Products"}
                onChange={(e) => updateText(e, "image")}
              />
              <TextField
                label="description"
                multiline
                value={selected && selected.description ? selected.description : ""}
                disabled={view !== "Products"}
                onChange={(e) => updateText(e, "description")}
              />
              <Button onClick={(e) => edit(e, view, selected)}>Edit</Button>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <h1>You are not authorized to view this page</h1>
        </div>
      )}
    </div>
  );
};

const mapState = ({user, admin, form, views, input}) => {
  const {selected, view, product} = views;
  const {loggedIn} = form;
  const {pendingOrders, completedOrders, admins, users, products} = admin;
  const {page, size, filter} = input;
  return {
    user,
    loggedIn,
    selected,
    view,
    product,
    pendingOrders,
    completedOrders,
    admins,
    users,
    products,
    page,
    size,
    filter,
  };
};

const mapDispatch = (dispatch) => {
  const setView = async (e, value, pendingOrders) => {
    pendingOrders.rows.forEach((row) => {
      row.selected = false;
    });
    await dispatch(clearView());
    await dispatch(clearInput());
    await dispatch(changeView(value));
    toast(`View changed to ${value}`, {type: "success"});
  };
  const setSelected = (e, row) => {
    e.preventDefault();
    dispatch(selectData(row));
  };
  const completeSelected = async (e, pendingOrders, history) => {
    const selected = pendingOrders.rows.filter((row) => row.selected === true);
    if (selected.length) {
      try {
        await selected.forEach(async (order) => {
          await dispatch(updateOrder(order.id));
        });
        await dispatch(fetchAdminPendingOrders());
        await dispatch(fetchAdminCompletedOrders());
        toast(`${selected.length} orders have been successfully completed!`, {
          type: "success",
        });
      } catch (err) {
        toast("Error updating", err, {type: "error"});
      }
    } else {
      toast("No orders have been selected!");
    }
  };
  const add = async (e, product) => {
    e.preventDefault();
    await dispatch(addProduct(product));
    dispatch(changeView("Products"));
  };
  const edit = (e, view, selected) => {
    e.preventDefault();
    if (view === "Users") {
      dispatch(promote(selected));
      dispatch(fetchAdminUsers());
      dispatch(fetchAdminAdmins());
    } else if (view === "Admins") {
      dispatch(demote(selected));
      dispatch(fetchAdminUsers());
      dispatch(fetchAdminAdmins());
    } else if (view === "Products") {
      dispatch(updateProduct(selected));
      dispatch(fetchAdminProducts());
    }
  };
  const deleteItem = (e, id) => {
    e.preventDefault();
    dispatch(deleteProduct(id));
  };
  const changePage = (e, value, name, size, filter) => {
    dispatch(updateInput("page", value + 1));
    if (name === "products") {
      dispatch(fetchAdminProducts(filter, value + 1, size));
    }
    if (name === "admins") {
      dispatch(fetchAdminAdmins(filter, value + 1, size));
    }
    if (name === "users") {
      dispatch(fetchAdminUsers(filter, value + 1, size));
    }
    if (name === "completed") {
      dispatch(fetchAdminCompletedOrders(value + 1, size));
    }
    if (name === "pending") {
      dispatch(fetchAdminCompletedOrders(value + 1, size));
    }
  };
  const setRow = (e, row) => {
    row.selected = row.selected ? !row.selected : true;
  };
  const setData = (e, name, filter) => {
    dispatch(updateInput("page", 1));
    dispatch(updateInput("size", e.target.value));
    if (name === "products") {
      dispatch(fetchAdminProducts(filter, 1, e.target.value));
    }
    if (name === "admins") {
      dispatch(fetchAdminAdmins(filter, 1, e.target.value));
    }
    if (name === "users") {
      dispatch(fetchAdminUsers(filter, 1, e.target.value));
    }
    if (name === "completed") {
      dispatch(fetchAdminCompletedOrders(1, e.target.value));
    }
    if (name === "pending") {
      dispatch(fetchAdminPendingOrders(1, e.target.value));
    }
  };
  const updateText = (e, name) => {
    dispatch(updateSelected(name, e.target.value));
  };
  const search = (e, name) => {
    dispatch(updateInput("filter", e.target.value));
    if (name === "products") {
      dispatch(fetchAdminProducts(e.target.value));
    }
    if (name === "admins") {
      dispatch(fetchAdminAdmins(e.target.value));
    }
    if (name === "users") {
      dispatch(fetchAdminUsers(e.target.value));
    }
  };
  const updateProductInput = (e, name) => {
    dispatch(updateNewProduct(name, e.target.value));
  };
  return {
    dispatch,
    setView,
    setSelected,
    completeSelected,
    add,
    edit,
    deleteItem,
    setRow,
    setData,
    updateText,
    changePage,
    search,
    updateProductInput,
  };
};

export default connect(mapState, mapDispatch)(Admin);
