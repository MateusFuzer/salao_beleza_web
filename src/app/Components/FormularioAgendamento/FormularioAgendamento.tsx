'use client'
import { useState } from "react";

const FormularioAgendamento = () => {
  // Definindo os estados dos campos do formulário
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [servico, setServico] = useState('Unha');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [valor, setValor] = useState(20);  // Inicializando com o valor da Unha

  // Função para lidar com o envio do formulário
  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log('Nome:', nome);
    console.log('Telefone:', telefone);
    console.log('Serviço:', servico);
    console.log('Data:', data);
    console.log('Hora:', hora);
    console.log('Valor:', valor);
  };

  // Função para atualizar o valor com base no serviço selecionado
  const handleServicoChange = (e:any) => {
    const selectedServico = e.target.value;
    setServico(selectedServico);

    // Atualiza o valor com base no serviço
    if (selectedServico === 'Unha') {
      setValor(20);
    } else if (selectedServico === 'Maquiagem') {
      setValor(30);
    } else if (selectedServico === 'Cabelo') {
      setValor(50);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-4 text-violet-400">Formulário de Agendamento</h2>
        <form onSubmit={handleSubmit}>
          {/* Divisão do Formulário em 3 colunas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Primeira coluna (Nome e Telefone) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="nome">
                Nome
              </label>
              <input
                id="nome"
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="telefone">
                Telefone
              </label>
              <input
                id="telefone"
                type="tel"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
              />
            </div>

            {/* Segunda coluna (Serviço e Valor) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="servico">
                Serviço
              </label>
              <select
                id="servico"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={servico}
                onChange={handleServicoChange}
                required
              >
                <option value="Unha">Unhas (R$20,00)</option>
                <option value="Maquiagem">Maquiagem (R$30,00)</option>
                <option value="Cabelo">Cabelo (R$50,00)</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="valor">
                Valor
              </label>
              <input
                id="valor"
                type="number"
                min="0"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={valor}
                readOnly
              />
            </div>

            {/* Terceira coluna (Data e Hora) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="data">
                Data
              </label>
              <input
                id="data"
                type="date"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700" htmlFor="hora">
                Hora
              </label>
              <input
                id="hora"
                type="time"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              />
            </div>

          </div>

          {/* Botão Enviar */}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Agendar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioAgendamento;
