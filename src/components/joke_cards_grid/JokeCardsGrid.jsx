import React ,{useEffect,useState}from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector ,useDispatch} from 'react-redux';
import _ from "lodash";
import Badge from '../badge/Badge.jsx';
import JokeCard from "../joke_card/JokeCard.jsx"
import IconButton from '../button/iconButton/IconButton';

import {getJokes,getJokeById,getJokesByCategory} from '../../features/jokes/jokes-slice'
import './grid-style.css';

const JokeCardsGrid = () => {
 const dispatch=useDispatch();
 const navigate=useNavigate();
  const {current_color, current_category} =useSelector((state)=>state.global)
  const {jokesByCategory} =useSelector((state)=>state.jokesSlice)
   
  const pageSize = 8;
  const [paginatedJokes, setPaginatedJokes] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const pageCount = jokesByCategory ? Math.ceil(jokesByCategory.length / pageSize) : 0;
  

 
    useEffect(()=>{
      dispatch(getJokes())
      
        
        setPaginatedJokes(_(jokesByCategory).slice(0).take(pageSize).value())
        if(jokesByCategory.length==1){
          navigate('/joke-stats/'+jokesByCategory[0].id)
        }

      
    },[dispatch,current_category])
    const pagination = (pageNo) => {
      setcurrentPage(pageNo);
      const startIndex = (pageNo - 1) * pageSize;
      setPaginatedJokes(_(jokesByCategory).slice(startIndex).take(pageSize).value());
    };

    function onJokeClick(jokeid) {
      
      
      navigate('/joke-stats/'+jokeid)
    }

  return (
   <div>
    <div className='bar'>
       <Badge bgColor={current_color} content={`${current_category} Jokes`} />
    </div>
    <div className='cards-container'>
      {jokesByCategory.length >1 ? 
      <>
     { paginatedJokes.map((joke)=>(
          
        <JokeCard title={`${joke.title} ...`} content={joke.value} key={`${joke.id}`} 
        onBtnClick={()=>onJokeClick(joke.id)}/>  

       
          

      ))}
    <div className="see-more-btn">
    <div className="flex">
    <IconButton content={"Previous"}  onClick={() => pagination(currentPage - 1)} disabled={currentPage === 1}/> 
    <IconButton content={"Next"} onClick={() => pagination(currentPage + 1)} disabled={currentPage === pageCount} /> 
    <h5 className='pageNumber'>Page : {`${currentPage} / ${pageCount}`} </h5>

    </div>

    </div>
      </>
       : <h4> No Jokes Available for this Category !</h4>
    }
        


        

          
    
    </div>

    
   </div>
  )
}

export default JokeCardsGrid