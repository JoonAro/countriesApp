import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { db, logout } from "../auth/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../auth/firebase";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";

const Header = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState("user");
  const [message, setMessage] = useState("Welcome")

  useEffect(() => {
    const getUserData = async () => {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const userName = doc.data().name;
        setName(userName);
      });
    };

    if (user) {
      getUserData();
    }
  }, [user]);

  return user ? (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <Link to="/">
                  <Button variant="contained">Home</Button>
                </Link>
                <Link to="/countries">
                  <Button variant="contained">Countries</Button>
                </Link>
                <Link to="/favourites">
                  <Button variant="contained">Favourites</Button>
                </Link>
                <Button onClick={logout}>Logout</Button>
              </Nav>

            </Navbar.Collapse>
            <p style={{
              color: "black",
            }}>Welcome {name}</p>
          </Container>
        </Navbar>
      </Row>
    </Container >
  ) : (<Container fluid>
    <Row>
      <Navbar bg="light" variant="light">
        <Container className="justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Link to="/register">
                <Button variant="contained">Register</Button>
              </Link>
              <Link to="/login">
                <Button variant="contained">Login</Button>
              </Link>
            </Nav>
          </Navbar.Collapse>
          <p style={{
            color: "black",
          }}></p>
        </Container>
      </Navbar>
    </Row>
  </Container>);
};

export default Header;
