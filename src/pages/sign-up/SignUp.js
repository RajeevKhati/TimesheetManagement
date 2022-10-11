import React, { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    signUp(email, password);
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
      <Button type="submit" text={"sign up"} onClick={onSubmit} />
    </div>
  );
};

export default SignUp;
