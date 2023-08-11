//import React from "react";
import styles from "./ViewDataUserModal.module.css";
import { faCircleCheck, faCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getUsers, updateUser } from '../../../redux/usersActions.js';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ViewDataUserModal({ user, onClose }) {
  const dispatch = useDispatch();
  let userDataUpdate = useSelector((state) => state.usersState.allUsers);
  //console.log(userDataUpdate)
  let usuarioFindState = userDataUpdate.find(usr => usr.id === user.id);
  console.log(usuarioFindState)

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleClosed = () => {
    onClose(); // Cierra el modal sin guardar cambios
  };

  const handleEditClick = (user) => {
    const updatedUser = { deleted: !user.deleted, id: user.id};
    dispatch(updateUser(updatedUser));
  };

  const handleEditAdminClick = (user) => {
    const updatedUser = { userAdmin: !user.userAdmin, id: user.id};
    dispatch(updateUser(updatedUser));
  };
  

  return (

    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <img src={usuarioFindState.image}
          alt="user" width="100" />
        <h4>{usuarioFindState.fullname.toUpperCase()}</h4>
        <h5>Birthday</h5>
        <div className={styles.userBirthday}>{usuarioFindState.date.slice(0, 10)}</div>
        <button className={styles.closeButton} onClick={handleClosed}>Close</button>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3>Information</h3>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>ID</h4>
              <p>{usuarioFindState.id}</p>
            </div>
            <div className={styles.data}>
              <h4>User</h4>
              <p>{usuarioFindState.user}</p>
            </div>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.info_data}>
            <div className={styles.data}>
              <h4>Email</h4>
              <p>{usuarioFindState.email}</p>
            </div>
            <div className={styles.data}>
              <h4>Phone</h4>
              <p>{usuarioFindState.phone}</p>
            </div>
          </div>
        </div>

        <div className={styles.projects}>
          <h3>STATUS</h3>
          <div className={styles.projects_data}>
            <div className={styles.data}>
              <h4>Is admin</h4>
              {/* <p><strong></strong> {usuarioFindState.userAdmin ? "Yes" : "No"}</p> */}
              {usuarioFindState.userAdmin ? (
                <span>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.crossIconAllow} />
                  <span className={styles.green}>Yes</span>
                  <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditAdminClick(usuarioFindState)} />
                </span>
              ) : (
           
                <span>
                  <FontAwesomeIcon icon={faCircleXmark} className={styles.crossIcon} />
                  <span className={styles.red}>No</span>
                  <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditAdminClick(usuarioFindState)} />
                </span>
              )}
            </div>
            <div className={styles.data}>
              <h4>Is banned</h4>
              {/* <p><strong></strong> {user.deleted ? "Yes" : "No"}</p> */}
              {usuarioFindState.deleted ? (
                <span>
                  <FontAwesomeIcon icon={faCircleXmark} className={styles.crossIcon} />
                  <span className={styles.red}>Banned</span>
                  <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditClick(usuarioFindState)} />
                </span>
              ) : (
                <span>
                  <FontAwesomeIcon icon={faCircleCheck} className={styles.crossIconAllow} />
                  <span className={styles.green}>Allow</span>
                  <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditClick(usuarioFindState)} />
                </span>
              )}
            </div>
          </div>
        </div>

        <div className={styles.projects}>
          <div className={styles.projects_data}>
            <div className={styles.data}>
              <h4>Registration date</h4>
              <p>{usuarioFindState.createdAt}</p>
            </div>
            <div className={styles.data}>
              <h4>Last update date</h4>
              <p>{usuarioFindState.updatedAt}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ViewDataUserModal;
