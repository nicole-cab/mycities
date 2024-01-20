import styles from "./Content.module.css";
import Images from "./images/Images";
import CityData from "./city_data/CityData";

function Content({ data }) {
  return (
    <div id={styles.content} className="row row-cols-2 w-100 m-0 p-0">
      <div className="p-5">
        <Images />
      </div>
      <div className="p-5">
        <CityData data={data} />
      </div>
    </div>
  );
}
export default Content;
