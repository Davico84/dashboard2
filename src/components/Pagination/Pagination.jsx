import React, { useState } from 'react';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'; // Importamos los iconos de ordenamiento
import styles from './Pagination.module.css';

function Pagination({ totalPages }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.horizontalList}>
        <div>Image</div>
        <div>Fullname</div>
        <div>ID</div>
        <div>Date</div>
        <div>State</div>
        <div>Upload Date</div>
        <div>Stock</div>
      </div>
      <div className={styles.pageNavigation}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        <div>{currentPage}</div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;