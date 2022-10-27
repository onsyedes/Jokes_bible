import React, { useEffect ,useState} from 'react'
import { getCategories, getJokesByCategory} from '../../features/jokes/jokes-slice';
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import  Button  from '../button/Button'
import  IconButton  from '../button/iconButton/IconButton'
import './categories-style.css'
import { setCategory, setColor } from '../../features/global';
const Categories = () => {
  
   
  const {categoriesList,jokesList}=useSelector((state)=>state.jokesSlice);
  const {colors}=useSelector((state)=>state.global);
  const dispatch =useDispatch();
  const [paginatedCategories, setPaginatedCategories] = useState([]);
  const [pageSize, setPageSize] = useState(14);
  const [viewLess, setViewLess] = useState(false);

 


   useEffect(()=>{
     dispatch(getCategories()).then((res)=>{
       if(res.payload.length >0){
         setPaginatedCategories(_(res.payload).slice(0).take(7).value());
         
         dispatch(setCategory(res.payload[0]))
         dispatch(setColor(colors[0]))
         dispatch(getJokesByCategory({'category' : res.payload[0], 'jokesList': jokesList}))

         
        }else{
          setPaginatedCategories(null)
        }
      })
      

    
   },[dispatch])
   
   const handleCategoriesViewMore=()=>{
    
    setPaginatedCategories( _(categoriesList).slice(0).take(pageSize).value());

    if(  pageSize+7 >= categoriesList.length ){
      
      setPageSize(categoriesList.length +1)  
    }
    else{
     setPageSize(pageSize+7) 
    }
    if(pageSize>=categoriesList.length){
      setViewLess(true)
    }
    
   

   }

   const handleCategoriesViewLess=()=>{
     setPaginatedCategories( _(categoriesList).slice(0).take(7).value());
     setPageSize(14)
     setViewLess(false);
    
   }
  function onCategorySelect(color,category){
    dispatch(setCategory(category))
    dispatch(setColor(color))
    dispatch(getJokesByCategory({'category' : category, 'jokesList': jokesList}))
    
  }


  return (
    <div className='categories-display'>
     
      {paginatedCategories.map((category, index) => (
      
       
        <Button 
        onClick={()=>onCategorySelect(colors[index] , category)}
        bgcolor={colors[index]} content={`${category} jokes`} key={`${category}${index}`} />  
      
       
     ))}
      
     { viewLess ?
        <IconButton content={'See Less'} onClick={handleCategoriesViewLess}/> : 
        <IconButton content={'See More'} onClick={handleCategoriesViewMore}/> }
      
    </div>
  )
}

export default Categories