import React from "react";

export default function ItemSideBar(props) {
  return (
    <div className="item_sidebar">
        <hr />
      <img
        src={`/../../icons/${props.icon}`}
        alt={props.name}
        className="img_item_sidebar"
      />
      <p className="text_sidebar_item">{props.name}</p>
      <p className="text_sidebar_item">$ {props.price}</p>
      <div className="div_quantity">
        <button className="button_min">-</button>
        <p>{props.quantity}</p>
        <button className="button_max">+</button>
      </div>
    </div>
  );
}
