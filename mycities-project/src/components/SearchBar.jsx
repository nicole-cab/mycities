import "../../css/SearchBar.css";

function SearchBar() {
  return (
    <div className="d-flex justify-content-center">
      <form className="d-flex" role="search">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        ></input>
        <button className="btn search-btn reg-font-weight" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
