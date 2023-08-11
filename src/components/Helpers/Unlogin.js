import { useDispatch } from "react-redux";
import { removeItemLocalStorage, showLocalStorageData } from "./functionsLocalStorage";
import { checkLogedUser } from "../../redux/usersActions";
import { useNavigate } from "react-router";

const handleUnlogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    removeItemLocalStorage("logedGameStack");
    dispatch(checkLogedUser());
    showLocalStorageData();
    navigate('/')
  };


export default handleUnlogin