import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { loginStyles } from "../styles/login";
import Input from "../components/global/Input";
import Button from "../components/global/Button";
import { setIsUserAuthenticated } from "../store/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        const { token } = res.data;

        axios.post("/success", { token }).then((result) => {
          if (result.status === 200) {
            dispatch(setIsUserAuthenticated(true));
            navigate(`/dashboard`);
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
          type="text"
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
    </div>
  );
};

export default Login;
