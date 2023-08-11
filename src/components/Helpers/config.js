import { useSelector } from "react-redux";

const token = useSelector((state) => state.usersState.userToken);

export const config = (token) => {
  headers: {
    authorization: `Bearer ${token}`
  }
};