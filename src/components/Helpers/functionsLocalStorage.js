export const saveItemLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    console.log(`Clave "${key}" y valor "${value}" guardados en localStorage.`);
  } catch (error) {
    console.error("Error al guardar el par clave-valor en localStorage:", error);
  }
};

export const loadItemLocalStorage = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error al obtener el valor desde localStorage:", error);
    return null;
  }
};

export const removeItemLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
    console.log("Clave eliminada exitosamente de localStorage.");
  } catch (error) {
    console.error('Error al eliminar de localStorage:', error);
  }
};

export const showLocalStorageData = () => {
  try {
    console.log('Contenido de localStorage:');
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(key, value);
    }
  } catch (error) {
    console.error('Error al obtener datos de localStorage:', error);
  }
};


export const updateLocalStorage = async (key, newData) => {
  try {
    // Obtén los datos existentes del AsyncStorage
    const storedData = await localStorage.getItem(key);
    if (storedData !== null) {
      const parsedData = JSON.parse(storedData);
      const updatedData = { ...parsedData };

      const changedFields = [];
      for (const field in newData) {
        if (newData[field] !== updatedData[field]) {
          updatedData[field] = newData[field];
          changedFields.push(field);
        }
      }

      // Actualiza solo los valores que han cambiado
      if (changedFields.length > 0) {
        await localStorage.setItem(key, JSON.stringify(updatedData));
      }

      const result = {
        createdAt: updatedData.createdAt,
        date: updatedData.date,
        deleted: updatedData.deleted,
        email: updatedData.email,
        fullname: updatedData.fullname,
        id: updatedData.id,
        image: updatedData.image,
        newsLetter: updatedData.newsLetter,
        password: updatedData.password,
        phone: updatedData.phone,
        tac: updatedData.tac,
        token: updatedData.token,
        updatedAt: updatedData.updatedAt,
        user: updatedData.user,
        userAdmin: updatedData.userAdmin
      };

      return result;
    }
  } catch (error) {
    console.error("Error updating AsyncStorage:", error);

    const result = {
      error: error.message || "Unknown error"
    };

    return result;
  }
};