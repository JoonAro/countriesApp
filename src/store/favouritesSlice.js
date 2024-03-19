import { createSlice } from "@reduxjs/toolkit";
import { addUserFavourite, auth, clearUserFavourites, deleteUserFavourite } from "../auth/firebase";

export const favouritesSlice = createSlice({
    name: "favourites",
    initialState: {
        favourites: [],
    },
    reducers: {
        getFavourites(state, action) {
            state.favourites = action.payload;
        },
        addFavourite(state, action) {
            const user = auth.currentUser;
            if (state.favourites.some((favourite) => favourite === action.payload))
                return;
            state.favourites = [...state.favourites, action.payload];
            if (user) {
                addUserFavourite(action.payload, user.uid);
            }

        },
        clearFavourites(state) {
            const user = auth.currentUser;
            state.favourites = [];
            if (user) {
                clearUserFavourites(user.uid);
            }
        },
        removeOneFavourite(state, action) {
            const user = auth.currentUser;
            const newArray = [...state.favourites];
            const favourite = action.payload;
            newArray.splice(newArray.findIndex((e) => e === action.payload), 1)
            state.favourites = [...newArray];
            if (user) {
                deleteUserFavourite(favourite, user.uid);
            }
        },
    },
});

export const { addFavourite, clearFavourites, removeOneFavourite, getFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;