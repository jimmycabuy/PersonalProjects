import React from "react";

export default function ItemUp(props) {
  return (
    <>
      <div className="item_up">
        <img
          src={`/../../icons/${props.icon}`}
          alt={props.name}
          className="img_item_up"
        />
        <h5 className="text_item_up">{props.name}</h5>
        <p className="promo_item_up">{props.promo}</p>
      </div>
    </>
  );
}
