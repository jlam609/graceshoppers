import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Tabs,
  Tab,
  TextField,
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {changeView, clearView} from "../store/viewReducer";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {editUser, fetchUser} from "../store/actions";
import axios from "axios";

toast.configure();
const User = ({
  user,
  loggedIn,
  pendingOrders,
  completedOrders,
  edit,
  view,
  setView,
  updateUser,
  dispatch,
}) => {
  useEffect(() => {
    dispatch(clearView());
  }, []);
  const history = useHistory();
  return (
    <div>
      {loggedIn ? (
        <div className="adminPage">
          <div className="AdminNavContainer">
            <Paper square>
              <img src={user.image} alt="user" className="adminImage" />
              <h4>
                {user.firstName} {user.lastName}
              </h4>
              <h4>User</h4>
              <hr />
              <Tabs
                value={view}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, value) => setView(e, value)}
                orientation="vertical"
                variant="scrollable"
                className="adminNav"
              >
                <Tab
                  label={`Pending (${pendingOrders ? pendingOrders.length : 0})`}
                  value="Pending"
                />
                <Tab
                  label={`Completed (${completedOrders ? completedOrders.length : 0})`}
                  value="Completed"
                />
                <Tab label="Edit Profile" value="Edit User" />
              </Tabs>
            </Paper>
          </div>
          <hr />
          <div className={view === "Pending" ? "adminTable" : "ghost"}>
            <TableContainer component={Paper} className="adminTableChild">
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Pending Orders</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingOrders && pendingOrders.length ? (
                    pendingOrders.map((row) => (
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
          <div className={view === "Completed" ? "adminTable" : "ghost"}>
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
                  {completedOrders && completedOrders.length ? (
                    completedOrders.map((row) => (
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

          <div className={view === "Edit User" ? "adminTable" : "ghost"}>
            <h2>Edit Profile</h2>
            <form className="adminTableChild">
              <TextField
                label="First Name"
                value={user.firstName}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateUser(e, "firstName")}
              />
              <TextField
                label="Last Name"
                value={user.lastName}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateUser(e, "lastName")}
              />
              <TextField
                label="image"
                value={user.image}
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateUser(e, "image")}
              />
              <TextField
                label="password"
                value={user.password}
                type="password"
                inputProps={{style: {textAlign: "center"}}}
                onChange={(e) => updateUser(e, "password")}
              />
              <Button onClick={(e) => edit(e, user)} variant="outlined">
                Edit
              </Button>
            </form>
          </div>
          <hr />
        </div>
      ) : (
        <div>
          <h1>You are not authorized to view this page</h1>
        </div>
      )}
    </div>
  );
};

const mapState = ({user, orders, form, views}) => {
  const {view} = views;
  const {loggedIn} = form;
  const {pendingOrders, completedOrders} = orders;
  return {
    user,
    loggedIn,
    view,
    pendingOrders,
    completedOrders,
  };
};
const mapDispatch = (dispatch) => {
  const setView = async (e, value) => {
    await dispatch(clearView());
    await dispatch(changeView(value));
    toast(`View changed to ${value}`, {type: "success"});
  };
  const updateUser = (e, name) => {
    dispatch(editUser(name, e.target.value));
  };
  const edit = async (e, user) => {
    e.preventDefault();
    const {status} = (await axios.put(`/api/users/${user.id}`, user)).data;
    if (status) {
      toast(`${user.username} updated successfully!`, {type: "success"});
      await dispatch(fetchUser());
    } else {
      toast("update was unsuccessful!");
    }
  };
  return {
    dispatch,
    setView,
    updateUser,
    edit,
  };
};
export default connect(mapState, mapDispatch)(User);
