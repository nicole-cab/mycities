import styles from "./Search.module.css";
import searchIcon from "../../assets/search.svg";
import { useState } from "react";

function Search({ onDataFetched }) {
  const [cityName, setCityName] = useState("");

  const fetchCityData = async () => {
    if (cityName === "") {
      console.log("city name not provided");
      return;
    }

    // if city name provided fetch city data
    try {
      console.log("city name: ", cityName);
      const response = await fetch("/api/weather/" + cityName);
      const result = await response.json();
      // padd the city data to the parent component using the callback function from the parent
      console.log(result);
      onDataFetched(JSON.stringify(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div
      id={styles.search}
      className="d-flex justify-content-center align-items-center gap-5"
    >
      <div
        className={`${styles.input_container} d-flex justify-content-center align-items-center gap-2`}
      >
        <label htmlFor="cityName" className={styles.label}>
          City Name
        </label>
        <input
          type="search"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          name="cityName"
          id="cityName"
          className={styles.searchbar}
          placeholder="Please enter a city name"
        />
      </div>
      <div
        className={`${styles.input_container} d-flex justify-content-center align-items-center gap-2`}
      >
        <label htmlFor="countryCode" className={styles.label}>
          Country Code
        </label>
        <input
          type="search"
          name="countryCode"
          id="countryCode"
          className={styles.searchbar}
          placeholder="(optional)"
        />
      </div>
      <button
        type="submit"
        onClick={fetchCityData}
        className={`${styles.search_btn} btn btn-success d-flex justify-content-center align-items-center`}
      >
        <img src={searchIcon} alt="" className={styles.search_icon} />
      </button>
    </div>
  );
}

export default Search;
