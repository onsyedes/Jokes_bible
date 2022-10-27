import React ,{useEffect} from 'react'
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import {setCategory ,setColor} from '../features/global';
import { getJokes ,getCategories} from '../features/jokes/jokes-slice';
import { Categories,JokeCardsGrid} from '../components';
const Home = () => {
  const dispatch= useDispatch();
  const navigte=useNavigate();
  // const {current_category, current_color}=useSelector((state)=>state.global);
 useEffect(()=>{
  // dispatch(getCategories()); 
         dispatch(getJokes());
         
 },[dispatch])
  return (
    <>
      
      <Categories/>
      <JokeCardsGrid/>
      
    </>
  )
}

export default Home