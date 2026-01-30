import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: boolean = false;

export const showCustomiseSlice = createSlice({
    name: "customiseTheme",
    initialState,
    reducers: {
        setShowCustomise(state, action: PayloadAction<boolean>) {
            return action.payload;
        }
    }
});

export const { setShowCustomise } = showCustomiseSlice.actions;
export default showCustomiseSlice.reducer;