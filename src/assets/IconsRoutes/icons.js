// Agrega la importación de los íconos de la NavBar
import { AiOutlineHome } from 'react-icons/ai';
import { FaGamepad, FaMoneyBill } from 'react-icons/fa';
import { IoMdAnalytics } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { BiSolidCloudUpload } from 'react-icons/bi';
import { AiFillEye } from 'react-icons/ai'
import { AiFillEyeInvisible } from 'react-icons/ai'
// Agrega la importación del ícono de cerrar sesión
import { FiLogOut } from 'react-icons/fi'; 
import {TiDeleteOutline} from 'react-icons/ti';
import {BiImageAdd} from 'react-icons/bi'
import {ImCancelCircle} from 'react-icons/im'
import {BiCheck} from 'react-icons/bi'


// Mapeo de nombres de ruta a iconos
const routeIcons = {
  Login: AiOutlineHome,
  Games: FaGamepad,
  Metrics: IoMdAnalytics,
  Profile: FaUser,
  Users: FaUsers,
  Logout: FiLogOut,
  Visible: AiFillEye,
  Invisible: AiFillEyeInvisible,
  Sales: FaMoneyBill,
  LoadGame: BiSolidCloudUpload,
  delete: TiDeleteOutline,
  addImage: BiImageAdd,
  confirm: BiCheck,
  cancel: ImCancelCircle,

};

export default routeIcons;