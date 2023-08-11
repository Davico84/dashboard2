import {   Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './views/NavBar/NavBar';

// Importar los componentes de las rutas
import Games from './views/dashboardAdmin/Games/Games';
import Metrics from './views/dashboardAdmin/Metrics/Metrics';
import { LoginRender } from './views/dashboardAdmin/Login/LoginRender';
import Profile from './views/dashboardAdmin/Profile/Profile';
import Users from './views/dashboardAdmin/Users/Users';
import AdminBar from './components/AdminBar/AdminBar';
import LoadVideogame from './views/dashboardAdmin/LoadVideogame/LoadVideogame';
import Sales from "./views/dashboardAdmin/Sales/Sales";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadItemLocalStorage } from './components/Helpers/functionsLocalStorage';
import { checkLogedUser } from './redux/usersActions';

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const logedData = await loadItemLocalStorage("logedGameStack");
      console.log(logedData)
      if (logedData.user && logedData.deleted=== false) dispatch(checkLogedUser());
    }
    fetchData();
  }, []);

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}   {/* Mostrar NavBar en todas las rutas excepto en la página de inicio */}
      {location.pathname !== "/" && <AdminBar />} {/* Mostrar AdminBar en todas las rutas excepto en la página de inicio */}
      <Routes>
        <Route path="/" element={<LoginRender />} />
        <Route path="/games" element={<Games />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/loadvideogame" element={<LoadVideogame />} />
      </Routes>
    </div>
  );
}

export default App;