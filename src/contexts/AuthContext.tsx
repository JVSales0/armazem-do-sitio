
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "Dona Lourdes",
    email: "lourdes@armazemdositio.com",
    password: "admin123",
    role: "admin" as const,
  },
  {
    id: "2",
    name: "Funcionário",
    email: "staff@armazemdositio.com",
    password: "staff123",
    role: "staff" as const,
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    setIsLoading(false);

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Helper for checking admin permissions
  const isAdmin = user?.role === "admin" || user?.role === "staff";

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
