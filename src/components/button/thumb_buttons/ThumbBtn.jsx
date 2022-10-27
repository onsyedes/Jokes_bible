import React from 'react'
import likeIcon from '../../../assets/assets_Homework_Front-End_02/hand.png'
import dislikeIcon from '../../../assets/assets_Homework_Front-End_02/hand-copy.png'

const ThumbBtn = ({onLike, onDislike,likes,dislikes}) => {
  return (
    <div className='flex' >
      <div>

    <button className='thumb-btn like-btn' onClick={onLike}><img  src={likeIcon} /></button>

    <h6 className='text-success pl-1 ' >{likes}</h6>
      </div>
   
    <div >

    <button className='thumb-btn dislike-btn' onClick={onDislike}><img  src={dislikeIcon} /></button>
    <h6 className='text-danger pl-3 '>{dislikes}</h6>
    </div>
   
   </div>
  )
}

export default ThumbBtn