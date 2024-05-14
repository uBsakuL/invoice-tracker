import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import { registerStyles } from "../styles/register";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { page, form } = registerStyles;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const params = {
      name,
      password,
      email,
    };

    axios
      .post("/register", params)
      .then((res) => {
        alert(res.data);
        navigate("/login");
      })
      .catch((err) => alert(err.response.data));
  };

  return (
    <div style={page}>
      <h1>Register </h1>
      <form
        style={form}
        onSubmit={handleSubmitForm}
      >
        <Input
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          type="submit"
          text="Register"
        />
      </form>
      <p>Already have an accout?</p>
      <Link to="/login">Log in</Link>
    </div>
  );
};

export default Register;
