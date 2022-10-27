import React from 'react'
import '../badge/badge-style.css'
const Badge = ({content, bgColor}) => {
    const style={
        backgroundColor: bgColor
    }
  return (
    <span className="badge" style={style}>{content}</span>
  )
}

export default Badge