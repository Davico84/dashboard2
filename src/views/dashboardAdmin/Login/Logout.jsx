import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { loadItemLocalStorage, removeItemLocalStorage, showLocalStorageData } from "../../../components/Helpers/functionsLocalStorage";
import { checkLogedUser } from "../../../redux/usersActions";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

 const Logout = () => {
  const dispatch = useDispatch();
  const [loged, setLoged] = useState(null);
  console.log(loged);
  showLocalStorageData("logedGameStack")

  useEffect(() => {
    const fetchData = async () => {
      const logedData = await loadItemLocalStorage("logedGameStack");
      setLoged(logedData);
      console.log(logedData);
    };
    fetchData();
  }, []);

  const handleUnlogin = () => {
    removeItemLocalStorage("logedGameStack");
    dispatch(checkLogedUser());
    showLocalStorageData();
  };

  return (
    <div>
      <Link to="/profile">
        <button className={styles.button}>Go to Dashboard</button>
      </Link>

        <button className={styles.button} onClick={handleUnlogin}>Logout</button>
    </div>
  );
};

export default Logout
