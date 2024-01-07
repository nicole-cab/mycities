import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";

function App() {
  const [cityInfo, setCityInfo] = useState({});

  const submit = (cityName) => {
    console.log("submitted! " + cityName);

    let formData = new FormData();
    formData.append("cityName", cityName);

    fetch("/city", {
      body: formData,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data["success"] == "true") {
          setCityInfo({ ...cityInfo, lat: data["lat"], lon: data["lon"] });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="app">
      <Navbar />
      <div className="p-5">
        <h1 className="text-center mb-4">My Cities Project</h1>
        <SearchBar stateChanger={submit} />
        {/* <Content /> */}
        <p>{JSON.stringify(cityInfo)}</p>
      </div>
    </div>
  );
}

export default App;
