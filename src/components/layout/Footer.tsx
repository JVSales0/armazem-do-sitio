
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative py-8 mt-auto">
      {/* Footer background image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-white/95 to-white/80 -z-10"></div>
      <div 
        className="absolute inset-0 w-full h-full -z-20 bg-cover bg-center" 
        style={{ backgroundImage: 'url("/lovable-uploads/50f5adb4-3361-4d85-bdcd-bfc11e4d384c.png")' }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-xl font-bold text-site-green mb-4">Armazém do Sítio</h3>
            <p className="text-gray-600">
              Produtos frescos e artesanais direto do Sítio da Dona Lourdes para sua casa.
            </p>
          </div>

          {/* Links section */}
          <div>
            <h3 className="text-xl font-bold text-site-green mb-4">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-site-green">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-site-green">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-site-green">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-site-green">
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-xl font-bold text-site-green mb-4">Contato</h3>
            <p className="text-gray-600 mb-2">Sítio da Dona Lourdes, Zona Rural</p>
            <p className="text-gray-600 mb-2">WhatsApp: (11) 98765-4321</p>
            <p className="text-gray-600">Email: contato@armazemdositio.com</p>
          </div>
        </div>

        <div className="border-t border-green-100 mt-8 pt-6 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} Armazém do Sítio - Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
