import { useState } from "react";
import "../../css/SearchBar.css";

function SearchBar({ stateChanger }) {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    stateChanger(cityName);
  };
  return (
    <div className="d-flex justify-content-center">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        ></input>
        <button className="btn search-btn reg-font-weight" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
