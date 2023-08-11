import { Link } from 'react-router-dom';
import routes from '../../../routes';
import routeIcons from '../../assets/IconsRoutes/icons';
import styles from './NavBar.module.css'; // Cambia el nombre del import a NavBar.module.css
import { useDispatch } from "react-redux";
import { removeItemLocalStorage, showLocalStorageData } from "../../components/Helpers/functionsLocalStorage";
import { checkLogedUser } from "../../redux/usersActions";
import { useNavigate } from "react-router";
function NavBar() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUnlogin = () => {

    removeItemLocalStorage("logedGameStack");
    dispatch(checkLogedUser());
    showLocalStorageData();
    navigate('/')
  };


  // Función para obtener el icono según el nombre de la ruta
  function getIcon(routeName) {
    const Icon = routeIcons[routeName];
    return Icon ? <Icon /> : null;
  }

  return (
    <div className={styles['menu-container']}> {/* Utiliza la clase del CSS Module */}
      <h1>GameStack</h1>
      <ul id="nav-list">
        {routes.map((route, index) => (
          <li key={index}>
            {/* Agregamos el icono correspondiente a cada elemento de la lista */}
            {getIcon(route.name)}
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ul>
      <hr />
     <button onClick={()=>handleUnlogin()} className={styles['close-session']}>
        {getIcon('Logout')}Close session
      </button>
    </div>
  );
}

export default NavBar;