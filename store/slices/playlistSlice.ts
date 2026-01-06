import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {PlayerState} from "./playerSlice"

export type PlayList = PlayerState[];

export const initialState:PlayList =[
    {
        trackName:null,
        trackUrl:null,
        isPlaying:false,
    }
];

export const playListSlice=createSlice({
    name:"playList",
    initialState,
    reducers:{
        addInList(state,action:PayloadAction<PlayerState>){
            state.push({
                trackName:action.payload?.trackName || null,
                trackUrl:action.payload?.trackUrl ||null,
                isPlaying:action.payload?.isPlaying||false
            })
        }
    }

})

export const {addInList}=playListSlice.actions;
export default playListSlice.reducer;



