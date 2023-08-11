import styles from "./Metrics.module.css"; // Importa los estilos del archivo CSS
import Tabs from "./Metricstab";
import { getAllSales2 } from "../../../redux/salesActions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getvideoGames } from "../../../redux/videogamesActions";

function Metrics() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSales2());
    dispatch(getvideoGames());
  }, []);

  const ArrayVentas = useSelector((state) => state.salesState.getAllSls2);
  const ArrayVgames = useSelector((state) => state.videoGamesState.videoGames);
  const tabs = [
    { title: "Sales by date", content: <p>Sales Chart by Date</p> },
    { title: "Best Seller", content: <p>Top Selling Video Game Graph</p> },
    { title: "Top Selling Genre", content: <p>Best Selling Genre Chart</p> },
  ];
  return (
    <div className={styles["metrics-container"]}>
      <Tabs tabs={tabs} ArrayVentas={ArrayVentas} vGames={ArrayVgames}/>
    </div>
  );
}

export default Metrics;
