import {configureStore} from '@reduxjs/toolkit';
import IsAuthenticatedReducer from './counterSlice';
export const store = configureStore({
    reducer: {
        IsAuthenticated: IsAuthenticatedReducer
    },
});