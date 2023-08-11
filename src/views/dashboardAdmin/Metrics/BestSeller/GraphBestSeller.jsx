import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styles from "./GraphBestSeller.module.css";
import loadingImage from "../../../../assets/countDownd.gif";

const TopGamesChart = ({ data }) => {
  const [initialFilteredData, setInitialFilteredData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [errorInput, setErrorInput] = useState(null);
  const [qtystart, setQtystart] = useState(""); // Inicializa con una cadena vacía
  const [qtyend, setQtyend] = useState(""); // Inicializa con una cadena vacía

  const [gameSalesCounts, setGameSalesCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia el estado a falso después de un tiempo
    }, 2000); // Tiempo en milisegundos
  }, []);
  useEffect(() => {
    // Crear un objeto para contar las ventas de cada juego
    const counts = {};

    // Recorrer el arreglo de ventas y contar las ventas de cada juego
    data.forEach((sale) => {
      sale.items.forEach((item) => {
        const gameName = item.videogameName;
        if (counts[gameName]) {
          counts[gameName]++;
        } else {
          counts[gameName] = 1;
        }
      });
    });

    setGameSalesCounts(counts); // Actualizar gameSalesCounts en el estado

    // Crear un arreglo con los datos en el formato requerido por Recharts
    const formattedData = Object.keys(counts).map((gameName) => ({
      name: gameName,
      sales: counts[gameName],
    }));

    setInitialFilteredData(formattedData); // Almacenar los datos iniciales

    // Filtrar los juegos con más de 6 ventas iniciales
    const filteredInitialData = formattedData.filter((game) => game.sales >= 6);

    setFilteredData(filteredInitialData); // Actualizar la data filtrada al iniciar
  }, [data]);

  const handleFilterClick = () => {
    setErrorInput(null); // Reiniciar el error antes de la validación

    // Convertir los valores a números enteros
    const minQty = parseInt(qtystart);
    const maxQty = parseInt(qtyend);

    if (isNaN(minQty) || isNaN(maxQty)) {
      setErrorInput("Please enter valid quantity values.");
      return;
    }

    // Validar si la cantidad mínima es mayor que la cantidad máxima
    if (minQty > maxQty) {
      setErrorInput("Min quantity cannot be greater than max quantity.");
      return;
    }

    // Filtrar los datos según el rango de cantidades
    const filtered = initialFilteredData.filter((game) => {
      const gameQty = gameSalesCounts[game.name] || 0;
      return gameQty >= minQty && gameQty <= maxQty;
    });

    setFilteredData(filtered);
  };

  const clearFilters = () => {
    setErrorInput(null);
    setQtystart("");
    setQtyend("");
    setFilteredData(initialFilteredData); // Restaurar datos iniciales
  };

  return (
    <div className={styles.myContainer}>
      <div className={styles.inputs_Filtro}>
        <div className={styles.input}>
          <label>Amount Range:</label>
          <div className={styles.inputRange}>
            <input
              type="number"
              id="minqty"
              value={qtystart}
              onChange={(e) => setQtystart(e.target.value)}
              placeholder="Min"
            />
            <span className={styles.inputRangeSeparator}>-</span>
            <input
              type="number"
              id="maxqty"
              value={qtyend}
              onChange={(e) => setQtyend(e.target.value)}
              placeholder="Max"
            />
          </div>
        </div>

        <button className={styles.myButton} onClick={handleFilterClick}>
          Apply Filter
        </button>
        <button className={styles.clearButton} onClick={clearFilters}>
          Clear Filter
        </button>
      </div>

      <div>
        {errorInput && (
          <span className={styles.errorMessage}>{errorInput}</span>
        )}
      </div>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <img src={loadingImage} alt="Loading..." />
        </div>
      ) : (
        <div className={styles.chartContainer}>
          <BarChart width={700} height={400} data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-90}
              textAnchor="end" // Alinea el contenido hacia la derecha
              interval={0}
              fontSize={9}
              tick={{ fill: "#280657" }}
              height={175}
              tickFormatter={(value) => value.substring(0, 25)} // Mostrar los primeros 12 caracteres
              dx={-5} // Ajusta la posición horizontal del contenido
              label={{
                value: "Title",
                angle: 0,
                position: "insideBottom", // Cambia la posición a "insideBottom"
                offset: 20, // Aplica un offset negativo para mover las etiquetas hacia arriba
                style: {
                  fill: "#3F13A4",
                  fontWeight: "bold",
                  whiteSpace: "pre",
                },
              }}
            />
            <YAxis
              domain={["auto", "auto"]} // Ajusta el rango del eje Y automáticamente
              label={{
                value: "Amount sold ",
                angle: -90,
                position: "outside",
                dy: 0,
                dx: -30,
                style: {
                  fill: "#3F13A4",
                  fontWeight: "bold",
                  whiteSpace: "pre",
                },
              }}
              tick={{ fill: "#280657" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
              }} // Estilos del tooltip
              labelStyle={{ fontWeight: "bold" }} // Estilos de la etiqueta del tooltip
              formatter={(value, name) => `#${value} `} // Formato del contenido del tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.2)" }} // Cursor personalizado
            />
            {/* <Legend /> */}

            <Bar
              dataKey="sales"
              fill="#987BDC"
              label={{
                position: "top",
                fill: "#280657",
                fontSize: "11",
                fontWeight: "bold",
              }}
            />
          </BarChart>
        </div>
      )}
    </div>
  );
};

export default TopGamesChart;
