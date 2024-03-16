import { createSlice } from "@reduxjs/toolkit";
import { addUserFavourite, deleteUserFavourite } from "../auth/firebase";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        getFavourites(state, action) {
            state.favourites = action.payload;
        },
        /* addFavourite(state, action) {
            if (state.favourites.some((favourite) => favourite.name.common === action.payload.name.common))
                return;
            state.favourites = [...state.favourites, action.payload];
            console.log(state.favourites);
        }, */
        addFavourite(state, action) {
            if (state.favourites.some((favourite) => favourite === action.payload))
                return;
            state.favourites = [...state.favourites, action.payload];
            addUserFavourite(action.payload);

        },
        clearFavourites(state, action) {
            state.favourites = [];
        },
        removeOneFavourite(state, action) {
            const favourite = action.payload;
            const index = state.favourites.findIndex((fav) => fav === favourite);
            //state.favourites.splice(index, 1);
            deleteUserFavourite(favourite);
        },
    },
});

export const { addFavourite, clearFavourites, removeOneFavourite, getFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;