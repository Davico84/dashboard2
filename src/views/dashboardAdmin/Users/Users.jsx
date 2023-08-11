import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers, getUserByID, getUsersbyName, updateUser } from '../../../redux/usersActions.js';
import styles from './Users.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleXmark, faPen, faStreetView } from '@fortawesome/free-solid-svg-icons';
import EditGameModal from './ViewDataUserModal'

function Users() {
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [showDataModal, setShowDataModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usuariosPorPagina = 10;

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUserByID('477'));
    setShowDataModal(false);
  }, []);

  let allUsers = useSelector((state) => state.usersState.allUsers);

  function changeHandler(e) {
    setInput(e.target.value);
    const busqueda = e.target.value.toLowerCase();
    dispatch(getUsersbyName(busqueda));
  }

  const openViewDataModal = (user) => {
    setSelectedUser(user);
    setShowDataModal(true);
  };

  const closeViewDataModal = () => {
    setShowDataModal(false);
  };


  // Lógica de paginación
  const indiceUltimoUsuario = currentPage * usuariosPorPagina;
  const indicePrimerUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosActuales = allUsers.slice(indicePrimerUsuario, indiceUltimoUsuario);

  const handlePageChange = (numeroPagina) => {
    setCurrentPage(numeroPagina);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(allUsers.length / usuariosPorPagina)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditClick = (user) => {
    const updatedUser = { deleted: !user.deleted, id: user.id };
    dispatch(updateUser(updatedUser));
  };

  return (
    <div className={styles['users-container']}>
     {showDataModal && (
        <EditGameModal className={styles.userModal}
          onClose={closeViewDataModal}
          user={selectedUser}
          //onSave={handleSaveEdit}
        />
      )}
      <div className={styles.tableContainer}>
        <div className={styles.bar}>
          <div className={styles.userRow}>
            <div className={styles.title}>Users</div>
            <div className={styles.SearchBar}>
              <input type="text" className={styles.searchInput} placeholder="Search" onChange={changeHandler} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.tableTable}>
            <div className={styles.userTable}>
              <div className={styles.userRow}>
                <div className={styles.userHeaderColumn0}></div>
                <div className={styles.userHeaderColumn1}></div>
                <div className={styles.userHeaderColumn2}>User</div>
                <div className={styles.userHeaderColumn3}>Fullname</div>
                <div className={styles.userHeaderColumn4}>ID</div>
                <div className={styles.userHeaderColumn5}>State</div>
                <div className={styles.userHeaderColumn6}>Birthday</div>
              </div>
            </div>
            {Array.isArray(usuariosActuales) && usuariosActuales.length > 0 ? (
              usuariosActuales.map((e) => (
                <div className={styles.userTable} key={e.id}>
                  <div className={styles.userRow}>
                  <div className={styles.userColumn0}>
                  <FontAwesomeIcon icon={faStreetView} className={styles.iconViewDataUser} onClick={() => openViewDataModal(e)} />
                  </div>
                    <div className={styles.userColumn1}>
                      <img className={styles.userImage} src={e.image} alt="imagen del usuario" />
                    </div>
                    <div className={styles.userColumn2}>{e.user}</div>
                    <div className={styles.userColumn3}>{e.fullname}</div>
                    <div className={styles.userColumn4}>{e.id}</div>
                    <div className={styles.userColumn5}>
                      {e.deleted ? (
                        <span>
                          <FontAwesomeIcon icon={faCircleXmark} className={styles.crossIcon} />
                          <span className={styles.red}>Banned</span>
                          <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditClick(e)} />
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon icon={faCircleCheck} className={styles.crossIconAllow} />
                          <span className={styles.green}>Allow</span>
                          <FontAwesomeIcon icon={faPen} className={styles.editIcon} onClick={() => handleEditClick(e)} />
                        </span>
                      )}
                    </div>
                    <div className={styles.userColumn6}>{e.date.slice(0, 10)}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.NoFundMessage}>No user(s) to display</div>
            )}
          </div>
        </div>
        {/* Botones de paginación y flechas */}
        <div className={styles.pagination}>
          <button onClick={goToPreviousPage}>&lt;</button>
          {Array.from({ length: Math.ceil(allUsers.length / usuariosPorPagina) }).map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? styles.btnPaged : ''}>
              {index + 1}
            </button>
          ))}
          <button onClick={goToNextPage}>&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Users;
