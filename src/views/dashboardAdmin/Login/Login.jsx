import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import styles from "./Login.module.css"; // Agrega el archivo CSS para los estilos
import { useNavigate } from "react-router-dom";


import {
  saveItemLocalStorage,
  loadItemLocalStorage,
  showLocalStorageData,
} from "../../../components/Helpers/functionsLocalStorage";
import loginService from "../../../services/login";
import { checkLogedUser } from "../../../redux/usersActions";
import routeIcons from "../../../assets/IconsRoutes/icons";
import logoImage from "../../../assets/logoLigth.png";

const Login = () => {


  const dispatch = useDispatch();
  const [loginUser, setLogingUser] = useState(null);
  // const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const navigate = useNavigate()



  useEffect(() => {
    const loadUserFromLocalStorage = async () => {
      try {
        const loggedUser = await loadItemLocalStorage("user");
        if (loggedUser) {
          const dataUser = JSON.parse(loggedUser);
          setLogingUser(dataUser);
          dispatch(checkLogedUser());
          setTimeout(() => {
            // console.log("------------------------->", token);
            // console.log("------------------------->", loged);
          }, 5000);
        }
      } catch (error) {
        console.error(
          "Error al cargar el usuario desde el almacenamiento local:",
          error
        );
      }
    };

    loadUserFromLocalStorage();
  }, [loginUser,dispatch]);

  const handleLogin = async (values) => {
    try {
      const user = await loginService.login({
        user: values.user,
        password: values.password,
      });

      console.log("ACA ESTA LO QUE DEVUELVE LA PROMESA", user);

      if (user.userAdmin===true) {
        setLogingUser(user);
        saveItemLocalStorage("logedGameStack", user);
        showLocalStorageData();
        dispatch(checkLogedUser());
        navigate("/profile")
      } else {
        setErrorMessage("Wrong credentials");
      }
    } catch (e) {
      console.log(e);
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    
    

    }

  };



  return (
    <Formik
      initialValues={{
        user: "",
        password: "",
      }}
      validate={(val) => {
        let errors = {};

        if (!val.user) {
          errors.user = "Enter Username";
        }

        if (!val.password) {
          errors.password = "Enter password";
        }
        return errors; // Agrega esta línea para devolver el objeto errors
      }}
      
      onSubmit={handleLogin}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => {
        return (
          <div className={styles.loginContainer}>
            <div>
              <img
                className={styles.logo}
                src={logoImage}
              />
            </div>
            <div className={styles.containerLogin}>
              {errorMessage && <p className={styles.error}>{errorMessage}</p>}
              <div className={styles.containerinput}>
                <input
                  placeholder="Username"
                  value={values.user}
                  onChange={handleChange("user")}
                  onBlur={handleBlur("user")}
                  className={styles.input}
                />
              </div>
                {errors.user && touched.user && (
                  <p className={styles.error}>{errors.user}</p>
                )}

              <div className={styles.containerinput}>
                <input
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange("password")}
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur("password")}
                  className={styles.input}
                />

                <button
                  className={styles.showPasswordButton}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <routeIcons.Visible/> : <routeIcons.Invisible/>}
                </button>
              </div>
              {errors.password && touched.password && (
                  <p className={styles.error}>{errors.password}</p>
                )}

              <button className={styles.loginButton} onClick={handleSubmit}>
                Login
              </button>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
