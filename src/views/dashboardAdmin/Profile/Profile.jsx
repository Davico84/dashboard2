import { loadItemLocalStorage } from "../../../components/Helpers/functionsLocalStorage";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import {
  checkLogedUser,
  getUserByName2,
  updateUser1,
} from "../../../redux/usersActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import Loading from "../../../components/Helpers/Loading";
import Loading2 from "../../../components/Helpers/Loading2";
import showAlert from "../../../components/Helpers/SwetAlert/SwetAlert1Confirmation";
import routeIcons from "../../../assets/IconsRoutes/icons";

const Profile = () => {
  // showLocalStorageData("logedGameStack"); //VERRRRRRRRRRRRRRRRRRRRR

  const loged = useSelector((state) => state.usersState.isLogged);
  const dataUserdb = useSelector((state) => state.usersState.dataUsr);

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [inputFocusedImage, setInputFocusedImage] = useState(true);
  const [image, setImage] = useState();

  console.log(dataUserdb[0]);

  const getDataFromAsyncStorage = async () => {
    try {
      const data = await loadItemLocalStorage("logedGameStack");
      if (data !== null) {
        console.log("Valor almacenado en showLocalStorageData:", data);
        dispatch(getUserByName2(data.user)); // Despachar la acción antes de actualizar el estado
        setImage(data.image);
        console.log("Console Log de parseData", data);

        // Realiza las operaciones que necesites con los datos obtenidos
        // ...
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      } else {
        console.log("No se encontró ningún valor en showLocalStorageData");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error al acceder a showLocalStorageData:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getDataFromAsyncStorage();
    }, 3000);
  }, []);

  // console.log("Console log dataUser:", dataUserdb);
  // console.log("Console log loged:", loged);

  const onSubmit = async (values) => {
    const userData = {
      ...values,
      userAdmin: true,
      image: image,
    };

    console.log("Antes del try:", userData);
    const objupdatedUser = {};

    // Verifica cada propiedad y agrega solo las que no sean nulas
    if (userData.user) objupdatedUser.user = userData.user;
    if (userData.fullname) objupdatedUser.fullname = userData.fullname;
    if (userData.pass) objupdatedUser.pass = userData.pass;
    if (userData.userAdmin) objupdatedUser.userAdmin = userData.userAdmin;
    if (userData.email) objupdatedUser.email = userData.email;
    if (userData.date) objupdatedUser.date = userData.date;
    if (userData.image) objupdatedUser.image = userData.image;
    if (userData.phone) objupdatedUser.phone = userData.phone;
    objupdatedUser.id = dataUserdb[0].id;

    console.log(objupdatedUser);

    try {
      const response = await updateUser1(objupdatedUser);
      console.log(response);
      showAlert(
        "Data Update!",
        "Your information has been updated",
        'routeIcons.confirm',
        "Ok",
        dispatch(checkLogedUser()))
      

    } catch (error) {
      showAlert(
        "Something went wrong",
        error.response.data.message,
        'routeIcons.cancel',
        "Ok",
        console.log("Error:", error.response.data.message),      
      );

    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "gameShop_img"); // Reemplaza con tu unsigned_upload_preset de Cloudinary

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/deamondhero/image/upload", // Reemplaza TU_CLOUD_NAME con tu cloud_name de Cloudinary
          formData
        );
        setImage(response.data.secure_url);
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
      }
    }
  };

  if (!dataUserdb.length)
    return (
      <div className={styles["loading-container"]}>
        <Loading />
      </div>
    );
  return (
    <div className={styles["profile-container"]}>
      <div className={styles.imageContainer}>
        <div className={styles.imageLoad}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            onBlur={() => setInputFocusedImage(false)}
            style={{ display: "none" }} // Cambia "flex" por "none" para ocultar el input por defecto
            id="imagePicker"
          />

          <label htmlFor="imagePicker">
            <div>
              <img src={image} alt="Selected" className={styles.imageLoaded} />
            </div>
          </label>
        </div>
      </div>
      <div className={styles.formContainer}>
        <div>
          <Formik
            initialValues={{
              user: "",
              pass: "",
              fullname: "",
              email: "",
              date: "",
              phone: "",
            }}
            validate={(values) => {
              let errors = {};

              if (values.user && values.user.length < 3) {
                errors.user = "User must be at least 5 characters long";
              }

              if (values.pass && values.pass.length < 5) {
                errors.pass = "Password must be at least 5 characters long";
              }

              if (values.fullname && values.fullname.length < 3) {
                errors.fullname = "Please enter your full name";
              }

              if (
                values.email &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
              ) {
                errors.email = "Please enter a valid email address";
              }

              if (values.phone && !/^\d+$/.test(values.phone)) {
                errors.phone = "Please enter a valid phone number";
              }

              return errors;
            }}
            data={dataUserdb}
            onSubmit={onSubmit}
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
                <div className={styles.allinputsContainer}>
                  <div className={styles.inputContainer}>
                    <div className={styles.inputWithIcon}>
                      <input
                        className={styles.input}
                        type="text"
                        value={values.user}
                        placeholder={dataUserdb[0].user}
                        onChange={handleChange("user")}
                        onBlur={handleBlur("user")}
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.crossIcon}
                      />
                    </div>
                  </div>
                  {errors.user && touched.user && (
                    <span className={styles.error}>{errors.user}</span>
                  )}

                  <div className={styles.inputContainer}>
                    <div className={styles.inputWithIcon}>
                      <input
                        className={styles.input}
                        value={values.pass}
                        type="password"
                        placeholder="•••••••••"
                        onChange={handleChange("pass")}
                        onBlur={handleBlur("pass")}
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.crossIcon}
                      />
                    </div>
                  </div>
                      {errors.pass && touched.pass && (
                        <span className={styles.error}>{errors.pass}</span>
                      )}

                  <div className={styles.inputContainer}>
                    <div className={styles.inputWithIcon}>
                      <input
                        className={styles.input}
                        value={values.fullname}
                        type="text"
                        placeholder={dataUserdb[0].fullname}
                        onChange={handleChange("fullname")}
                        onBlur={handleBlur("fullname")}
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.crossIcon}
                      />
                    </div>
                  </div>
                      {errors.fullname && touched.fullname && (
                        <span className={styles.error}>{errors.fullname}</span>
                      )}

                  <div className={styles.inputContainer}>
                    <div className={styles.inputWithIcon}>
                      <input
                        className={styles.input}
                        value={values.email}
                        type="email"
                        placeholder={dataUserdb[0].email}
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.crossIcon}
                      />
                    </div>
                  </div>
                      {errors.email && touched.email && (
                        <span className={styles.error}>{errors.email}</span>
                      )}

                  <div className={styles.inputContainer}>
                    <div className={styles.inputWithIcon}>
                      <input
                        className={styles.input}
                        value={values.date}
                        placeholder={convertirFecha(dataUserdb[0].date)}
                        onChange={handleChange("date")}
                        onBlur={handleBlur("date")}
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.crossIcon}
                      />
                    </div>
                  </div>

                  <div className={styles.inputContainer}>
                    <div className={styles.inputWithIcon}>
                      <input
                        className={styles.input}
                        value={values.phone}
                        // type="tel"
                        placeholder={dataUserdb[0].phone}
                        onChange={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                      />
                      <FontAwesomeIcon
                        icon={faPencil}
                        className={styles.crossIcon}
                      />
                    </div>
                  </div>
                      {errors.phone && touched.phone && (
                        <span className={styles.error}>{errors.phone}</span>
                      )}
                  <button
                    className={styles.miniButton}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <span className={styles.buttonText}>Change date</span>
                  </button>
                </div>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
