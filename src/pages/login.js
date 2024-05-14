import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStyles } from "../styles/login";
import Input from "../components/global/input";
import Button from "../components/global/button";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { page, form } = loginStyles;

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const params = {
      email,
      password,
    };

    axios
      .post("/login", params)
      .then((res) => {
        console.log(res);
        const token = res.data.token;
        const params = { token };

        axios.post("/success", params).then((result) => {
          if (result.status === 200) {
            navigate("/dashboard");
          } else {
            alert("Authentication JWT failed");
          }
        });
      })
      .catch(() => alert("Login Failed"));
  };

  return (
    <div style={page}>
      <h1>Login Form</h1>
      <form
        onSubmit={handleSubmitForm}
        style={form}
      >
        <Input
          placeholder="email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          text="Login"
        />
      </form>
      <Link to={"/dashboard"}>Go to Dashboard</Link>
    </div>
  );
};

export default Login;
