import React, {useEffect} from "react";
import {connect} from "react-redux";

const UserProfile = ({user}) => {
  return (
    <div>
      {user.firstName ? (
        <div>
          <h1>Welcome, {user.firstName}!</h1>
        </div>
      ) : (
        <div>
          <h1>Welcome, Valued Customer!</h1>
        </div>
      )}
      <div>
        <img className="profilePic" src={user.profilePic} alt="" />
      </div>
    </div>
  );
};

const mapState = ({user}) => {
  return {
    user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(mapState, mapDispatch)(UserProfile);
