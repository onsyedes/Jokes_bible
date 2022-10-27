import axios from "axios";
const BASE_URL = "https://api.chucknorris.io/jokes/";


// get all jokes
const getJokes = async () => {
    
    const response = await axios.get(BASE_URL + "search?query=all");
  
    return response.data.result;
  };
const getCategories = async () => {
    
    const response = await axios.get(BASE_URL + "categories");
  
    return response.data;
  };

  const filterJokes = async (queryTxt) => {
    const config = {
     
      params: { query: queryTxt },
    };
   
    const response = await axios.get(BASE_URL + "search",config);
  
    return response.data.result;
  };
  const getJokeById = async (id) => {
   
   
    const response = await axios.get(BASE_URL +''+id);
    return response.data;
  };

  const JokesService={
    getJokes,
    getCategories,
    filterJokes,
    getJokeById
  };
  export default JokesService;