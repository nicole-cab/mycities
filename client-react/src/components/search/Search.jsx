import styles from "./Search.module.css";
import searchIcon from "../../assets/search.svg";
import { useState } from "react";

function Search({ onDataFetched }) {
  const [city, setCity] = useState({ cityName: "", countryCode: "" });
  const [errorMsg, setErrorMsg] = useState("");

  const fetchCityData = async () => {
    // if city name not provided
    if (city.cityName === "") {
      console.log("city name not provided");
      setErrorMsg("Please provide a city name");
      return;
    } else {
      setErrorMsg(""); // remove error msg
    }

    // send the countryCode if it is provided
    let urlParams = { cityName: city.cityName };
    if (city.countryCode !== "") {
      urlParams = { ...urlParams, countryCode: city.countryCode };
    }

    console.log("city: ", city);
    console.log("url params: ", new URLSearchParams(urlParams));

    // if city name provided fetch city data
    try {
      // fetch the weather api
      const response = await fetch(
        "/api/weather/?" + new URLSearchParams(urlParams)
      );

      const result = await response.json();
      // padd the city data to the parent component using the callback function from the parent
      console.log(result);
      onDataFetched(JSON.stringify(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div id={styles.search}>
      <div className="d-flex flex-wrap justify-content-center align-items-center gap-5">
        <div
          className={`${styles.input_container} d-flex justify-content-center align-items-center gap-2`}
        >
          <label htmlFor="cityName" className={styles.label}>
            City Name
          </label>
          <input
            type="search"
            value={city.cityName}
            onChange={(e) => setCity({ ...city, cityName: e.target.value })}
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
            value={city.countryCode}
            onChange={(e) => setCity({ ...city, countryCode: e.target.value })}
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
      <p className={`${styles.error_msg} text-danger`}>{errorMsg}</p>
    </div>
  );
}

export default Search;
