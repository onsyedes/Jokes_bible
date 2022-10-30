import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import JokesService from "./jokes-service";
import {getLocalJokesList, setLocalJokesList, addDataToLocalJokesList } from '../../data/local_data.js'


const initialState={
    jokesList: [],
    jokesByCategory:[],
    jokeById:null,
    queryResult:[],
    categoriesList:[],
    isError :false,
    isSuccess: false,
    message :''
}

export const getJokes = createAsyncThunk(
    "jokes/getJokes",
    async (_, thunkAPI) => {
      try {
        if(getLocalJokesList()!==null){
          console.log("getting data from Local file")
          const results=await getLocalJokesList();
          return results;
        }else{
          console.log("getting data from api")
          const results= await JokesService.getJokes();
          results.forEach(joke => {
            joke.title=  joke.value.split(' ').slice(0, 3).join(' ');
            joke.likes=0
            joke.dislikes=0
            joke.label=null
          });
          setLocalJokesList(results);
          
          return results;
        }
      } catch (error) {
        let message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const filterJokes = createAsyncThunk(
    "jokes/filterJokes",
    async (queryTxt, thunkAPI) => {
      try {
       
        const queryResults=await JokesService.filterJokes(queryTxt);
        var jokesList= getLocalJokesList() ;  
        for(let i=0;i<queryResults.length;i++){
          
         
          var fetchedJoke = checkExist(jokesList,queryResults[i].id)
         
        if(fetchedJoke){
             queryResults[i]=fetchedJoke
             
             
        }else{
          
            queryResults[i].title=queryResults[i].value.split(' ').slice(0, 3).join(' ');
             
        }
         
        }
       
        return queryResults;
      } catch (error) {
        let message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const getJokeById = createAsyncThunk(
    "jokes/getJokeById",
    async (id, thunkAPI) => {
      try {
        
        return await JokesService.getJokeById(id);
      } catch (error) {
        let message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
export const getCategories = createAsyncThunk(
    "jokes/getCategories",
    async (_, thunkAPI) => {
      try {
        
        return await JokesService.getCategories();
      } catch (error) {
        let message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  );


  function checkExist(jokesList,id){
    
    jokesList.find(function(joke) {
      return joke.id=== id;
     });
  }




export const JokesSlice =createSlice({
    name: 'jokes',
    initialState,
    reducers :{
     
        reset: (state) => {
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
          },
        updateJokeLikes: (state,action) => {
         switch (action.payload.type) {
            case 'increment' : 
            
            state.jokeById={...state.jokeById, 'likes': state.jokeById.likes+1}
            break;
            case 'decrement':
             
              state.jokeById={...state.jokeById, 'likes': state.jokeById.likes-1}
              break;
              default : 
              
              state.jokeById={...state.jokeById}
            
            }
            
            
          },
          updateJokeDislikes: (state,action) => {
            switch (action.payload.type ) {
              case 'increment' : 
             
              state.jokeById={...state.jokeById, 'dislikes': state.jokeById.dislikes+1}
              break;
              case 'decrement':
               
               state.jokeById={...state.jokeById, 'dislikes': state.jokeById.dislikes-1}
               break;
               default : 
              
               state.jokeById={...state.jokeById}
             
            }
           
           
          },

      
        getJokesByCategory : (state,action)=>{
          if(action.payload.category.toLowerCase()=='uncategorized'){
            state.jokesByCategory = action.payload.jokesList.filter(joke => joke.categories.length==0);   
           

          }else{

            state.jokesByCategory = action.payload.jokesList.filter(joke => joke.categories.includes(action.payload.category));     
          }

        
         
        },
        resetQueryResults: (state) => {
         state.queryResult=[]
        },

    },
    extraReducers :(builder)=>{
        builder
        .addCase(getJokes.fulfilled, (state, action) => {
            state.isSuccess = true;
            state.isError=false;
            state.jokesList = action.payload
          })
        .addCase(getJokes.rejected, (state) => {
            state.isSuccess = false;
            state.isError=true;
            
          })
          builder
          .addCase(getCategories.fulfilled, (state, action) => {
              state.isSuccess = true;
              state.isError=false;
              state.categoriesList = action.payload.concat(['Uncategorized'])
            })
          .addCase(getCategories.rejected, (state) => {
              state.isSuccess = false;
              state.isError=true;
              
            })
          .addCase(filterJokes.fulfilled, (state, action) => {
              state.isSuccess = true;
              state.isError=false;
              state.queryResult = action.payload ;
            })
          .addCase(filterJokes.rejected, (state) => {
              state.isSuccess = false;
              state.isError=true;
              
            })
          .addCase(getJokeById.fulfilled, (state, action) => {
              state.isSuccess = true;
              state.isError=false;
              var jokesList=getLocalJokesList()
             
                var fetchedJoke =   jokesList.find(function(joke) {
                  return joke.id==action.payload.id;
                 });
                if(fetchedJoke){
                  state.jokeById=fetchedJoke
                    
              }else{
                
                var aux={...action.payload}
                aux.likes=0
                  aux.dislikes=0
                  aux.label=null
                  aux.title=action.payload.value.split(' ').slice(0, 3).join(' ');
                  state.jokeById=aux
                 addDataToLocalJokesList(aux)
                  
              }
               
              
             
            })
          .addCase(getJokeById.rejected, (state) => {
              state.isSuccess = false;
              state.isError=true;
              
            })
    }

});




export const { reset, getJokesByCategory ,resetQueryResults,updateJokeLikes , updateJokeDislikes} = JokesSlice.actions;
export default JokesSlice.reducer;
