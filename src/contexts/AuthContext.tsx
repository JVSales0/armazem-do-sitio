
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff" | "customer";
};

// Creating a type that includes the password field for mock users
type MockUser = User & {
  password: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes - now explicitly typed as MockUser[]
const MOCK_USERS: MockUser[] = [
  {
    id: "1",
    name: "Dona Lourdes",
    email: "lourdes@armazemdositio.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "2",
    name: "Funcionário",
    email: "staff@armazemdositio.com",
    password: "staff123",
    role: "staff",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mockUsers, setMockUsers] = useState<MockUser[]>(MOCK_USERS);

  useEffect(() => {
    // Check for stored user on load
    const storedUser = localStorage.getItem("user");
    const storedMockUsers = localStorage.getItem("mockUsers");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedMockUsers) {
      setMockUsers(JSON.parse(storedMockUsers));
    }
    
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = mockUsers.find(
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

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser: MockUser = {
      id: `customer_${Date.now().toString()}`,
      name,
      email,
      password,
      role: "customer",
    };
    
    const updatedUsers = [...mockUsers, newUser];
    
    // Update mock users
    setMockUsers(updatedUsers);
    localStorage.setItem("mockUsers", JSON.stringify(updatedUsers));
    
    // Auto login
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("user", JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Helper for checking admin permissions
  const isAdmin = user?.role === "admin" || user?.role === "staff";

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, isAdmin }}>
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
