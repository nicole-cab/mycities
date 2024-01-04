import "../../css/Navbar.css";

function Navbar() {
  return (
    <div className="navbar-custom w-100 d-flex bold-font-weight px-5">
      <div className="nav-brand-custom">My Cities</div>
      <div className="nav-items d-flex">
        <div>Saved Cities</div>
        <button className="btn btn-dark ">Log out</button>
      </div>
    </div>
  );
}
export default Navbar;
