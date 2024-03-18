//5. Connect Countries.jsx to store and replace the countriesList and loading with values from redux.In your Countries.jsx component, connect to the Redux store using the useSelector and useDispatch hooks from react-redux. Replace the local countriesList and loading state with values from the Redux store.
import { useEffect, useState } from "react";
import { Spinner, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { initializeCountries } from "../store/countriesSlice";
import { Grid } from "@mui/material";
import CountryCard from "../components/CountryCard";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const isLoading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
  }, [dispatch]);

  useEffect(() => {
    //console.log("search: ", search);
  }, [search]);

  if (isLoading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
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
    <Container fluid>
      <Row style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "25px 0",
      }}>

        <Form.Control
          style={{ width: "18rem", margin: "0", padding: "0" }}
          type="search"
          className="me-2 "
          placeholder="Search for countries"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
      <Grid container spacing={3} style={{
        display: "flex",
        justifyContent: "flex-start"
      }}>


        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <Grid item xs="auto" sm="auto" style={{
              height: "520px",
              width: "340px",
            }} key={country.name.official} >
              <CountryCard country={country} />
            </Grid>
          ))}
      </Grid>
      <a href="https://www.freepik.com/free-photo/storm-clouds_1173083.htm#query=black%20white%20clouds&position=49&from_view=keyword&track=ais&uuid=2e916465-b14f-4fe1-b578-80b362d59ccc">Image by freestockcenter</a>
    </Container>
  );
};

export default Countries;
