var jokesList= null


export const getLocalJokesList=()=>{
  return jokesList;
}

export const setLocalJokesList=(newData)=>{
  jokesList=newData;
}


export const addDataToLocalJokesList=(newData)=>{
  jokesList.concat([newData])
  
}
