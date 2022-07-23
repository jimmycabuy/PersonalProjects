import React from "react";

export default function ItempUpGrey(props) {
  return (
    <>
        <div className="item_up_grey">
          <img
            src={`/../../icons/${props.icon}`}
            alt={props.name}
            className="img_item_up"
          />
          <h5>{props.name}</h5>
        </div>
    </>
  );
}