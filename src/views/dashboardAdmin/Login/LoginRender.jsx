import { useEffect, useState } from "react";
import Login from "./Login";
import  Logout  from "./Logout";
import { loadItemLocalStorage } from "../../../components/Helpers/functionsLocalStorage";

export const LoginRender = () => {


  const [loged, setLoged] = useState(null);

    useEffect(() => {
    async function fetchData() {
      const logedData = await loadItemLocalStorage("logedGameStack");
      setLoged(logedData); // Actualiza el estado de loged con los datos cargados
      console.log(logedData);
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Renderizar el componente basado en el estado loged */}
      {!loged && <Login />}
      {loged && <Logout />}
    </div>
  );
};
  
  
  
  
  
  
