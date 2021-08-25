import React, { useState } from "react";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";

const AdministrationLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loginRole, setLoginRole] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please fill all the fields");
    } else if (password.trim().length < 6) {
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Please use a valid password");
    } else {
      let postObject = { email, password, role: loginRole };

      await axios
        .post("http://localhost:6500/codebusters/api/auth/login", postObject)
        .then((res) => {
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userRole", res.data.user.role);
          window.location = `/profile/admin`;
        })
        .catch((err) => {
          setError(err.response.data.desc);
          console.log(err.message);
          setTimeout(() => {
            setError("");
          }, 5000);
        });
    }
  };

  return (
    <div style={{ paddingTop: "5vh", paddingBottom: "15vh" ,paddingLeft:"10vh" }}>
      <Form onSubmit={loginHandler}>
        {error && <span className="error-message">{error}</span>}
        <h2>Administration Login Panel</h2>
        <Form.Label as="legend" column sm={12}>
          Login as:
        </Form.Label>
        <Col sm={12} style={{ paddingLeft: "3vw", marginBottom: "3vh" }}>
          
    

          <Form.Check
            type="checkbox"
            required={true}
            label="Admin"
            onClick={() => {
              setLoginRole("admin");
            }}
            id="formHorizontalRadios1"
            name="formHorizontalRadios"
          />
          
        </Col>
        <Form.Group as={Col} md={12} controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={12} controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md={12} className="login-btn">
          <Button variant="primary" type="submit" block>
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default AdministrationLogin;