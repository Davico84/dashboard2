import { configureStore } from '@reduxjs/toolkit'
import userReducer from './usersSlice'
import videogamesReducer from './videogamesSlice';
import salesReducer from './salesSlice';

export default configureStore({
    reducer:{
        videoGamesState: videogamesReducer,
        usersState: userReducer,
        salesState: salesReducer,
        // cartState: cartReducer,
        // reviews: reviewsReducer,

    }
})