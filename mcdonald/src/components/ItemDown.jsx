import React from 'react'

export default function ItemDown(props) {
  return (
    <>
        <div className="item_down">
          <img
            src={`/../../icons/${props.icon}`}
            alt={props.name}
            className="img_item_up"
          />
          <h5>{props.name}</h5>
          <p className='price'>$ {props.price}</p>
        </div>
    </>
  )
}
