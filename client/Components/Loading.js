import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

const isLoading = (Component) => ({loading, ...props}) => {
  if (!loading) return <Component {...props} />;
  return (
    <div className="loadingDiv">
      <CircularProgress className="loading" />
    </div>
  );
};

export default isLoading;
