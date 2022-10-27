import React from 'react'
import './iconBtn-style.css'
const IconButton = ({icon , content , border ,onClick , disabled}) => {
    const btnStyle = {
        border : `1px solid ${border}`
    }
  return (
    <button style={btnStyle} className='iconBtn' onClick={onClick} disabled={disabled}>
        {content}
      
    
    </button>
  )
}

export default IconButton