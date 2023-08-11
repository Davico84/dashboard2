import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoGames: [],
  videoGame: [],
  msgerror: "NULL",
  vGameId: [],
  filteredVideoGames: [],
};
export const videogamesSlice = createSlice({
  name: "videogames",
  initialState,
  reducers: {
    //noc xq pero aqui es plural
    getAllVideogames: (state, action) => {
      state.videoGames = action.payload;
    },
    getVideogamesbyName: (state, action) => {
      state.videoGames = action.payload; // Cambia filteredVideoGames= action.payload; a state.filteredVideoGames= action.payload;
      state.filteredVideoGames = action.payload;
      state.notFoundGames = false;
    },

    getVideogamebyId: (state, action) => {
      state.vGameId = action.payload;
      state.videoGame = action.payload;
    },

    setErrorMsg: (state, action) => {
      state.msgerror = action.payload;
    },

    sortByPriceAsc: (state) => {
      state.videoGames.sort((a, b) => a.price - b.price);
      state.filteredVideoGames.sort((a, b) => a.price - b.price);
    },

    sortByPriceDesc: (state) => {
      state.videoGames.sort((a, b) => b.price - a.price);
      state.filteredVideoGames.sort((a, b) => b.price - a.price);
    },

    sortByAlphabeticalAsc: (state) => {
      state.videoGames.sort((a, b) => a.name.localeCompare(b.name));
      state.filteredVideoGames.sort((a, b) => a.name.localeCompare(b.name));
    },

    sortByAlphabeticalDesc: (state) => {
      state.videoGames.sort((a, b) => b.name.localeCompare(a.name));
      state.filteredVideoGames.sort((a, b) => b.name.localeCompare(a.name));
    },

    sortByStockAsc: (state) => {
      state.videoGames.sort((a, b) => a.stock - b.stock);
      state.filteredVideoGames.sort((a, b) => a.stock - b.stock);
    },

    sortByStockDesc: (state) => {
      state.videoGames.sort((a, b) => b.stock - a.stock);
      state.filteredVideoGames.sort((a, b) => b.stock - a.stock);
    },

    updateGame: (state, action) => {
      const updatedGame = action.payload;
      const index = state.videoGames.findIndex(
        (game) => game.id === updatedGame.id
      );
      if (index !== -1) {
        state.videoGames[index] = updatedGame;
      }
    },
  },
});

export const filterVideoGamesByName = createAsyncThunk(
  "videogames/filterVideoGamesByName",
  async (searchQuery, { getState }) => {
    const videoGames = getState().videogames.videoGames;
    const filteredGames = videoGames.filter(
      (game) => game.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredGames;
  }
);

export const {
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
} = videogamesSlice.actions;
export default videogamesSlice.reducer;
