
import { useDispatch } from "react-redux";
import { logoutUser } from "./Auth/Auth";

const checkForUnauthorizedStatus = (status) => {
  const dispatch = useDispatch();

  if (status === 401) {
    dispatch(logoutUser);
  }
};

export default checkForUnauthorizedStatus;
