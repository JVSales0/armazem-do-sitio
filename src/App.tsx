
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductAdd from "./pages/admin/AdminProductAdd";
import AdminProductEdit from "./pages/admin/AdminProductEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notifications" element={<Notifications />} />
                
                {/* Admin Routes */}
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/add" element={<AdminProductAdd />} />
                <Route path="/admin/products/edit/:id" element={<AdminProductEdit />} />
                
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </NotificationProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
