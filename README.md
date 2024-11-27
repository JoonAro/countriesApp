# Countries

## Joona Aronen version

   ### Countries.jsx
   - I changed this page to have a grid and the cards are of a certain size so the cards won't shrink when the device width changes.
   ### Favourites.jsx
   - Similar grid change here too.
   - In favourites you can delete one or all of the favourites. If you choose to clear all of them an Alert will appear to ask if you are sure. Press the button again and it will delete them.
      - If there is no favourites it will return an error Alert.
      - The user has 4 s to click the button again to be able to clear favourites. And when deleted after 2s the Alert succesfully deleted will disappear
   ### CountryCard.jsx
   - Moved card inside CountryCard to be able to change the favouriteIcon and have the hoverEffect in a single card only
   ### firebase.js
   - Here we have a bit different version. I wanted to have the favourites collection inside of the "users" with the uid of the user being the same as the document id. So the data we create in the user registration is there but also a "favourites" collection containing all the country names.
   
   That's about it. I used some of the time available strugling with some of the firebase functions not realising they we're available in the example project. And just now in the end I started to learn how to deal with mui and making those small changes. Fun project. Will continue later.

## Begin Countries Application setup...

### Steps:

1. Install react-redux and react-redux toolkit
   Install react-redux and @reduxjs/toolkit using npm or yarn. These libraries will be used to manage the state of your application.

```shell
npm install react-redux @reduxjs/toolkit
```

2. Signup for weather api at: https://home.openweathermap.org/users/sign_up
   Sign up for the OpenWeatherMap API at https://home.openweathermap.org/users/sign_up. You will receive an API key which will be used to fetch weather data. The signup means we have to wait 2 hours for the API key to be available. We will not be using this right away.

**_ We will do this step together _** 3. Set up store, slice and (do api call together - service)
Set up your Redux store and create a slice for your countries data. In the slice, define actions and reducers to handle the fetching of country data. You can use createAsyncThunk from Redux Toolkit to handle the API call.

4. Test that redux in chrome is showing the empty countries array.
   Test your Redux setup by checking the Redux DevTools in your browser.

5. Connect Countries.jsx to store and replace the countriesList and loading with values from redux.
   In your Countries.jsx component, connect to the Redux store using the useSelector and useDispatch hooks from react-redux. Replace the local countriesList and loading state with values from the Redux store.

6. Use framework component to fetch data and display.

7. Create search function for all countries
   Implement a search function that filters the list of countries based on the user's input. This could be done in the Redux slice or in the component itself, depending on your preference.

Think about the steps carefully here... which part should we do first and why? Do we map and then filter or filter and then map for example?
Think of your reason...
Filter and then map

8. Create link container and add in link for single page later (suggested wrapping Card.Img)
   Create a link container component that wraps around each country item. This component should use the Link component from react-router-dom to navigate to a detailed view of the country when clicked. It's suggested to wrap the Card.Img component with this link container.

**_ We will do this step together _** 9. Set up country single.

small change
another one
