import { Navigate } from "react-router-dom";

export const Protected = ({ children }) => {
  if (localStorage.getItem("token")?.length > 0) {
    return children;
  } else {
    return <Navigate to={"/sign-in"} />;
  }
};
