import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashoard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Register />}
        />
        <Route
          path="login"
          element={<Login />}
        />
        {/* Show content when user is authenticated*/}
        <Route
          path="dashboard"
          element={<Dashoard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
