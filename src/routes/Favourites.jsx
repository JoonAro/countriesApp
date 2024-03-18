import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { clearFavourites } from "../store/favouritesSlice";
import { getUserFavourites } from "../auth/firebase";
import { Alert, Grid } from "@mui/material";
import CountryCard from "../components/CountryCard";

const Favourites = () => {
    const dispatch = useDispatch();
    const [bool, setBool] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [noFav, setNoFav] = useState(false);

    const removeAllFavourites = () => {
        if (deleted) {
            return;
        }
        if (favourites.length === 0) {
            setNoFav(true);
            setTimeout(() => setNoFav(false), 2000);
            return;
        }
        if (bool) {
            dispatch(clearFavourites());
            setBool(false);
            setDeleted(true);
            setTimeout(() => setDeleted(false), 2000);
            return;
        }
        else {
            setBool(true);
            setTimeout(() => setBool(false), 4000)
        }
    }

    const favourites = useSelector((state) => state.favourites.favourites);
    let countriesList = useSelector((state) => state.countries.countries);

    if (favourites.length > 0) {
        countriesList = countriesList.filter((country) =>
            favourites.includes(country.name.common)
        );
    } else {
        countriesList = [];
    }
    // TODO: Implement logic to retrieve favourites later.
    useEffect(() => {
        dispatch(initializeCountries());
        dispatch(getUserFavourites());
    }, [dispatch]);

    return (
        <Container fluid>
            <Container style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px"
            }}>

                <Button onClick={removeAllFavourites}>Clear Favourites</Button>
                {bool && <Alert severity="warning">Are you sure you want to clear favourites? Click again to delete</Alert>}
                {deleted && <Alert severity="success">Favourites deleted succesfully</Alert>}
                {noFav && <Alert severity="error">Error, No favourites to delete</Alert>}
            </Container>
            <Grid container spacing={3} style={{
                display: "flex",
                justifyContent: "flex-start"
            }}>
                {countriesList.map((country) => (
                    <Grid item xs="auto" sm="auto" style={{
                        height: "520px",
                        width: "340px"
                    }} key={country.name.official} >
                        <CountryCard country={country} />
                    </Grid>
                ))}
            </Grid>
        </Container >
    );
};

export default Favourites;
