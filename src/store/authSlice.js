import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{

            state.status=true;
            //console.log("am inside stor ", state.status)
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
            state.status=false
            state.userData=null
        }
    }
});

export const {login,logout}=authSlice.actions;

export default authSlice.reducer; 