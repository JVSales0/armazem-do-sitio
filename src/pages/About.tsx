
import Layout from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">Sobre o Armazém do Sítio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <img
              src="/placeholder.svg"
              alt="Sítio da Dona Lourdes"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Nossa História</h2>
            <p className="text-gray-700 mb-4">
              O Armazém do Sítio nasceu do sonho da Dona Lourdes em compartilhar os frutos do seu trabalho no sítio 
              com mais pessoas. O que começou como uma pequena horta familiar transformou-se em um negócio que 
              conecta o campo diretamente à mesa dos clientes.
            </p>
            <p className="text-gray-700">
              Localizado na zona rural, o sítio da Dona Lourdes é um lugar especial onde tradição e qualidade se 
              encontram. Todos os produtos são cultivados com carinho, respeito à natureza e usando técnicas 
              tradicionais que garantem sabor e qualidade.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Nossa Missão</h2>
          <p className="text-gray-700">
            Nosso objetivo é levar produtos frescos e saudáveis diretamente do sítio para a casa dos clientes, 
            valorizando o trabalho no campo e promovendo uma alimentação mais saudável e consciente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-site-green mb-3">Produtos Orgânicos</h3>
            <p className="text-gray-600">
              Cultivamos com respeito à natureza, sem uso de agrotóxicos, garantindo alimentos mais saudáveis e saborosos.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-site-green mb-3">Tradição Familiar</h3>
            <p className="text-gray-600">
              Receitas e técnicas passadas de geração em geração garantem o sabor único dos nossos produtos artesanais.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-site-green mb-3">Do Campo à Mesa</h3>
            <p className="text-gray-600">
              Entregamos diretamente do sítio para a sua casa, mantendo a qualidade e frescor dos produtos.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Dona Lourdes</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="md:w-1/4">
              <img
                src="/placeholder.svg"
                alt="Dona Lourdes"
                className="rounded-full w-40 h-40 object-cover mx-auto"
              />
            </div>
            <div className="md:w-3/4">
              <p className="text-gray-700 mb-4">
                Dona Lourdes cresceu no campo e desde cedo aprendeu com seus pais a arte de cultivar a terra. 
                Com mais de 30 anos de experiência, ela se tornou uma referência em produtos orgânicos e artesanais 
                na região.
              </p>
              <p className="text-gray-700">
                "O segredo está no carinho. Planta bem cuidada dá fruto bom. E comida boa faz bem pra alma da gente." 
                - Dona Lourdes
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-2">
                <strong>Endereço:</strong> Sítio da Dona Lourdes, Zona Rural
              </p>
              <p className="text-gray-700 mb-2">
                <strong>WhatsApp:</strong> (11) 98765-4321
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong> contato@armazemdositio.com
              </p>
            </div>
            <div>
              <p className="text-gray-700 mb-4">
                Aceitamos pedidos pelo site, WhatsApp ou por telefone.
                Para visitas ao sítio, entre em contato para agendar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
