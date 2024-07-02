import React from 'react'
const Category = (props) => {
  return (
    <div className='category'>
      <img src={props.img} />
      <h3>{props.name}</h3>
    </div>
  )
}

export default Category