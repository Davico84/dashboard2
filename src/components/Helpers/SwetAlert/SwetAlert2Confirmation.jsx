import Swal from 'sweetalert2';
import styles from './SwetAlert.modules.css';

const showAlert = (title, text, icon , confirmButtonText,action1,action2) => {
  Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
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
    if(result.isDenied){
      action2
    }
  });
};

export default showAlert;
