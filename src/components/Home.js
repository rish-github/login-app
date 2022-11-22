import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, Table } from "react-bootstrap";
import { TextField } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  // AUTHENTICATION FOR TOKEN
  useEffect(() => {
    if (!localStorage.getItem("email")) {
      navigate("/login");
    }
  }, []);

  // SHOWING THE LIST OF USERS
  const [mapdata, setMapData] = useState([]);
// test
  const showData = () => {
    let url = "http://localhost/react_php/view.php";
    axios
      .get(url)
      .then((result) => {
        console.log(result.data);
        setMapData(result.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleFname = (e) => {
    setFirst(e.target.value);
  };

  const handleLname = (e) => {
    setLast(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (first === "") {
      alert("kindly enter first name");
      inputRef.current.focus();

    } else {
      let url = "https://dummyjson.com/products/add";
      // let url = "";
      axios
        .post(url, { title: first, description: last, price: email })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // LOGOUT FUNCTIONALITY
  const handlelogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  //DELETING USER
  const delUser = (id) => {

    alert(id);

    let url = "http://localhost/react_php/delete.php";

    axios
      .delete(url, { data: { id: id } })
      .then((response) => {
        console.log(response.data);
        showData();
      })
      .catch((error) => {
        console.log(error);
      });


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
      <h1>This is home Page</h1>
      <button className="btn btn-primary" onClick={showData}>
        Show List
      </button>
      <br />
      <br />
      <div className="container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th colSpan={2}>Operation</th>
            </tr>
          </thead>
          <tbody>
            {mapdata.map((item, i) => {
              // DESTRUCTURING OF OBJECT
              const { id, email, first_name, last_name } = item;
              return (
                <tr key={i}>
                  <td>{id}</td>
                  <td>{email}</td>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                    // onClick={() => { edit(id) }}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => { delUser(id) }}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <br />
        <br />
        <form onSubmit={handleCreate}>
          <TextField
            label="Title"
            onChange={handleFname}
            size="small"
            inputRef={inputRef}
            variant="outlined"
            autoComplete="off"
          />

          <TextField
            label="Description"
            onChange={handleLname}
            size="small"
            variant="outlined"
            autoComplete="off"
          />

          <TextField
            label="Price"
            onChange={handleEmail}
            size="small"
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

export default Home;
