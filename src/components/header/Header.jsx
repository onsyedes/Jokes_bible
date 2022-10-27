import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'
import { filterJokes ,resetQueryResults} from '../../features/jokes/jokes-slice'
import searchCopy from '../../assets/assets_Homework_Front-End_01/search-copy.png'
import light from '../../assets/assets_Homework_Front-End_02/green-light.png'
import './header-style.css'
const Header = () => {
  const [query,setQuery]=useState('');
  const [error,setError]=useState('');
   const dispatch=useDispatch();
  const navigate=useNavigate();
  const {queryResult} = useSelector((state)=>state.jokesSlice)
  


  const onFilterTyping=(e)=>{
  
    setQuery(e.target.value)
  }
  
  const handleKeyPress=(e)=>{
    if(e.key === 'Enter'){
      
      if(query.length>3){
        dispatch(filterJokes(query)).then((res)=>{
        
          if(res.payload.length==0){
           
            setError('No data available for this search')
            
          }else if(res.payload.length==1){
  
            setError('')
            navigate('/joke-stats/'+res.payload[0].id)
            
          }else{
            setError('')
  
          } 
        })
        
      }else{
        dispatch(resetQueryResults())
        setError('Query Length should be greater then 3 letters.')
      }
     
    }
  }

  const onResultCellSelect=(id)=>{
    
    navigate('/joke-stats/'+id)
  }

  return (
    <div className='header'>
        <div className='content'>
        <div className='title'> The Joke Bible</div>
        <div className='intro'>Daily Laughs for you and yours</div>
     



        <div className='dropdown'>
        
        <div className='link'>
        <div className="input-icon">
            <img src={searchCopy} className="iconX2" id='searchIcon'/>
            <input className="input-field" id='searchInput' type="text" placeholder='How can we make you laugh today? ' 
            onChange={onFilterTyping}
            onKeyPress={handleKeyPress}
            />
            
      
        </div>
        </div>
       
        <div className="dropdown-content" >
          {error.length>0 ? <div className='text-danger'>{error}</div> :null}
          
        { queryResult ?
        queryResult.map((res,index)=>(
              <div className='resultCell inline-flex' key={index} onClick={()=>onResultCellSelect(res.id)}>
            
              <div><img src={light}/></div>
              <div>
                <h5>{res.categories.length==0 ? 'uncategorized ': res.categories[0]} Jokes :  </h5>
                
                </div>
              <div><h5>{res.title}</h5></div>
            
             </div>
        )) : null}
        
        
         
         </div>
          
          
        
         
        </div>


       
        
        </div>
        
    </div>
  )
}

export default Header