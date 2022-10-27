import React from 'react'
import './footer-style.css'
import pathImg from '../../assets/assets_Homework_Front-End_02/path-copy-3.png'
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-content'>
   
          <h3>got jokes? get paid <br></br>for submitting!</h3>

       
          <a className='submit-link'>Submit joke <img src={pathImg}/></a>
      </div>
    </div>
  )
}

export default Footer