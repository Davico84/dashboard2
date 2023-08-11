import Swal from 'sweetalert2';
import styles from './SwetAlert.modules.css';

const showAlert = (title, text, icon , confirmButtonText,action1) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText,
    customClass: {
      container: styles.mySwalContainer,
      title: styles.mySwalTitle,
      content: styles.mySwalContent,
      confirmButton: styles.mySwalConfirmButton,
    },
  }).then((result)=>{
    if(result.isConfirmed){
    action1}
  });
};

export default showAlert;
