
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { LogIn } from "lucide-react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo(a) de volta!",
        });
        navigate("/");
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro ao fazer login. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Demo login info
  const demoCredentials = [
    { role: "Administrador (Dona Lourdes)", email: "lourdes@armazemdositio.com", password: "admin123" },
    { role: "Funcionário", email: "staff@armazemdositio.com", password: "staff123" },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-site-green">Login de Administração</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-site-green hover:bg-site-green-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Entrando...</span>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Entrar
                </>
              )}
            </Button>
          </form>

          {/* Demo login info for easy testing */}
          <div className="mt-8 border-t pt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Para demonstração:</h4>
            <div className="space-y-3">
              {demoCredentials.map((cred, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-sm mb-1">{cred.role}</p>
                  <p className="text-sm text-gray-500">Email: {cred.email}</p>
                  <p className="text-sm text-gray-500">Senha: {cred.password}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
