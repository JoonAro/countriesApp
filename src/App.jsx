import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Home from "./routes/Home";
import Root from "./routes/Root";
import { Provider } from "react-redux";
import store from "./store/store";
import Favourites from "./routes/Favourites";
import Register from "./routes/Register";
import Login from "./routes/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="/countries" element={
                  <ProtectedRoute>
                    <Countries />
                  </ProtectedRoute>
                } />
                <Route path="/favourites" element={
                  <ProtectedRoute>
                    <Favourites />
                  </ProtectedRoute>
                } />
                <Route path="/countries/:single" element={
                  <ProtectedRoute>
                    <CountriesSingle />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
