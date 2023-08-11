import axios from "axios";
import { getAllUsers, getUserById, usrMsgErr, getUserbyName,getUsrByName, notFoundUsersError, setErrorMsg, setUserLoged, setUserToken, updateUsr } from './usersSlice.js'
import { loadItemLocalStorage, saveItemLocalStorage } from "../components/Helpers/functionsLocalStorage.js";

// export const getUsers=()=>(dispatch)=> {
//     axios("https://pfvideojuegos-back-production.up.railway.app/user/888")
//     .then(res=>dispatch(getAllUsers(res.data.results)))
//     .catch(e=>console.log(e))
// }
let estado=0
export const getUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/user`
      );

      const dataUsers = response.data;

      if (dataUsers) {
        dispatch(getAllUsers(dataUsers));
      } else {
        dispatch(usrMsgErr("No user registration"));
      }
    } catch (error) {
      console.log(`Error: ${error}`);
      dispatch(usrMsgErr(error));
    }
  };
};

export const getUserByID = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/user/${id}`
      );

      const dataUser = response.data;

      if (dataUser) {
        dispatch(getUserById(dataUser));
      } else {
        dispatch(usrMsgErr("No user registration"));
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      dispatch(usrMsgErr(err));
    }
  };
};


export const getUsersbyName =(query)=> (dispatch=>{
  console.log("esto me llega de query",query)
  fetch(`https://pfvideojuegos-back-production.up.railway.app/user?user=${query}`)
          .then(response =>{
              estado= response.status
              return response.json()
          })
          .then(json =>{
              if(estado ===200)
              // {
                 if(json.includes('No se encontraron videojuegos con el nombre') ) 
                      //  alert('No se encontraron videojuegos con ese Nombre')
                      dispatch(notFoundUsersError())
                  else 
                      dispatch(getUserbyName(json))
            
          }).catch(error =>{
              alert("error", error)
              dispatch(setErrorMsg(error))
          })
 
})

export const updateUser1 = async (newData) => {
  
  const response = await axios.put(
    'https://pfvideojuegos-back-production.up.railway.app/user/update',newData
    );

    console.log(response.data)
    saveItemLocalStorage('logedGameStack',response.data)




};



export const updateUser = (newData) => async (dispatch) => {
  console.log("esto es lo que se va a enviar al back")
  console.log(newData)
  try {
    const response = await axios.put(
      'https://pfvideojuegos-back-production.up.railway.app/user/update',
      newData
    );
    console.log(response.data)
    dispatch(updateUsr(response.data)); // Actualizamos el estado con los datos relevantes de la respuesta
    //return response.data; // Devolvemos los datos para un posible uso futuro
  } catch (error) {
    throw new Error('Error al actualizar el usuario.'); // Podrías personalizar el mensaje de error según tus necesidades.
  }
};

export const checkLogedUser  = () => async (dispatch) => {
  try {
    const data = await loadItemLocalStorage('logedGameStack');
    const user = data ? data : {};

    dispatch(setUserLoged(user));
    dispatch(setUserToken(user.token));
    
  } catch (error) {
    console.error('Error al obtener los datos desde AsyncStorage:', error);
  }
};



export const getUserByName2 = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `https://pfvideojuegos-back-production.up.railway.app/user?user=${name}`
      );

      const dataUser = response.data;
        console.log(dataUser)
      if (dataUser) {
        dispatch(getUsrByName(dataUser));
      } else {
        dispatch(usrMsgErr("No user registration"));
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      dispatch(usrMsgErr(err));
    }
  };
};