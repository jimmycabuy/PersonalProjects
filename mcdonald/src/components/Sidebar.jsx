import React from "react";
import ItemSideBar from "./ItemSideBar";
import menu from "../menu.json";

export default function Sidebar() {
  return (
    <div className="sidebar_container">
      <h5>
        My <br /> Order
      </h5>
      <p className="takeout">Take out</p>
      <div className="box_item_sidebar">
        {menu.map((item) => {
          if (item.ordered === true) {
            return <ItemSideBar key={item.id} {...item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}
