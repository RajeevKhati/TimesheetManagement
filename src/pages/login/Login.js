import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      console.log(email);
      console.log(password);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.log("failed to login ", err);
    }
  };

  return (
    <div>
      <Input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={setEmail}
        label={"Email"}
      />
      <Input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={setPassword}
        label={"Password"}
      />
      <Button type="submit" text={"Login"} onClick={onSubmit} />
      <Link to="/signUp">Sign Up</Link>
    </div>
  );
};

export default Login;
