import styles from "./Navbar.module.css";
import navBrand from "../../assets/city.svg";

function Navbar() {
  return (
    <nav
      className={
        "bg-transparent w-100 d-flex justify-content-between align-items-center py-3 px-5"
      }
      id={styles.nav_custom}
    >
      <div
        className={"d-flex align-items-center gap-2"}
        id={styles.nav_brand_custom}
      >
        <img
          src={navBrand}
          alt="navbar brand"
          id={`${styles.nav_brand_icon_custom}`}
        />
        <span>MyCities</span>
      </div>

      <div id={styles.nav_items_custom}>
        <button className={styles.nav_item_custom}>Cities</button>
        <button className={styles.nav_item_custom} id={styles.btn_login}>
          Log In
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
