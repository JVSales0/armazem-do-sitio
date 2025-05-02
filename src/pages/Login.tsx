
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Redirect to the register page with login tab active
  useEffect(() => {
    navigate("/register?tab=login", { replace: true });
  }, [navigate]);

  return null;
};

export default Login;
