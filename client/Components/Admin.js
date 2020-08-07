import React, {useEffect} from "react";
import {connect} from "react-redux";

const Admin = ({user}) => {
  return (
    <div>
      {user.clearance === 5 ? (
        <div>
          <h1>You are authorized to view this page</h1>
        </div>
      ) : (
        <h1>You are not authorized to view this page</h1>
      )}
    </div>
  );
};

const mapState = ({user}) => {
  console.log(user.clearance);
  return {
    user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(Admin);
