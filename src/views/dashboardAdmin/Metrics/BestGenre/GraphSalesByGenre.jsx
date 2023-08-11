import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";
import styles from "./GraphSalesByGenre.module.css";
import loadingImage from "../../../../assets/countDownd.gif"
import Loading2 from "../../../../components/Helpers/Loading2";
const SalesByGenreChart = ({ dataSales, dataVGames }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula la carga de datos
    setTimeout(() => {
      setIsLoading(false); // Cambia el estado a falso después de un tiempo
    }, 2000); // Tiempo en milisegundos
  }, []);

  // Procesar los datos para calcular las ventas totales por género
  const genreSales = {};

  dataSales.forEach((sale) => {
    sale.items.forEach((item) => {
      const gameDetails = dataVGames.find(
        (game) => game.id === item.videogameId
      );
      if (gameDetails) {
        gameDetails.genre.forEach((genre) => {
          if (genreSales[genre]) {
            genreSales[genre] += parseInt(item.quantity);
          } else {
            genreSales[genre] = parseInt(item.quantity);
          }
        });
      }
    });
  });

  // Preparar los datos para el gráfico
  const dataForChart = Object.keys(genreSales).map((genre) => ({
    name: genre,
    value: genreSales[genre],
  }));

  const uniqueGenres = [...new Set(dataVGames.flatMap((game) => game.genre))];

  const initialSelectedGenres = [...new Set(dataVGames.flatMap((game) => game.genre))];
  const [selectedGenres, setSelectedGenres] = useState(initialSelectedGenres);
  const [selectAll, setSelectAll] = useState(true);

  const handleGenreCheckboxChange = (event) => {
    const genre = event.target.value;
    if (genre === "all") {
      if (selectAll) {
        setSelectedGenres([]);
      } else {
        setSelectedGenres([...uniqueGenres]);
      }
      setSelectAll(!selectAll);
    } else {
      const updatedSelectedGenres = selectedGenres.includes(genre)
        ? selectedGenres.filter((selectedGenre) => selectedGenre !== genre)
        : [...selectedGenres, genre];
      setSelectedGenres(updatedSelectedGenres);
      setSelectAll(false);
    }
  };

  const filteredDataForChart = dataForChart.filter((entry) =>
    selectedGenres.includes(entry.name)
  );

  // Colores para las secciones de la torta
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff8042",
    "#d64045",
    "#060045",
    "#069040",
    "#FF8800",
    "#622EDA",
    "#3F13A4",
  ];

  return (
    <div className={styles.myContainer}>
       {isLoading ? (
        <div className={styles.loadingContainer}>
          <Loading2/>
        </div>
      ) : (
      <div className={styles.chartContainer}>
        <PieChart width={600} height={300}>
          <Pie
            dataKey="value"
            data={filteredDataForChart}
            outerRadius={120}
            fill="#8884d8"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(2)}%`
            }
          >
            {filteredDataForChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
      )}

      <div className={styles.genreCheckboxes}>
        <label className={styles.genreCheckbox}>
          <input
            type="checkbox"
            value="all"
            checked={selectAll}
            onChange={handleGenreCheckboxChange}
          />
          <span style={{ color: "#060045" }}>Select All</span>
        </label>
        {uniqueGenres.map((genre) => (
          <label key={genre} className={styles.genreCheckbox}>
            <input
              type="checkbox"
              value={genre}
              checked={selectedGenres.includes(genre)}
              onChange={handleGenreCheckboxChange}
            />
            {genre}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SalesByGenreChart;
