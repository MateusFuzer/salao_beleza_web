'use client'
import { useState, useEffect } from "react";

interface Agendamento {
    id: string;
    nome: string;
    telefone: string;
    servico: string;
    data: string;
    horario: string;
    valor: number;
    status: string;
}

interface FormularioAgendamentoProps {
    agendamento: Agendamento | null;
}

const FormularioAgendamento = ({ agendamento }: FormularioAgendamentoProps) => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [servico, setServico] = useState('Unha');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [valor, setValor] = useState(20);

    // Preenche o formulário quando receber um agendamento para edição
    useEffect(() => {
        if (agendamento) {
            setNome(agendamento.nome);
            setTelefone(agendamento.telefone);
            setServico(agendamento.servico);
            setData(agendamento.data);
            setHora(agendamento.horario);
            setValor(agendamento.valor);
        }
    }, [agendamento]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        
        const dadosAgendamento = {
            id: agendamento?.id || '', // Se for edição, mantém o ID, se for novo será gerado
            nome,
            telefone,
            servico,
            data,
            horario: hora,
            valor,
            status: agendamento?.status || 'Aberto'
        };

        console.log('Dados do agendamento:', dadosAgendamento);
        // Aqui você pode adicionar a lógica para salvar/atualizar o agendamento
    };

    const handleServicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedServico = e.target.value;
        setServico(selectedServico);

        // Atualiza o valor com base no serviço
        switch (selectedServico) {
            case 'Unha':
                setValor(20);
                break;
            case 'Maquiagem':
                setValor(30);
                break;
            case 'Cabelo':
                setValor(50);
                break;
        }
    };

    return (
        <div className="container mx-auto p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-4 text-violet-400">
                    {agendamento ? 'Editar Agendamento' : 'Novo Agendamento'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Nome */}
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

                        {/* Telefone */}
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

                        {/* Serviço */}
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

                        {/* Valor */}
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

                        {/* Data */}
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

                        {/* Hora */}
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
                            {agendamento ? 'Atualizar Agendamento' : 'Criar Agendamento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioAgendamento;
