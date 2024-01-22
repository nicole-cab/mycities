import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
// import "jquery";
// import "@popperjs/core";
// import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="app vw-100 vh-100 p-0 m-0 container">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
