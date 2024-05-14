import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function RequireAuth({ children }) {
  const auth = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
      return;
    }
  }, [auth, navigate]);

  return children;
}

export default RequireAuth;
