
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { ShoppingCart, Bell, Menu, X, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ThemeSwitcher from "@/components/theme/ThemeSwitcher";

export const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { unreadCount } = useNotifications();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Adicionar evento de scroll para detectar quando a página é rolada
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const nav = [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/products" },
    { name: "Sobre", href: "/about" },
    ...(isAdmin ? [{ name: "Gerenciar Produtos", href: "/admin/products" }] : []),
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`${scrolled ? 'fixed top-0 left-0 right-0 shadow-md' : 'relative'} bg-transparent z-40 transition-all duration-300`}>
      {/* Header background image with gradient overlay */}
      <div className={`absolute inset-0 w-full h-full ${scrolled ? 'bg-white/95 dark:bg-gray-900/95' : 'bg-gradient-to-b from-white/95 dark:from-gray-900/95 to-white/80 dark:to-gray-900/80'} -z-10`}></div>
      <div 
        className="absolute inset-0 w-full h-full -z-20 bg-cover bg-center" 
        style={{ backgroundImage: 'url("/lovable-uploads/50f5adb4-3361-4d85-bdcd-bfc11e4d384c.png")' }}
      ></div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and name */}
          <Link to="/" className="flex items-center space-x-2 relative z-10">
            <span className="text-2xl font-bold text-site-green dark:text-site-green">Armazém do Sítio</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 relative z-10">
            {nav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-lg ${
                  isActive(item.href)
                    ? "text-site-green font-medium dark:text-site-green"
                    : "text-gray-600 hover:text-site-green dark:text-gray-300 dark:hover:text-site-green"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User, Cart, Notifications, Theme */}
          <div className="flex items-center space-x-4 relative z-10">
            {/* Theme Switcher */}
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>

            {/* Notifications */}
            {user && (
              <Link to="/notifications" className="relative">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-site-green">
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Shopping Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-site-green">
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-site-green text-white text-xs px-1.5">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu or Login */}
            {user ? (
              <div className="hidden md:flex items-center">
                <Link to="/profile">
                  <Button variant="outline" className="flex items-center space-x-2 border-site-green text-site-green hover:bg-site-green hover:text-white">
                    <User className="h-5 w-5" />
                    <span>{user.name}</span>
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="ml-2 text-gray-600" 
                  onClick={logout}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <div className="hidden md:block">
                <Link to="/login">
                  <Button className="bg-site-green hover:bg-site-green-dark flex items-center space-x-2">
                    <LogIn className="h-5 w-5" />
                    <span>Entrar</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px] p-0 bg-background dark:bg-background">
                <div className="flex flex-col h-full bg-background dark:bg-background">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-site-green dark:text-site-green">Menu</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <X className="h-5 w-5 dark:text-gray-300" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="flex flex-col space-y-1">
                      {nav.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`py-3 px-4 text-lg ${
                            isActive(item.href)
                              ? "bg-site-green-light dark:bg-secondary font-medium text-site-green dark:text-site-green"
                              : "text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </nav>

                    {/* Theme Switcher in Mobile Menu */}
                    <div className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Tema</span>
                        <ThemeSwitcher />
                      </div>
                    </div>

                    {/* Mobile User Menu */}
                    <div className="mt-6 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                      {user ? (
                        <div className="flex flex-col space-y-3">
                          <div className="flex items-center space-x-3">
                            <User className="h-5 w-5 text-site-green" />
                            <span className="font-medium">{user.name}</span>
                          </div>
                          <Link
                            to="/profile"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 px-3 text-gray-600 hover:bg-gray-50 rounded-md"
                          >
                            Perfil
                          </Link>
                          <Button
                            variant="outline"
                            className="w-full border-site-green text-site-green"
                            onClick={() => {
                              logout();
                              setMobileMenuOpen(false);
                            }}
                          >
                            Sair
                          </Button>
                        </div>
                      ) : (
                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                          <Button className="w-full bg-site-green hover:bg-site-green-dark">
                            <LogIn className="h-5 w-5 mr-2" />
                            <span>Entrar</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
