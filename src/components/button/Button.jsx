import React from 'react'
import './button-style.css'
const Button = ({bgcolor, content  ,  onClick }) => {

    const btnStyle = {
       
        backgroundColor: bgcolor,
        
    }
  return (
    <button style={btnStyle} className='btn' onClick={onClick} >
        {content}
    </button>
  )
}

export default Button