import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getvGamebyName,
  getvideoGames,
} from "../../../redux/videogamesActions";
import styles from "./Games.module.css";
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import Filter from "../../../components/Filters/Filters";
import EditGameModal from "./EditGameModal";
import { getVideogamesbyName, filterVideoGamesByName } from "../../../redux/videogamesSlice";

let prevId = 1;

function Games() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const videoGames = useSelector((state) => state.videoGamesState.videoGames);
  const juegosPorPagina = 10;
  const [selectedGame, setSelectedGame] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [resetComponent, setResetComponent] = useState(false);

  let filteredGames = videoGames;
  const numPaginasMostradas = 5;

  const calcularRangoPaginas = (paginaActual, totalPaginas) => {
    const rangoMitad = Math.floor(numPaginasMostradas / 2);
    let startPage = paginaActual - rangoMitad;
    let endPage = paginaActual + rangoMitad;
  
    if (startPage <= 0) {
      endPage -= (startPage - 1);
      startPage = 1;
    }
  
    if (endPage > totalPaginas) {
      endPage = totalPaginas;
      if (endPage - numPaginasMostradas + 1 > 0) {
        startPage = endPage - numPaginasMostradas + 1;
      } else {
        startPage = 1;
      }
    }
  
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  useEffect(() => {
    if (resetComponent) {
      // Restablecer los estados a sus valores iniciales
      setInput("");
      setCurrentPage(1);
      setSelectedGame(null);
      setShowMenu(false);
      setShowEditModal(false);
      // Despachar la acción para obtener los videojuegos nuevamente (si es necesario)
      dispatch(getvideoGames());

      // Establecer el estado de resetComponent nuevamente a false para evitar que el efecto se ejecute en cada renderizado
      setResetComponent(false);
    }
  }, [resetComponent]);

  // Función para abrir el modal de edición
  const openEditModal = () => {
    setShowEditModal(true);
  };

  // Función para cerrar el modal de edición
  const closeEditModal = () => {
    setShowEditModal(false);
  };

  // Función para guardar los cambios del formulario de edición
  const handleSaveEdit = (editedGame) => {
    // Implementa aquí la lógica para guardar los cambios del juego editado
    console.log("Guardando cambios del juego:", editedGame);
    // Puedes despachar la acción de Redux para actualizar el juego en el estado global aquí
  };

  const handleSelectGame = (game) => {
    if (selectedGame && selectedGame.id === game.id && showMenu) {
      // Deseleccionar el juego si ya estaba seleccionado y el menú está visible
      setSelectedGame(null);
      setShowMenu(false); // Ocultar el menú emergente al deseleccionar
    } else {
      // Seleccionar el juego si no estaba seleccionado previamente
      setSelectedGame(game);
      setShowMenu(true); // Mostrar el menú emergente al seleccionar
    }
  };

  useEffect(() => {
    dispatch(getvideoGames());
  }, []);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    const filteredGames = videoGames.filter((game) =>
      game.name.toLowerCase().includes(busqueda)
    );
    dispatch(getVideogamesbyName(filteredGames));
  }

  const indiceUltimoJuego = currentPage * juegosPorPagina;
  const indicePrimerJuego = indiceUltimoJuego - juegosPorPagina;
  const juegosPaginaActual = Array.isArray(videoGames)
    ? videoGames.slice(
        (currentPage - 1) * juegosPorPagina,
        currentPage * juegosPorPagina
      )
    : [];

  const handlePageChange = (numeroPagina) => {
  setCurrentPage(Math.min(numeroPagina, Math.ceil(videoGames.length / juegosPorPagina)));
};

const goToPreviousPage = () => {
  setCurrentPage(Math.max(currentPage - 1, 1));
};

const goToNextPage = () => {
  setCurrentPage(Math.min(currentPage + 1, Math.ceil(videoGames.length / juegosPorPagina)));
};

  // console.log("Estado videoGames:", videoGames);
  // console.log("Estado filteredVideoGames:", filteredVideoGames);

  return (
    <div className={styles["users-container"]}>
      {showEditModal && selectedGame && (
        <EditGameModal
          selectedGame={selectedGame}
          onClose={closeEditModal}
          onSave={handleSaveEdit}
        />
      )}
      <div className={styles.tableContainer}>
        <div className={styles.bar}>
          <div className={styles.userRow}>
            <div className={styles.title}>Games</div>
            
            
            <div className={styles.SearchBar}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search"
                onChange={changeHandler}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.tableTable}>
            <div className={styles.userTable}>
              <div className={styles.userRow}>
                <div className={styles.userHeaderColumn1}>Game/Price</div>
                <div className={styles.userHeaderColumn2}></div>
                <div className={styles.userHeaderColumn3}>Name</div>
                <div className={styles.userHeaderColumn4}>ID</div>
                <div className={styles.userHeaderColumn5}>Stock</div>
                <div className={styles.userHeaderColumn6}>Upload date</div>
              </div>
            </div>
            {Array.isArray(juegosPaginaActual) &&
            juegosPaginaActual.length > 0 ? (
              juegosPaginaActual.map((e) => (
                <div
                  key={e.id}
                  className={`${styles.userRow} ${
                    selectedGame && selectedGame.id === e.id
                      ? styles.selectedRow
                      : ""
                  }`}
                  onClick={() => handleSelectGame(e)}
                >
                  <div className={styles.userTable} key={prevId++}>
                    <div className={styles.userRow}>
                      <div className={styles.userColumn1}>
                        <img
                          className={styles.userImage}
                          src={e.image}
                          alt="imagen del juego"
                        />
                      </div>
                      <div className={styles.userColumn2}>{e.price}$ </div>
                      <div className={styles.userColumn3}>{e.name}</div>
                      <div className={styles.userColumn4}>{e.id}</div>
                      <div className={styles.userColumn5}>{e.stock}</div>
                      <div className={styles.userColumn6}>
                        {convertirFecha(e.releaseDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.NoFundMessage}>No game(s) to display</div>
            )}
          </div>
        </div>
        {showMenu && selectedGame && (
          <div className={styles.menuContainer}>
            <button onClick={openEditModal}>Editar</button>
          </div>
        )}
       <div className={styles.menuContainer2}>
  <Filter />
  <button
    className={`${styles.updateListButton}`}
    onClick={() => {
      setResetComponent(true);
      setInput("");
    }}
  >
    Update list
  </button>
</div>
        
        {/* Botones de paginación y flechas */}
        <div className={styles.pagination}>
          <button onClick={goToPreviousPage}>&lt;</button>
      {calcularRangoPaginas(currentPage, Math.ceil(videoGames.length / juegosPorPagina)).map((pageIndex) => (
        <button
          key={pageIndex}
          onClick={() => handlePageChange(pageIndex)}
          className={currentPage === pageIndex ? styles.btnPaged : ""}
        >
          {pageIndex}
        </button>
      ))}
      <button onClick={goToNextPage}>&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Games;