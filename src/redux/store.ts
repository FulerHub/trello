import {combineReducers,configureStore} from "@reduxjs/toolkit";
import cardsSlice from "./slices/cards/cardsSlice";


const rootReducer = combineReducers({
    cards: cardsSlice,
});

export const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch