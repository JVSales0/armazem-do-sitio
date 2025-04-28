
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-green-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
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
