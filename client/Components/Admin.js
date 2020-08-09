import React, {useEffect} from "react";
import {connect} from "react-redux";
import {fetchAdminData} from "../store/adminReducer";
import MaterialTable from "material-table";

const Admin = ({user, dispatch, admin, loggedIn}) => {
  useEffect(() => {
    dispatch(fetchAdminData());
  }, []);
  return (
    <div>
      {user.clearance === 5 ? (
        <h1>You are authorized to view this page</h1>
      ) : (
        <h1>You are not authorized to view this page</h1>
      )}
    </div>
  );
};

const mapState = ({user, admin, form}) => {
  const {loggedIn} = form;
  return {
    user,
    admin,
    loggedIn,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(Admin);
