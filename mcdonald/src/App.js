import "./App.css";
import menu from "./menu.json";
import ItemUp from "./components/ItemUp";
import ItempUpGrey from "./components/ItemUpGrey";
import ItemDown from "./components/ItemDown";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="app">
      <div className="div_logo">
        <img src="../icons/logo.png" alt="logo" className="logo" />
        <img src="../icons/usa.png" alt="usa" className="usa_flag" />
      </div>
      <Sidebar/>
      <h3 className="hey_whatsup">
        <span className="hey">Hey,</span>
        <br /> what's up?{" "}
      </h3>
      <div className="box_item_up">
        {menu.map((item) => {
          if (item.cat === "menu") {
            if (item.promo != null) {
              return <ItemUp key={item.id} {...item} />;
            } else {
              return <ItempUpGrey key={item.id} {...item} />;
            }
          }
          return null;
        })}
      </div>
      <h3 className="popular">Popular</h3>
      <div className="box_item_down">
        {menu.map((item) => {
          if (item.cat === "product") {
            return <ItemDown key={item.id} {...item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
