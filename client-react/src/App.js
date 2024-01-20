import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/main/Main";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <div className="app vw-100 vh-100">
      <Navbar />
      <Main />
    </div>
  );
}

export default App;
