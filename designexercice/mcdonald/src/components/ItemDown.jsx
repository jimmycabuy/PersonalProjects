import React from 'react'

export default function ItemDown(props) {
  return (
    <>
        <div className="item_down">
          <img
            src={`/../../icons/${props.icon}`}
            alt={props.name}
            className="img_item_down"
          />
          <h5 className='text_item_down'>{props.name}</h5>
          <p className='price_item_down'>$ {props.price}</p>
        </div>
    </>
  )
}
