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
          <h5>{props.name}</h5>
          <p className="promo_item">{props.promo}</p>
        </div>
    </>
  );
}
