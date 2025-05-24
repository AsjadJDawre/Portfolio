import { createSlice } from "@reduxjs/toolkit";

const IsAuthenticatedSlice = createSlice({
    name: 'IsAuthenticated',
    initialState: {user: null,value: false},
    reducers: {
        setIsAuthenticated: (state, action) => {
            state.user = action.payload.user;
            state.value = action.payload.value;
        }
    }
})

export const { setIsAuthenticated } = IsAuthenticatedSlice.actions;
export default IsAuthenticatedSlice.reducer