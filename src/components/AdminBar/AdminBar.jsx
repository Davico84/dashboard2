import { HiUserCircle } from 'react-icons/hi'; // Importamos el icono de usuario
import styles from './AdminBar.module.css'; // Importamos los estilos del módulo
import { loadItemLocalStorage } from '../Helpers/functionsLocalStorage';
import { obtenerPrimerNombre } from '../Helpers/Primernombre';

function AdminBar() {

  const loged= loadItemLocalStorage("logedGameStack")

  return (
    <div className={styles.adminBar}>
      <div className={styles.greeting}>Hi, welcome Admin</div>
      <div className={styles.userInfo}>
        <div className={styles.userName}>{loged.fullname}</div>
       <div>{loged && loged.user ? <img src={loged.image} className={styles.image}  alt="photo profile" /> : <HiUserCircle className={styles.userIcon} />}</div>
      </div>
    </div>
  );
}

export default AdminBar;