import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateVideoGame } from "../../../redux/videogamesActions"; // Asegúrate de importar correctamente el archivo donde se define la acción

import styles from "./EditGameModal.module.css"; // Estilos para el modal

const genres = [
  "Action",
  "Adventure",
  "Arcade",
  "Casual",
  "Family",
  "Fighting",
  "Indie",
  "Massively Multiplayer",
  "Platformer",
  "Puzzle",
  "RPG",
  "Shooter",
  "Simulation",
  "Sports",
  "Strategy",
];

const platforms = [
  "Nintendo Switch",
  "PC",
  "PlayStation 4",
  "PlayStation 5",
  "Xbox Series S/X",
  "Linux",
  "Android",
  "macOS",
];

function EditGameModal({ selectedGame, onClose, onSave }) {
  const [editedGame, setEditedGame] = useState(selectedGame);
  const [formattedReleaseDate, setFormattedReleaseDate] = useState(
    selectedGame.releaseDate
      ? new Date(selectedGame.releaseDate).toISOString().split("T")[0]
      : ""
  );
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    selectedGame.platforms || []
  );
  const [selectedGenres, setSelectedGenres] = useState(
    selectedGame.genre || []
  );
  const [newPlatform, setNewPlatform] = useState("");
  const [newGenre, setNewGenre] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedPlatformToRemove, setSelectedPlatformToRemove] = useState("");
  const [selectedGenreToRemove, setSelectedGenreToRemove] = useState("");
  const [description, setDescription] = useState(
    selectedGame.description || ""
  );

  const dispatch = useDispatch();

  const hideSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "releaseDate") {
      setFormattedReleaseDate(value);
    } else if (name === "description") {
      // Agregar esta parte para manejar la descripción
      setDescription(value);
    }
    setEditedGame((prevGame) => ({
      ...prevGame,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    // Formatear la fecha en el formato esperado (yyyy-MM-dd)
    const formattedReleaseDate = new Date(editedGame.releaseDate)
      .toISOString()
      .split("T")[0];

    // Crear un nuevo objeto con la fecha formateada
    const editedGameWithFormattedDate = {
      ...editedGame,
      released: formattedReleaseDate,
      platforms: selectedPlatforms,
      genre: selectedGenres,
      description: description, // Añadir la descripción aquí
    };

    try {
      // Llamar a la acción updateVideoGame para actualizar el videojuego
      await dispatch(updateVideoGame(editedGameWithFormattedDate));
      onSave(editedGame); // Pasa el objeto del juego editado al componente padre
      setShowSuccessMessage(true); // Mostrar el mensaje de éxito
      setTimeout(hideSuccessMessage, 3000); // Ocultar el mensaje después de 3 segundos
    } catch (error) {
      console.log("Error al guardar los cambios:", error);
      // Manejo de errores si es necesario
      // ...
    }
  };

  const handleCancel = () => {
    onClose(); // Cierra el modal sin guardar cambios
  };

  const handleDeleteToggle = () => {
    setEditedGame((prevGame) => ({
      ...prevGame,
      deleted: !prevGame.deleted,
    }));
  };

  const handlePlatformChange = (e) => {
    const { value } = e.target;
    if (!selectedPlatforms.includes(value)) {
      setSelectedPlatforms((prevPlatforms) => {
        const updatedPlatforms = [...prevPlatforms, value];
        console.log("Selected Platforms:", updatedPlatforms);
        return updatedPlatforms;
      });
    }
    setSelectedPlatformToRemove(value); // Establecer la plataforma seleccionada para eliminar
  };

  const handleGenreChange = (e) => {
    const { value } = e.target;
    if (!selectedGenres.includes(value)) {
      setSelectedGenres((prevGenres) => {
        const updatedGenres = [...prevGenres, value];
        console.log("Selected Genres:", updatedGenres);
        return updatedGenres;
      });
    }
    setSelectedGenreToRemove(value); // Establecer el género seleccionado para eliminar
  };

  const handleAddPlatform = () => {
    if (newPlatform && !selectedPlatforms.includes(newPlatform)) {
      setSelectedPlatforms((prevPlatforms) => [...prevPlatforms, newPlatform]);
      setNewPlatform("");
    }
  };

  const handleAddGenre = () => {
    if (newGenre && !selectedGenres.includes(newGenre)) {
      setSelectedGenres((prevGenres) => [...prevGenres, newGenre]);
      setNewGenre("");
    }
  };

  const handleRemovePlatform = () => {
    setSelectedPlatforms((prevPlatforms) => {
      const updatedPlatforms = prevPlatforms.filter(
        (platform) => platform !== selectedPlatformToRemove
      );
      console.log("Selected Platforms after removal:", updatedPlatforms); // Log después de eliminar una plataforma
      return updatedPlatforms;
    });
  };

  const handleRemoveGenre = () => {
    setSelectedGenres((prevGenres) =>
      prevGenres.filter((genre) => genre !== selectedGenreToRemove)
    );
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h3>Edit Game</h3>
        <form>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={editedGame.name}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={editedGame.price}
                onChange={handleChange}
              />{" "}
              {/* Cambia "Price" a "price" aquí */}
            </div>
            <div className={styles.formGroup}>
              <label>Stock:</label>
              <input
                type="number"
                name="stock"
                value={editedGame.stock}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Release Date:</label>
              {/* Utiliza el estado local formateado para el input de tipo date */}
              <input
                type="date"
                name="releaseDate" // Cambia "released" a "releaseDate" aquí
                value={formattedReleaseDate}
                onChange={handleChange}
              />
            </div>
            
          </div>

          <div className={styles.formRow}>
          <div className={styles.formGroup}>
              <label>Platforms:</label>
              <select name="platforms" onChange={handlePlatformChange} multiple>
                {selectedPlatforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
              >
                <option value="">Select Platform</option>
                {platforms.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleAddPlatform}>
                Add Platform
              </button>
              {/* Modifica el botón para que llame a la función handleRemovePlatform con el elemento seleccionado */}
              <button
                type="button"
                onClick={() => {
                  handleRemovePlatform();
                }}
              >
                Remove Platform
              </button>
            </div>
            <div className={styles.formGroup}>
              <label>Genre:</label>
              <select name="genre" onChange={handleGenreChange} multiple>
                {selectedGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <select
                value={newGenre}
                onChange={(e) => setNewGenre(e.target.value)}
              >
                <option value="">Select Genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
              <button type="button" onClick={handleAddGenre}>
                Add Genre
              </button>
              {/* Modifica el botón para que llame a la función handleRemoveGenre con el elemento seleccionado */}
              <button
                type="button"
                onClick={() => {
                  handleRemoveGenre();
                }}
              >
                Remove Genre
              </button>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              cols={50}
            />
          </div>
        </form>
        {showSuccessMessage && (
          <div className={styles.successMessage}>
            Successful Edition
          </div>
        )}
        <div className={styles.modalButtons}>
          <div>
            <button
              className={
                editedGame.deleted
                  ? styles.deletedButton
                  : styles.availableButton
              }
              onClick={handleDeleteToggle}
            >
              {editedGame.deleted ? "Available" : "Deleted"}
            </button>
          </div>
          <div>
            <button onClick={handleSave}>Save</button>
          </div>
          <div>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditGameModal;
