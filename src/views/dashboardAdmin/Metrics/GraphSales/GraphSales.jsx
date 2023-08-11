import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import styles from "./GraphSales.module.css";
import loadingImage from "../../../../assets/countDownd.gif";
import Loading2 from "../../../../components/Helpers/Loading2";

const SalesByDateChart = ({ data }) => {
  const [initialFilteredData, setInitialFilteredData] = useState([]);
  const [startDate, setStartDate] = useState("2023-01-01");
  const [errorInput, setErrorInput] = useState(null);
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia el estado a falso después de un tiempo
    }, 2000); // Tiempo en milisegundos
  }, []);

  useEffect(() => {
    // Agrupar las ventas por fecha y sumar las ventas en la misma fecha
    const groupedSales = {};

    data.forEach((item) => {
      const date = item.date.substring(0, 10); // Obtener solo la fecha (sin hora)
      if (groupedSales[date]) {
        groupedSales[date] += parseFloat(item.amount);
      } else {
        groupedSales[date] = parseFloat(item.amount);
      }
    });

    // Crear un arreglo con los datos en el formato requerido por Recharts
    const formattedData = Object.keys(groupedSales).map((date) => ({
      date: date.substring(0, 10),
      sales: groupedSales[date],
    }));

    setInitialFilteredData(formattedData); // Almacenar los datos iniciales
    setFilteredData(formattedData); // Actualizar la data filtrada al iniciar
  }, [data]);

  const handleFilterClick = () => {
    setErrorInput(null); // Reiniciar el error antes de la validación
    // Filtrar la data según las fechas seleccionadas
    const formattedStartDate = startDate
      ? new Date(startDate).toISOString().substring(0, 10)
      : null;
    const formattedEndDate = endDate
      ? new Date(endDate).toISOString().substring(0, 10)
      : null;

    const filtered = data.filter((item) => {
      const itemDate = item.date.substring(0, 10);
      return (
        (!formattedStartDate || itemDate >= formattedStartDate) &&
        (!formattedEndDate || itemDate <= formattedEndDate)
      );
    });

    if (
      formattedStartDate &&
      formattedEndDate &&
      formattedStartDate > formattedEndDate
    ) {
      // Mostrar un mensaje de error o realizar alguna acción
      // console.log("se setteo error??");
      setErrorInput("Start date cannot be greater than end date");
      setStartDate(new Date().toISOString().substring(0, 10));
      return; // Detener la ejecución si las fechas son inválidas
    }

    const groupedSales = {};

    filtered.forEach((item) => {
      const date = item.date.substring(0, 10);
      if (groupedSales[date]) {
        groupedSales[date] += parseFloat(item.amount);
      } else {
        groupedSales[date] = parseFloat(item.amount);
      }
    });

    const formattedFilteredData = Object.keys(groupedSales).map((date) => ({
      date: date.substring(0, 10),
      sales: groupedSales[date],
    }));

    setFilteredData(formattedFilteredData); // Actualizar la data filtrada
  };

  const clearFilters = () => {
    setStartDate("2023-01-01");
    setEndDate(new Date().toISOString().substring(0, 10));
    setErrorInput(null);
    setFilteredData(initialFilteredData); // Restaurar datos iniciales
  };

  return (
    <div className={styles.myContainer}>
      <div className={styles.inputs_Filtro}>
        <div className={styles.input}>
          <label htmlFor="startDate"> Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className={styles.input}>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
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
          <Loading2/>
        </div>
      ) : (
        <div className={styles.chartContainer}>
      {filteredData.length === 0 ? (
        <span className={styles.errorMessage}>No results found.</span>
      ) : (
        <BarChart
          width={700}
          height={400}
          data={filteredData}
          layout="horizontal"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            angle={-90}
            textAnchor="end"
            tick={{ fill: "#280657", fontSize: 12 }}
            height={90}
            label={{
              value: "Date",
              angle: 0,
              position: "insideBottom",
              offset: -0,
              style: {
                fill: "#3F13A4",
                fontWeight: "bold",
                whiteSpace: "pre",
              },
            }}
          />

          <YAxis
            domain={["auto", "auto"]}
            label={{
              value: "Amount sold per day",
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
            tick={{ fill: "#280657", fontSize: "12" }}
            tickFormatter={(value) => `$${value}`}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "#fff",
            }}
            labelStyle={{ fontWeight: "bold" }}
            formatter={(value, name) => `$${value} `}
            cursor={{ fill: "rgba(0, 0, 0, 0.2)" }}
          />

          <Bar
            dataKey="sales"
            fill="#987BDC"
            label={{
              position: "top",
              fill: "#280657",
              formatter: (value) => `$${value}`,
              fontSize: 11,
            }}
          />
        </BarChart>
      )}
      </div>
      )}
    </div>
  );
};

export default SalesByDateChart;
