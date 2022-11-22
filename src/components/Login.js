import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  // DEFINING STATES FOR INPUTS
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log({email,password});

  // HANDLING INPUTS FROM FIELDS
  const handleEmail = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlePass = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };


  // FORM SUBMISSION & POST API
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    let url = "http://localhost/react_php/login.php";

    axios.post(url, {
      email: email,
      password: password
    })
      .then((result) => {
        // console.log(result);
        if (result.data === "Login Failed") {
          alert(result.data);
          console.log(result);

        } else {
          // alert('if else');
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          // localStorage.setItem('token', result.data.token);
          navigate('/home');
          // setTimeout(() => {
          //     document.write('Welcome user');
          //   }, 3000);
        }

      })
      .catch((error) => {
        alert("Incorrect Username & Password")
        emailRef.current.focus();
        console.log(error);
      });
  };

  return (
    <>
      <div className="container mt-4 ">
        {/* {email} */}
        <h1>Login to Continue</h1>
        <hr />
        <Form className="col-md-5" autoComplete="off" onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="col-md-2"
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              ref={emailRef}
              onChange={handleEmail}
              required
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handlePass}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <hr />
      </div>
    </>
  );
};

export default Login;
