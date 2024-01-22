import styles from "./Navbar.module.css";
import navBrand from "../../assets/city.svg";

function NavbarBootstrap() {
  return (
    <nav className="navbar navbar-expand-sm bg-white m-0 p-2">
      <div className="container-fluid">
        <div
          className={"navbar-brand d-flex align-items-center gap-2"}
          id={styles.nav_brand_custom}
        >
          <img
            src={navBrand}
            alt="navbar brand"
            id={`${styles.nav_brand_icon_custom}`}
          />
          <span>MyCities</span>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggler"
          aria-controls="navbarToggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse mt-3 mt-sm-0"
          id="navbarToggler"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-sm-0 gap-2">
            <li className="nav-item d-flex align-items-center">
              <button className={styles.nav_item_custom}>Cities</button>
            </li>
            <li className="nav-item d-flex align-items-center">
              <button className={styles.nav_item_custom} id={styles.btn_login}>
                Log In
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarBootstrap;
