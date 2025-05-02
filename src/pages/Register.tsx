
import Layout from "@/components/layout/Layout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
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
            Criar Conta
          </h1>
          <RegisterForm />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
