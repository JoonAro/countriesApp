import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { addFavourite, removeOneFavourite } from "../store/favouritesSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CountryCard = ({ country }) => {
    const dispatch = useDispatch()
    const favourites = useSelector((state) => state.favourites.favourites);
    const [isHovered, setIsHovered] = useState(false);
    const handleFavourite = () => {
        dispatch(addFavourite(country.name.common))
    }
    const handleDeleteFavourite = () => {
        dispatch(removeOneFavourite(country.name.common))
    }

    const handleMouseEnter = () => {
        setIsHovered(true);
    }
    const handleMouseLeave = () => {
        setIsHovered(false);
    }
    return (
        <Card className="h-100" style={{ maxWidth: "320px" }}>
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
                {favourites.includes(country.name.common) ? < HeartBrokenIcon style={{
                    transform: `Scale(${isHovered ? 1.2 : 1})`,
                    transition: 'transform 0.3s'
                }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    color="red"
                    onClick={handleDeleteFavourite} />
                    : <FavoriteIcon
                        style={{
                            transform: `Scale(${isHovered ? 1.2 : 1})`,
                            transition: 'transform 0.3s'
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        color="red"
                        onClick={handleFavourite}
                    />}
                <Card.Title>{country.name.common}</Card.Title>
                <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                </Card.Subtitle>
                <ListGroup
                    variant="flush"
                    className="justify-content-end"
                >
                    <ListGroup.Item>
                        <i className="bi bi-translate me-2"></i>
                        {Object.values(country.languages ?? {}).join(', ')}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <i className="bi bi-cash-coin me-2"></i>
                        {Object.values(country.currencies || {})
                            .map((currency) => currency.name)
                            .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <i className="bi bi-people me-2"></i>
                        {country.population.toLocaleString()}
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default CountryCard