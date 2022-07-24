import React from "react";
import ItemSideBar from "./ItemSideBar";
import menu from "../menu.json";

export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <div className="div_usa_flag">
        <img src="../icons/usa.png" alt="usa" className="usa_flag" />
      </div>
      <h5 className="myorder">My order</h5>
      <p className="takeout">Take out</p>
      <div className="box_item_sidebar">
        {menu.map((item) => {
          if (item.ordered === true && item.quantity > 0) {
            return <ItemSideBar key={item.id} {...item} />;
          }
          return null;
        })}
      </div>
      <div className="total_sidebar">
        <hr />
        <p className="text_total">Total</p>
        <p className="price_total">$ 21.2</p>
        <button className="button_done">Done</button>
      </div>
    </div>
  );
}
