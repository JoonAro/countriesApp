import { createSlice } from "@reduxjs/toolkit";
import { addUserFavourite, clearUserFavourites, deleteUserFavourite } from "../auth/firebase";

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
        clearFavourites(state) {
            state.favourites = [];
            clearUserFavourites();
        },
        removeOneFavourite(state, action) {
            const newArray = [...state.favourites];
            const favourite = action.payload;
            newArray.splice(newArray.findIndex((e) => e === action.payload), 1)
            state.favourites = [...newArray];
            deleteUserFavourite(favourite);
        },
    },
});

export const { addFavourite, clearFavourites, removeOneFavourite, getFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;