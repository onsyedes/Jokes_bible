import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current_category : null,
    current_color : '#ff5b5b',
     colors:['#ff5b5b','#ff915b','#ffdf5b','#8fe360',
   '#57e690','#5cb161','#e896e9','#f0c0f1','#6694d9' ,'#e65b77','#ecec7a','#ff5b5b','#ff915b','#ffdf5b','#8fe360',
   '#57e690','#5cb161','#e896e9','#f0c0f1','#6694d9' ,'#e65b77','#ecec7a']
}

const global = createSlice({
    name: "global",
    initialState,
    reducers: {
      setCategory: (state, action) => {
        state.current_category = action.payload;
       
      },
      
      setColor: (state, action) => {
        state.current_color = action.payload;
       
      },
      
    },
  });

  export const {
    setCategory,
    setColor
  }= global.actions;

  export default global.reducer;