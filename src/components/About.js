import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { TextField } from "@mui/material";
// this is for testing purpose


const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    }
  }, []);

  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // const getApi = () => {
  //   let url = "http://localhost/react_php/view.php";
  //   axios.get(url).then((res) => { console.log(res.data) }).catch((error) => { console.log(error) });
  // }

  // CREATING API REQUEST
  const [data, setData] = useState({
    email: "",
    first_name: "",
    last_name: ""
  })

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    // console.log(name,value);
    setData({ ...data, [name]: value });

  }
  const handleCreate = (e) => {
    e.preventDefault();
    let url = "http://localhost/react_php/create.php";
    const finalData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    }
    axios.post(url, finalData).then((res) => {
      console.log(res);
      // alert(JSON.stringify(res));
      // navigate('/about'); 
      setData({
        email: "",
        first_name: "",
        last_name: ""
      });

      // document.location.reload();
    })
      .catch((error) => { console.log(error); });
    // navigate('/home');
    // window.reload();

  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Croma</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link onClick={handlelogout}>Log Out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <h1>This is About Us Page</h1>
      {/* <button onClick={getApi}>Get API</button> */}

      <div className="container">
        <form onSubmit={handleCreate}>
          <TextField
            label="Email"
            onChange={handleInput}
            size="small"
            name="email"
            value={data.email}
            // inputRef={inputRef}
            variant="outlined"
            autoComplete="off"
            required
          />

          <TextField
            label="First name"
            onChange={handleInput}
            size="small"
            name="first_name"
            value={data.first_name}
            variant="outlined"
            autoComplete="off"
          />

          <TextField
            label="Last name"
            onChange={handleInput}
            size="small"
            name="last_name"
            value={data.last_name}
            variant="outlined"
            autoComplete="off"
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default About;
