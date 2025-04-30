
import { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [scrolled, setScrolled] = useState(false);

  // Inicialize o tema com base na preferência do usuário
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark" || 
        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Adicionar detecção de scroll para ajustar o padding quando o cabeçalho ficar fixo
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

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      {/* Adicionar padding-top quando o header estiver fixo */}
      <main className={`flex-grow bg-background relative z-10 ${scrolled ? 'pt-20' : ''}`}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
