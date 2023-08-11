import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers: [],
    dataUser: {},
    dataUsr: {},
    gamesUser: [],
    usrMsgErr: "",
    userLoged: false,
    userToken: "",
    isLogged: "",
    filteredUsers: [],
    notFoundUsers: false,
    msgerror: "NULL",
}


export const UsersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getAllUsers: (state, action) => {
            state.allUsers = action.payload
        },
        getUserById: (state, action) => {
            state.dataUser = action.payload
        },
        getUserbyName: (state, action) => {
            state.allUsers = action.payload;
            state.notFoundGames = false
        },
        getUsrByName: (state, action) => {
            state.dataUsr = action.payload;
        },
        usrMsgErr: (state, action) => {
            state.dataUser = action.payload
        },
        notFoundUsersError: (state) => {
            state.notFoundUsers = true
        },
        setErrorMsg: (state, action) => {
            state.msgerror = action.payload
        },
        updateUsr: (state, action) => {
            const updatedUsr = action.payload;
            console.log(updatedUsr)
            const index = state.allUsers.findIndex(
                (user) => user.id === updatedUsr.id
            );
            if (index !== -1) {
                state.allUsers[index] = updatedUsr;
            }
            //state.allUsers = action.payload
        },
        gamesUsr: (state, action) => {
            state.dataUser = action.payload
        },
        setUserLoged: (state, action) => {
            console.log("user-------->", action.payload)
            state.isLogged = action.payload
        },
        setUserToken: (state, action) => {
            console.log("token------->", action.payload)
            state.userToken = `Bearer ${action.payload}`
        },
    }
})

export const { getAllUsers, getUserById, usrMsgErr, getUserbyName, notFoundUsersError, setErrorMsg, setUserLoged, setUserToken, updateUsr,getUsrByName } = UsersSlice.actions

export default UsersSlice.reducer