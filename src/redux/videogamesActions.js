import {
  getAllVideogames,
  getVideogamesbyName,
  setErrorMsg,
  getVideogamebyId,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByAlphabeticalAsc,
  sortByAlphabeticalDesc,
  notFoundGamesError,
  sortByStockAsc,
  sortByStockDesc,
  updateGame,
} from "./videogamesSlice";

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
let estado = 0;
export const getvideoGames = () => (dispatch) => {
  //  dispatch(getAllVideogames(videogames))
  axios("https://pfvideojuegos-back-production.up.railway.app/games/admin")
    .then((res) => dispatch(getAllVideogames(res.data)))
    .catch((e) => console.log("error en la ruta", e));
};

export const getvGamebyName = (query) => (dispatch) => {
  fetch(
    `https://pfvideojuegos-back-production.up.railway.app/games/admin?name=${query}`
  )
    .then((response) => {
      estado = response.status;
      return response.json();
    })
    .then((json) => {
      //console.log("Juegos obtenidos de la API:", json); // Agregar el console.log para verificar los juegos obtenidos
      if (estado === 200) {
        if (json.includes("No se encontraron videojuegos con el nombre")) {
          dispatch(notFoundGamesError());
        } else {
          dispatch(getVideogamesbyName(json));
        }
      }
    })
    .catch((error) => {
      console.log("Error en la búsqueda:", error); // Agregar el console.log para verificar si hay errores
      alert("error", error);
      dispatch(setErrorMsg(error));
    });
};

export const getVGameByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/games/${id}`
      );

      const dataVg = response.data;

      if (dataVg) {
        dispatch(getVideogamebyId(dataVg)); // Asegúrate de importar y definir esta acción correctamente
      } else {
        dispatch(setErrorMsg("No game registration")); // Asegúrate de importar y definir esta acción correctamente
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      dispatch(setErrorMsg(err)); // Asegúrate de importar y definir esta acción correctamente
    }
  };
};

export const applyPriceSortAsc = () => (dispatch) => {
  dispatch(sortByPriceAsc());
};

export const applyPriceSortDesc = () => (dispatch) => {
  dispatch(sortByPriceDesc());
};

export const applyAlphabeticalSortAsc = createAsyncThunk(
  "videogames/applyAlphabeticalSortAsc",
  async (_, { dispatch }) => {
    dispatch(sortByAlphabeticalAsc());
  }
);

export const applyAlphabeticalSortDesc = createAsyncThunk(
  "videogames/applyAlphabeticalSortDesc",
  async (_, { dispatch }) => {
    dispatch(sortByAlphabeticalDesc());
  }
);

export const applyStockSortAsc = createAsyncThunk(
  "videogames/applyStockSortAsc",
  async (_, { dispatch }) => {
    dispatch(sortByStockAsc());
  }
);

export const applyStockSortDesc = createAsyncThunk(
  "videogames/applyStockSortDesc",
  async (_, { dispatch }) => {
    dispatch(sortByStockDesc());
  }
);

export const updateVideoGame = (updatedGame) => async (dispatch) => {
  try {
    const response = await axios.put(
      `https://pfvideojuegos-back-production.up.railway.app/games/update/${updatedGame.id}`,
      updatedGame
    );

    // Si la actualización es exitosa, dispatch la acción para actualizar el estado
    dispatch(updateGame(response.data));

    // Lógica adicional si es necesario después de actualizar el juego
    // ...
  } catch (error) {
    console.log("Error al actualizar el videojuego:", error);
    // Manejo de errores si es necesario
    // ...
  }
};
