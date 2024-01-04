import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";

function App() {
  const [data, setData] = useState(null);
  const hello = () => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  };
  return (
    <div className="app">
      <Navbar />
      <div className="p-5">
        <h1 className="text-center mb-4">My Cities Project</h1>
        {/* <div>
          <span>This is some test data </span>
          <button onClick={hello}>Get data</button>
          <p>{data}</p>
        </div> */}
        <SearchBar />
        {/* <Content /> */}
      </div>
    </div>
  );
}

export default App;
