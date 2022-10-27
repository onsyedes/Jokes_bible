import React from 'react'
import IconButton from '../button/iconButton/IconButton.jsx'
import './jokeCard-style.css';
import orangeLight from "../../assets/assets_Homework_Front-End_02/orange-light.png"
const JokeCard = ({content, title,onBtnClick}) => {



  return (
    <div className="card">
     
  <div className="card-container">
    <h4><img src={orangeLight} className="icon" /><b>{title}</b></h4> 
    <p>{content}</p> 


    <div className='seeStats'>
    <IconButton content={"See stats"}  border={'transparent'} onClick={onBtnClick}/>

    </div>
  </div>
</div>
  )
}

export default JokeCard