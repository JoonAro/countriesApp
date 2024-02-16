import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";



const CountriesSingle = () => {
  const location = useLocation();
  //console.log("location", location);
  //allows your code to retrieve the current details from the react-router-dom data that is passed to this component. Console log it out to see what it contains in full, you will be pleasantly surprised! Pay particular attention to the state: {} object.
  const navigate = useNavigate();
  //Allows us to ‘force’ a user to a new part of the application, in this case we use it as a redirect back to /countries
  const country = location.state.country;
  //console.log("location.state.country", country);

  //location takes the path defined in main with this countrys common name
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`;
  useEffect(() => {
    axios.get(weatherURL
    ).catch((error) => {
      console.log(error);
      setError(true);
    })
      .then((res) => {
        setWeather(res.data);
        setLoading(false);
        //console.log(country);
        //console.log(res.data);
      });

  }, [country.capital]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }
  return (
    <Container>
      <Row className="m-5">
        <Col>
          {" "}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
          />
        </Col>
        <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capital {country.capital}</h3>
          {!error && weather && (
            <div>
              <p>
                Right now it is <strong>{weather.main.temp}</strong>{" "}
                degrees in {country.capital} and{" "}
                {weather.weather[0].description}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="light" onClick={() => navigate("/countries")}>
            Back to Countries
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CountriesSingle;
