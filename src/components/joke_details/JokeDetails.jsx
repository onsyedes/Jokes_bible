import React ,{useEffect} from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import {reducers} from "../../features/jokes/jokes-slice"
import Badge from '../badge/Badge.jsx'
import './jokeDetails-style.css'
import arrowLeft from '../../assets/assets_Homework_Front-End_02/arrow-left@2x.png'
import arrowRight from '../../assets/assets_Homework_Front-End_02/arrow-right@2x.png'
import { useParams } from 'react-router-dom';
import { getJokeById ,getJokes,updateJokeLikes , updateJokeDislikes} from '../../features/jokes/jokes-slice.js';
import ThumbBtn from '../button/thumb_buttons/ThumbBtn.jsx';
import IconButton from "../button/iconButton/IconButton.jsx"
import { useState } from 'react';
const JokeDetails = () => {

  const dispatch=useDispatch();
   
  const {id}= useParams();
  const {jokeById, categoriesList} =useSelector((state)=>state.jokesSlice)
  const { colors} =useSelector((state)=>state.global)
  const [color, setColor]=useState('')
  const [like, setLike]=useState(0)
  const [dislike, setDislike]=useState(0)
  useEffect(()=>{
    
    
        dispatch(getJokes())
        .then((res)=>{

          dispatch(getJokeById(id)).then((res)=>{
              
            if(res.payload.categories.length== 0){
              setColor(colors[8]) 
            }else{
              setColor(colors[categoriesList.indexOf(res.payload.categories[0])])
              
            }
              
            })
          })
        
    
  },[id])
  const onLikeAJoke=()=>{
         if(like==0){
          setLike(1)
    dispatch(updateJokeLikes({type : 'increment'}))
    document.getElementById('like').disabled =true
            if(dislike>0){
              setDislike(0)
      document.getElementById('dislike').disabled  =false
      dispatch(updateJokeDislikes({type : 'decrement'}))
              
            }
         }
       
       
      }
      const onDislikeAJoke=()=>{
        if(dislike==0){
          setDislike(1)
    dispatch(updateJokeDislikes({type : 'increment'}))
    document.getElementById('dislike').disabled =true
            if(like>0){
              setLike(0)
      document.getElementById('like').disabled  =false
      dispatch(updateJokeLikes({type : 'decrement'}))
              
            }
         }
       
  }

  return (
   jokeById? 
   <>
    
   <div className='flex'>
     <div className='rightArrow'><img  src={arrowLeft} /></div>
     
     <div className='rightArrow' ><img  src={arrowRight} /></div>
     
  </div>

  
  <div className="cardXL card-container">
  <div className='flex'>
      <div>
          {jokeById  ? 
             <Badge content={jokeById.categories.length==0 ? 'uncategorized Jokes': `${jokeById.categories[0]} Jokes` }
              bgColor={color}/>

          :null}
      </div>
      <div className='popularity-label' >
      <div className='dot'></div>
      <div >trending</div>
      </div>
  </div>
< div >
<div className='flex'>
  <div className='jokeTitle'>{jokeById? jokeById.title: null}</div>
  <div className='joke-range'>__________________ NO # 1</div>
  </div>

</div>
{jokeById.value}
</div>
<div className='flex inline'>
{/* like / dislike buttons */}
  
  <ThumbBtn likes={jokeById.likes} dislikes={jokeById.dislikes} onLike={onLikeAJoke} onDislike={onDislikeAJoke}/>
  {/* next Prev Buttons */}
   <div className='flex prev-next-btns' >
    <IconButton content={'previous'} />
    <IconButton content={'next'} />

   </div>
</div>
  

  
  </>
   : null
   
  )
}

export default JokeDetails