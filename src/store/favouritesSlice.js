import { createSlice } from "@reduxjs/toolkit";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        addFavourite(state, action) {
            if (state.favourites.some((favourite) => favourite.name.common === action.payload.name.common))
                return;
            state.favourites = [...state.favourites, action.payload];
            console.log(state.favourites);
        },
        clearFavourites(state, action) {
            state.favourites = [];
        },
        removeOneFavourite(state, action) {
            const favourite = action.payload;
            const index = state.favourites.findIndex((fav) => fav.name.common === favourite.name.common);
            state.favourites.splice(index, 1);
        },
    },
});

export const { addFavourite, clearFavourites, removeOneFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;