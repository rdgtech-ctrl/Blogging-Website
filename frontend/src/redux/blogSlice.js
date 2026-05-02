import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name:"blog",
    initialState:{
        // This is the global state - that holds loading and user for the entire app.This is the global box
        loading:false,
        blog:null // stores all blogs globally
    },
    reducers:{
        //actions
        setLoading:(state,action) => {
            state.loading = action.payload;
        },
        setBlog:(state,action) => {
            state.blog = action.payload;
            // action.payload is the data you pass when you call dispatch
            // action.payload:  receives [..blog,res.data.blog]
        },
        // these are the functions to update the authSlice . you can't directly change the box (authSlice) you have to use these functions.below setLoading and setUser
        // This exports those functions so you can use them anywhere in your app.

    }
})

export const {setLoading,setBlog} = blogSlice.actions;
// This line exports the action functions from your blogSlice so you can use them anywhere in your app
export default blogSlice.reducer;