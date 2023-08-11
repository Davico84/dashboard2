import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Filters.module.css';
import {
  applyAlphabeticalSortAsc,
  applyAlphabeticalSortDesc,
  applyStockSortAsc,
  applyStockSortDesc
} from '../../redux/videogamesActions';
import {
  sortByPriceAsc,
  sortByPriceDesc,
} from '../../redux/videogamesSlice';


const Filter = () => {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false); // State to toggle the filter menu

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    if (selectedSortOption === 'price-asc') {
      dispatch(sortByPriceAsc());
    } else if (selectedSortOption === 'price-desc') {
      dispatch(sortByPriceDesc());
    } else if (selectedSortOption === "alphabetical-asc") {
      dispatch(applyAlphabeticalSortAsc());
    } else if (selectedSortOption === "alphabetical-desc") {
      dispatch(applyAlphabeticalSortDesc());
    } else if (selectedSortOption === "stock-asc") { // New sort option for stock ascending
      dispatch(applyStockSortAsc());
    } else if (selectedSortOption === "stock-desc") { // New sort option for stock descending
      dispatch(applyStockSortDesc());
    }
    setShowFilters(false); // Close the filter menu after selecting an option
  };

  return (
    <div className={styles['filter-container']}>
      <button className={styles['filter-btn']} onClick={() => setShowFilters(!showFilters)}>
        Sort
      </button>
       {showFilters && (
        <div className={styles['filter-menu']}>
      <div>
        <label>Sort By:</label>
        <select onChange={handleSortChange}>
          <option value="">None</option>
          <option value="price-asc">Price (Ascending)</option>
          <option value="price-desc">Price (Descending)</option>
          <option value="alphabetical-asc">Alphabetical (Ascending)</option>
          <option value="alphabetical-desc">Alphabetical (Descending)</option>
          <option value="stock-asc">Sotck (Ascending)</option>
          <option value="stock-desc">Sotck (Descending)</option>
          </select>
      </div>
  </div>
  )}
</div>
);
};

export default Filter;