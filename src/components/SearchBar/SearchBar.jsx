import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HiSearch } from 'react-icons/hi'; // Importamos el icono de búsqueda
import styles from './SearchBar.module.css'; // Importamos los estilos del módulo

function SearchBar() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    // Aquí puedes despachar la acción para realizar la búsqueda con el texto ingresado
    // Por ejemplo: dispatch({ type: 'SEARCH_GAMES', payload: searchText });
    console.log('Realizando búsqueda:', searchText);
  };

  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={handleChange}
        className={styles.searchInput}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        <HiSearch className={styles.searchIcon} />
      </button>
    </div>
  );
}

export default SearchBar;