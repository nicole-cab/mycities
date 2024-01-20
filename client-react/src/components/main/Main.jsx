import styles from "./Main.module.css";
import Search from "../search/Search";
import Content from "../content/Content";

import { useState } from "react";

function Main() {
  const [fetchedData, setFetchedData] = useState([]);

  // Callback function to receive data from the Search component
  const handleDataFetched = (data) => {
    setFetchedData(data);
  };
  return (
    <main className="bg-transparent">
      <h1 className={`${styles.heading} text-center`}>
        Learn more about a city!
      </h1>
      {/* fetch the city data */}
      <Search onDataFetched={handleDataFetched} />
      {/* send the city data to display */}
      <Content data={fetchedData} />
    </main>
  );
}

export default Main;
