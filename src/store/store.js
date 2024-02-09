import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from './countriesSlice'
import favouritesReducer from './favouritesSlice'
//start with empty object in reducer
//in app.jsx do provider
export default configureStore({
    reducer: {
        countries: countriesReducer,
        favourites: favouritesReducer,
    },
});

