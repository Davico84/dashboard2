import { useState } from "react";
import styles from "./Metricstab.module.css";
import GraphSales from "./GraphSales/GraphSales";
import GBestSeller from "./BestSeller/GraphBestSeller";
import GraphSalesByGenre from "./BestGenre/GraphSalesByGenre"

function Tabs({ tabs, ArrayVentas,vGames }) {
  const [activeTab, setActiveTab] = useState(0);
  // console.log("array ventas", ArrayVentas)
  return (
    <div className={styles.main_container}>
      <div className={styles.tabs_container}>
        <div className={styles.tabs}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={activeTab === index ? styles.tab_active : styles.tab}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </div>
          ))}
        </div>
        <div className={styles.tab_content}>
          {tabs[activeTab].content}
          {activeTab === 0 && <GraphSales data={ArrayVentas} />}
          {activeTab === 1 && <GBestSeller data={ArrayVentas} />}
          {activeTab === 2 && <GraphSalesByGenre dataSales={ArrayVentas} dataVGames={vGames}/>}
        </div>
      </div>
    </div>
  );
}
export default Tabs;
