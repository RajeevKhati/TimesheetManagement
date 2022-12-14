import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Form } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.log("failed to login ", err);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.log("login google auth error => ", err);
    }
  };

  return (
    <div className="container-md" style={{ maxWidth: 400, marginTop: 20 }}>
      <p className="fs-2 text-center">Login</p>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            required={true}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter password"
            required={true}
          />
        </Form.Group>
        <div>
          <Button
            style={{ marginRight: 10, marginBottom: 10 }}
            variant="primary"
            type="submit"
          >
            Login
          </Button>

          <Button
            style={{ marginRight: 10, marginBottom: 10 }}
            variant="primary"
            type="submit"
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
        </div>
        <div>
          <Button
            as={Link}
            to={"/phoneSignUp"}
            style={{ marginRight: 10, marginBottom: 10 }}
            variant="primary"
            type="submit"
          >
            Sign in with phone number
          </Button>
        </div>
        <div>
          Don't have an account?
          <Link style={{ marginLeft: 6 }} to="/signUp">
            Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
