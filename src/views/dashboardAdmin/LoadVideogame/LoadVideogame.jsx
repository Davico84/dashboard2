import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CancelSubmit from "../../../components/UtilsCreateGame/CalcelSubmit";
import SubmitGame from "../../../components/UtilsCreateGame/Submit";
import styles from "./LoadVIdeogame.module.css";
import axios from "axios";

import { validate } from "../../../components/UtilsCreateGame/CreateGameValidate";

import {
  allGenres,
  allPlatforms,
} from "../../../components/UtilsCreateGame/dataFilteredgames";
import routeIcons from "../../../assets/IconsRoutes/icons";

const LoadVideogame = () => {
  const [image, setImage] = useState([]);
  const token = useSelector((state) => state.usersState.userToken);
  console.log("elTokendeRegisteeeer", token);
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  console.log(`-------------------->>-->>>> ${date}`);
  const [inputFocusedName, setInputFocusedName] = useState(true);
  const [inputFocusedDesc, setInputFocusedDesc] = useState(true);
  const [inputFocusedDate, setInputFocusedDate] = useState(true);
  const [inputFocusedPrice, setInputFocusedPrice] = useState(true);
  const [inputFocusedImage, setInputFocusedImage] = useState(true);
  const [inputFocusedrequeriments_en, setInputFocusedrequeriments_en] =
    useState(true);
  const [inputFocusedScreenShots, setInputFocusedScreenShots] = useState();
  const [validateSubmit, setValidateSubmit] = useState(true);
  const [hoveredImage, setHoveredImage] = useState(null);

  const [stackData, setStackData] = useState({
    platforms: allPlatforms,
    genre: allGenres,
  });

  const [newVideoGame, setNewVideoGame] = useState({
    id: 1 + Math.floor(Math.random() * 999),
    name: "",
    description: "",
    image: "",
    screenShots: [],
    platforms: [],
    genre: [],
    price: "",
    requeriments_en: "",
    releaseDate: date,
  });

  console.log(`------------------------------------------ ${newVideoGame}`);
  /////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////
  useEffect(() => {
    validate(newVideoGame);
  }, [newVideoGame]);

  const validateNvg = validate(newVideoGame);

  console.log(validateNvg.name);

  ///////

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
        setNewVideoGame((newVideoGame) => ({
          ...newVideoGame,
          image: response.data.secure_url,
        }));
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
      }
    }
  };

  const handleScreenImageChange = async (e) => {
    const files = e.target.files;
    // Obtener una lista de archivos seleccionados

    const uploadPromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
          try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "gameShop_img"); // Reemplaza con tu unsigned_upload_preset de Cloudinary

            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/deamondhero/image/upload", // Reemplaza TU_CLOUD_NAME con tu cloud_name de Cloudinary
              formData
            );

            resolve(response.data.secure_url);
          } catch (error) {
            reject(error);
          }
        };

        reader.readAsDataURL(file);
      });
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);

      setNewVideoGame((prevVideoGame) => ({
        ...prevVideoGame,
        screenShots: [
          ...prevVideoGame.screenShots,
          ...uploadedImages.filter(
            (img) => !prevVideoGame.screenShots.includes(img)
          ),
        ],
      }));
      console.log(newVideoGame);
    } catch (error) {
      alert("Could not load image.");
      console.error("Error al subir la imagen a Cloudinary:", error);
    }
  };

  ///////////////////////////

  const handleTextChange = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      requeriments_en: text,
    }));
  };

  const handleTextChange2 = (text) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      description: text,
    }));
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleInputChange = (inputName, inputValue) => {
    setNewVideoGame({
      ...newVideoGame,
      [inputName]: inputValue,
    });
  };

  const deleteScreen = (image) => {
    setNewVideoGame((prevVideoGame) => ({
      ...prevVideoGame,
      screenShots: prevVideoGame.screenShots.filter((img) => img !== image),
    }));
  };
  // const deleteScreen = (image) => {
  //   setNewVideoGame((newVideoGame) => ({
  //     ...newVideoGame,
  //     screenShots: newVideoGame.screenShots.filter((i) => i !== image),
  //   }));
  // };

  const pushItemgenre = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        genre: [...prevState.genre, value],
      }));

      setStackData((prevState) => ({
        ...prevState,
        genre: prevState.genre.filter((p) => p !== value),
      }));
    }, 1200);
  };

  const removeItemgenre = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        genre: prevState.genre.filter((p) => p !== value),
      }));

      setStackData((prevState) => ({
        ...prevState,
        genre: [...prevState.genre, value],
      }));
    }, 1200);
  };

  ///////

  const pushItemplatforms = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, value],
      }));

      setStackData((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.filter((p) => p !== value),
      }));
    }, 1200);
  };

  const removeItemplatforms = (value) => {
    setTimeout(() => {
      setNewVideoGame((prevState) => ({
        ...prevState,
        platforms: prevState.platforms.filter((p) => p !== value),
      }));

      setStackData((prevState) => ({
        ...prevState,
        platforms: [...prevState.platforms, value],
      }));
    }, 1200);
  };

  return (
    <form className={styles.container}>
      <div className={styles.formContainer}>
        
        <h1 className={styles.header}>Load Videogame</h1>
        <div className={styles.subFormContainer}>
        <div>
          <h2>Title</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter Game name"
            value={newVideoGame.name}
            onBlur={() => setInputFocusedName(false)}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
          {validateNvg.name !== "" && !inputFocusedName && (
            <div className={styles.errorMessage}>{validateNvg.name}</div>
          )}
        </div>

        <div>
          <h2>Price</h2>
          <input
            className={styles.input}
            type="text"
            placeholder="$999.99"
            onBlur={() => setInputFocusedPrice(false)}
            value={newVideoGame.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
          {validateNvg.price !== "" && !inputFocusedPrice && (
            <div className={styles.errorMessage}>{validateNvg.price}</div>
          )}
        </div>

        <div>
          <h2>Release date</h2>
          <div>
            <input
              type="date"
              className={styles.datepickerinput}
              onBlur={() => setInputFocusedDate(false)}
              value={date}
              onChange={(e) => handleDateChange(e.target.value)}
              placeholder="Select a date"
              max={today}
            />
          </div>
          {validateNvg.releaseDate !== "" && !inputFocusedDate && (
            <div className={styles.errorMessage}>{validateNvg.releaseDate}</div>
          )}
        </div>

        <div className={styles.input}>
        <h2>Select genre</h2>
        <div>
          <select className={styles.inputGenrePlatform} onChange={(e) => pushItemgenre(e.target.value)}>
            <option value="" disabled selected>
              Add genre
            </option>
            {stackData.genre.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

      <div>
        <select className={styles.inputGenrePlatform} onChange={(e) => removeItemgenre(e.target.value)}>
          <option value="" disabled selected>
            Remove genre
          </option>
          {newVideoGame.genre.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      {validateNvg.genre !== "" && !validateSubmit && (
        <div className={styles.errorMessage}>{validateNvg.genre}</div>
      )}
</div>
<br></br>
      <div className={styles.input}>
        <h2>Select platform</h2>
        <div> 
          <select className={styles.inputGenrePlatform} onChange={(e) => pushItemplatforms(e.target.value)}>
            <option value="" disabled selected>
              Add platforms
            </option>
            {stackData.platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select className={styles.inputGenrePlatform} onChange={(e) => removeItemplatforms(e.target.value)}>
            <option value="" disabled selected>
              Remove platforms
            </option>
            {newVideoGame.platforms.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>
        </div>
        {validateNvg.platforms !== "" && !validateSubmit && (
          <div className={styles.errorMessage}>{validateNvg.platforms}</div>
        )}
      </div>
        </div>

        <div className={styles.descrReq}>
          <div>
          <h2>Description</h2>
          <textarea
            className={styles.textarea}
            placeholder="Paste_description"
            onBlur={() => setInputFocusedDesc(false)}
            value={newVideoGame.description}
            onChange={(e) => handleTextChange2(e.target.value)}
          />
          {validateNvg.description !== "" && !inputFocusedDesc && (
            <div className={styles.errorMessage}>{validateNvg.description}</div>
          )}
        </div>

        <div>
          <h2>System Requeriments</h2>
          <textarea
            className={styles.textarea}
            placeholder="Paste_requeriments"
            onBlur={() => setInputFocusedrequeriments_en(false)}
            value={newVideoGame.requeriments_en}
            onChange={(e) => handleTextChange(e.target.value)}
          />
          {validateNvg.requeriments_en !== "" &&
            !inputFocusedrequeriments_en && (
              <div className={styles.errorMessage}>
                {validateNvg.requeriments_en}
              </div>
            )}
        </div>
        </div>

        <div className={styles.imagesLoad}>
        <div className={styles.imageLoad}>
          <h2>Front page</h2>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            onBlur={() => setInputFocusedImage(false)}
            style={{ display: "none" }} // Cambia "flex" por "none" para ocultar el input por defecto
            id="imagePicker"
            icon={routeIcons.addImage}
          />
          {validateNvg.image && !inputFocusedImage && (
            <div className={styles.errorMessage}>{validateNvg.image}</div>
          )}
          <label htmlFor="imagePicker">
            <div>
              {newVideoGame.image.length > 0 ? (
                <img
                  src={image}
                  alt="Selected"
                  className={styles.imageLoaded}
                />
              ) : (
                <div>
                  <text className={styles.uploadImage}>
                    {<routeIcons.addImage />}
                  </text>
                </div>
              )}
              <text className={styles.message}>
                You can only upload one cover image
              </text>
            </div>
          </label>
        </div>

        <div className={styles.imageLoad}>
          <h2>Screeshots</h2>
          <input
            className={styles.updateImage}
            type="file"
            accept="image/*"
            onBlur={() => setInputFocusedScreenShots(false)}
            onChange={handleScreenImageChange}
            id="imagePicker"
            style={{ display: "flex", marginLeft:"20%" }}
            multiple
          />
          {/* <text className={styles.uploadImage}>
                    {<routeIcons.addImage />}
                  </text> */}
          <label htmlFor="imagePicker">
            <div>
              {newVideoGame.screenShots.length > 0 ? (
                newVideoGame.screenShots.map((imageUrl, index) => (
                  <div
                    key={index}
                    className={styles["image-container"]} // Aplica la clase CSS que oscurece la imagen en el hover
                    onMouseEnter={() => setHoveredImage(imageUrl)}
                    onMouseLeave={() => setHoveredImage(null)}
                  >
                    <img
                      src={imageUrl}
                      alt={`Selected ${index}`}
                      className={styles.imageLoad}
                    />

                    {hoveredImage === imageUrl && (
                      <div>
                        <button
                          className={styles["delete-button"]}
                          type="button"
                          onClick={() => deleteScreen(imageUrl)}
                        >
                          {<routeIcons.delete />}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div>
                  <text className={styles.uploadImage}>
                    {<routeIcons.addImage />}
                  </text>
                </div>
              )}
            </div>

        <text className={styles.message}>
          Hold ctrl to select multiple images
                    {validateNvg.screenShots !== "" && !inputFocusedScreenShots && (
                      <div className={styles.errorMessage}>{validateNvg.screenShots}</div>
                    )}
        </text>
          </label>
        </div>
      
      </div>



      <div className={styles.buttonContainer}>
        <button
          className={styles.buttonLoadGame}
          onClick={() =>
            SubmitGame(
              event,
              newVideoGame,
              setNewVideoGame,
              validateSubmit,
              setValidateSubmit,
              date,
              token
            )
          }
        >
          Load videogame
        </button>
        <button className={styles.cancel} onClick={CancelSubmit}>
          Cancel
        </button>
      </div>
      </div>
    </form>
  );
};

export default LoadVideogame;