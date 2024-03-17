import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { removeOneFavourite, clearFavourites } from "../store/favouritesSlice";
import { auth, getUserFavourites } from "../auth/firebase";
import { Link } from "react-router-dom";

const Favourites = () => {
    const dispatch = useDispatch();

    /* const handleRemoveFavourite = () => {
        dispatch(removeOneFavourite(country.name.common))
    } */

    const removeAllFavourites = () => {
        dispatch(clearFavourites());
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
            <Button onClick={() => removeAllFavourites()}>Clear Favourites</Button>
            <Row xs={2} md={3} lg={4} className=" g-3">
                {countriesList.map((country) => (
                    <Col key={country.name.official} className="mt-5">
                        <Card className="h-100">
                            <Link
                                to={`/countries/${country.name.common}`}
                                state={{ country: country }}
                            >
                                <Card.Img
                                    variant="top"
                                    className="rounded h-50"
                                    src={country.flags.svg}
                                    style={{
                                        objectFit: "cover",
                                        minHeight: "200px",
                                        maxHeight: "200px",
                                    }}
                                />
                            </Link>
                            <Card.Body className="d-flex flex-column">
                                <HeartBrokenIcon
                                    color="red"
                                    onClick={() => dispatch(removeOneFavourite(country.name.common))} />
                                <Card.Title>{country.name.common}</Card.Title>
                                <Card.Subtitle className="mb-5 text-muted">
                                    {country.name.official}
                                </Card.Subtitle>
                                <ListGroup
                                    variant="flush"
                                    className="flex-grow-1 justify-content-end"
                                >
                                    <ListGroup.Item>
                                        <i className="bi bi-translate me-2"></i>
                                        {Object.values(country.languages ?? {}).join(", ")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <i className="bi bi-cash-coin me-2"></i>
                                        {Object.values(country.currencies || {})
                                            .map((currency) => currency.name)
                                            .join(", ")}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {country.population.toLocaleString()}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Favourites;
