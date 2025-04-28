
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-16 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Área de Administração
          </h1>
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default Login;
