import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const showAudioInputSlice = createSlice({
    name: "audioInput",
    initialState,
    reducers: {
        setShowAudioInput(state, action: PayloadAction<boolean>) {
            return action.payload;
        }
    }
});

export const { setShowAudioInput } = showAudioInputSlice.actions;
export default showAudioInputSlice.reducer;
