import React from 'react';

const Tabela = () => {
  const dados = [
    { id: 1, nome: 'Beatriz Valezio', status: 'Aberto', servico: 'Cabelo', data:"14/02/2025 - 08:10", telefone:"14996145208", valor:"R$50,00" },
    { id: 2, nome: 'Beatriz Valezio', status: 'Aberto', servico: 'Unha', data:"14/02/2025 - 08:10", telefone:"14996145208",valor:"R$50,00" },
    { id: 3, nome: 'Beatriz Valezio', status: 'Aberto', servico: 'Maquiagem', data:"14/02/2025 - 08:10", telefone:"14996145208",valor:"R$50,00" },
  ];

  const getcorStatus = function( status: string ){
    switch( status ){
        case "Aberto":
            return "text-green-400"
        case "Finalizado":
            return "text-red-400"
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-violet-400 text-white">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Nome</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Serviço</th>
              <th className="px-6 py-3 text-left">Data/Hora</th>
              <th className="px-6 py-3 text-left">Telefone</th>
              <th className="px-6 py-3 text-left">Valor</th>
              <th className="px-6 py-3 text-left">Ação</th>
            </tr>
          </thead>
          <tbody>
            {dados.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="px-6 py-4">{item.id}</td>
                <td className="px-6 py-4">{item.nome}</td>
                <td className={`px-6 py-4 ${getcorStatus( item.status )} `}>{item.status}</td>
                <td className="px-6 py-4">{item.servico}</td>
                <td className="px-6 py-4">{item.data}</td>
                <td className="px-6 py-4">{item.telefone}</td>
                <td className="px-6 py-4 text-green-400">{item.valor}</td>
                <td className="px-6 py-4">
                    <div className='flex gap-3'>
                        <button className='bg-blue-500 p-2 rounded-md text-white'>Editar</button>
                        <button className='bg-red-500 p-2 rounded-md text-white'>Cancelar</button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tabela;
