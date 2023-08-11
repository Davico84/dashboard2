/* eslint-disable no-undef */
import styles from "./Sales.module.css";
import { convertirFecha } from "../../../components/Helpers/InvertDate";
import { useSelector, useDispatch } from "react-redux";
import { getAllSales, searchSales } from "../../../redux/salesActions";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function Sales() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSale, setSelectedSale] = useState(null);
  const salesperpage = 10;
  // const [filteredSales, setFilteredSales] = useState([]); // Agregar estado para los resultados filtrados
  const sales = useSelector((state) => state.salesState.getAllSls);

  useEffect(() => {
    dispatch(getAllSales());
  }, [dispatch]);

  useEffect(() => {
    const app = document.getElementById("App");
    app && (app.style.display = "flex");
    return () => {
      app && (app.style.display = "block");
    };
  }, []);

  // Ordenar las ventas por fecha descendente
  const ventasOrdenadas = [...sales].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // Calcular índices para la paginación
  const lastsaleindex = currentPage * salesperpage;
  const indicePrimerUsuario = lastsaleindex - salesperpage;

  const ventasPaginadas = sales.slice(indicePrimerUsuario, lastsaleindex);

  const handlePageChange = (numeroPagina) => {
    setCurrentPage(numeroPagina);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(sales.length / salesperpage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para abrir el modal
  const handleOpenModal = (sale) => {
    setSelectedSale(sale);
    setModalOpen(true); // Agregar esta línea para abrir el modal
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setSelectedSale(null);
  };
  const numPaginasMostradas = 5;
  const calcularRangoPaginas = (paginaActual, totalPaginas) => {
    const rangoMitad = Math.floor(numPaginasMostradas / 2);
    let startPage = paginaActual - rangoMitad;
    let endPage = paginaActual + rangoMitad;

    if (startPage <= 0) {
      endPage -= startPage - 1;
      startPage = 1;
    }

    if (endPage > totalPaginas) {
      endPage = totalPaginas;
      if (endPage - numPaginasMostradas + 1 > 0) {
        startPage = endPage - numPaginasMostradas + 1;
      } else {
        startPage = 1;
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
  const searchSalesByUserName = (e) => {
    e.preventDefault();
    dispatch(searchSales(e.target.value));
  };
  return (
    <div className={styles.Container}>
      <section className={styles.FirstSection}>
        <h1 className={styles.title1}>Sales</h1>
        <div className={styles.SearchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search"
            onChange={searchSalesByUserName}
          />
        </div>
      </section>

      <div className={styles.SecondSection}>
        <section>
          <h1>Users</h1>

          {ventasPaginadas.map((sale, key) => (
            <article key={key} style={{ flexDirection: "row" }}>
              <img
                className={styles.userImage}
                src={sale.user?.image}
                alt="imagen del usuario"
              />
              <span>{sale.user?.user} </span>
            </article>
          ))}
        </section>

        <section>
          <h1>Order number</h1>
          {ventasPaginadas.map((sale, key) => (
            <article key={key}>
              <span>{sale.id.substring(1, 8)} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Date</h1>
          {ventasPaginadas.map((sale, key) => (
            <article key={key}>
              <span>{convertirFecha(sale.date)} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Total items</h1>
          {ventasPaginadas.map((sale, key) => (
            <article key={key}>
              <span>{sale.items.length} </span>
            </article>
          ))}
        </section>
        <section>
          <h1>Total price</h1>
          {ventasPaginadas.map((sale, key) => (
            <article key={key}>
              <span>${sale.amount} </span>
            </article>
          ))}
        </section>

        <section>
          <h1>Status</h1>
          {ventasPaginadas.map((sale, key) => (
            <article
              key={key}
              style={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{
                  display: "flex",
                  color: "#00D37B",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className={styles.crossIconAllow}
                />

                {sale.salesStatus}
                <span
                  onClick={() => handleOpenModal(sale)}
                  style={{
                    marginLeft: "15px",
                    padding: "4px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Purchase
                </span>
              </span>
            </article>
          ))}
        </section>
      </div>

      <div className={styles.ThirdSection}>
        {selectedSale && (
          <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
              <h2 className={styles.modalTitle}>Purchase Details</h2>
              <div className={styles.gameItemContainer}>
                <div className={styles.gameItemName}>
                  Order number: {selectedSale.id.substring(1, 8)}
                </div>

                <img
                  className={styles.gameItemImage}
                  src={selectedSale.user?.image}
                  alt="User"
                />
                <div className={styles.gameItemName}>
                  User: {selectedSale.user?.user}
                </div>
                <div className={styles.gameItemQuantity}>
                  Total Items: {selectedSale.items.length}
                </div>
                <div className={styles.gameItemPrice}>
                  Total Price: ${selectedSale.amount}
                </div>
                <div className={styles.saleValue}>
                  Status: {selectedSale.salesStatus}
                </div>

                <div className={styles.saleValue}>
                  Date: {convertirFecha(selectedSale.date)}
                </div>
              </div>
              <button className={styles.closeButton} onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        )}

        {!sales.length && (
          <div className={styles.NoFundMessage}>No sale(s) to display</div>
        )}

        <div className={styles.pagination}>
          <button onClick={goToPreviousPage}>&lt;</button>
          {calcularRangoPaginas(
            currentPage,
            Math.ceil(ventasOrdenadas.length / salesperpage)
          ).map((pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex)}
              className={currentPage === pageIndex ? styles.btnPaged : ""}
            >
              {pageIndex}
            </button>
          ))}
          <button onClick={goToNextPage}>&gt;</button>
        </div>
      </div>
    </div>
  );
}

export default Sales;
