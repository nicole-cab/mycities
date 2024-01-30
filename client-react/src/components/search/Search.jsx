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
      setErrorMsg("Please provide a city name!");
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
    <div className="my-2" id={styles.search}>
      <div className="d-flex mt-2 px-md-5" id={styles.search_form}>
        <div className={`${styles.input_container} d-flex p-2`}>
          <p className="text-start p-0 m-0" id={styles.error_msg}>
            {errorMsg}
          </p>
          <label htmlFor="cityName" className={styles.label}>
            City Name
          </label>
          <input
            type="search"
            value={city.cityName}
            onChange={(e) => setCity({ ...city, cityName: e.target.value })}
            name="cityName"
            id="cityName"
            className={`${styles.searchbar} p-2 w-100 rounded-2`}
            placeholder="Please enter a city name"
          />
        </div>

        <div className={`${styles.input_container} d-flex p-2`}>
          <label htmlFor="countryCode" className={styles.label}>
            Country Code
          </label>
          <input
            type="search"
            value={city.countryCode}
            onChange={(e) => setCity({ ...city, countryCode: e.target.value })}
            name="countryCode"
            id="countryCode"
            className={`${styles.searchbar} p-2 w-100 rounded-2`}
            placeholder="(optional)"
          />
        </div>
        <div
          className="d-flex justify-content-end p-2"
          id={styles.search_btn_container}
        >
          <button
            type="submit"
            onClick={fetchCityData}
            id={styles.search_btn}
            className="btn btn-primary p-2 rounded-2 d-flex justify-content-center align-items-center gap-1"
          >
            <img src={searchIcon} alt="search icon" id={styles.search_icon} />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
