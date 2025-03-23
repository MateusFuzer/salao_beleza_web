'use client'
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Pencil, ChevronLeft, ChevronRight } from "lucide-react";

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

interface TabelaProps {
    onEditar: (agendamento: Agendamento) => void;
}

const ITENS_POR_PAGINA = 5;

const Tabela = ({ onEditar }: TabelaProps) => {
    // Atualizando o formato dos dados para corresponder à interface
    const dados: Agendamento[] = [
        { 
            id: "1", 
            nome: 'Beatriz Valezio', 
            status: 'Aberto', 
            servico: 'Cabelo', 
            data: "2024-02-14",
            horario: "08:10",
            telefone: "14996145208", 
            valor: 50
        },
        { 
            id: "2", 
            nome: 'Beatriz Valezio', 
            status: 'Aberto', 
            servico: 'Unha', 
            data: "2024-02-14",
            horario: "09:10",
            telefone: "14996145208", 
            valor: 20
        },
        { 
            id: "3", 
            nome: 'Beatriz Valezio', 
            status: 'Aberto', 
            servico: 'Maquiagem', 
            data: "2024-02-14",
            horario: "10:10",
            telefone: "14996145208", 
            valor: 30
        }
    ];

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);

    // Cálculo para paginação
    const totalPaginas = Math.ceil(dados.length / ITENS_POR_PAGINA);
    const indiceInicial = (paginaAtual - 1) * ITENS_POR_PAGINA;
    const indiceFinal = indiceInicial + ITENS_POR_PAGINA;
    const dadosPaginados = dados.slice(indiceInicial, indiceFinal);

    const handlePaginaAnterior = () => {
        setPaginaAtual(pagina => Math.max(1, pagina - 1));
    };

    const handleProximaPagina = () => {
        setPaginaAtual(pagina => Math.min(totalPaginas, pagina + 1));
    };

    const handleCancelar = (agendamento: Agendamento) => {
        setAgendamentoSelecionado(agendamento);
        setIsModalOpen(true);
    };

    const handleConfirmarCancelamento = () => {
        if (agendamentoSelecionado) {
            console.log(`Agendamento cancelado: ${agendamentoSelecionado.id}`);
        }
        setIsModalOpen(false);
    };

    const getcorStatus = (status: string) => {
        switch(status) {
            case "Aberto":
                return "text-green-400"
            case "Finalizado":
                return "text-red-400"
            default:
                return "text-gray-500"
        }
    };

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
                            <th className="px-6 py-3 text-left">Data</th>
                            <th className="px-6 py-3 text-left">Hora</th>
                            <th className="px-6 py-3 text-left">Telefone</th>
                            <th className="px-6 py-3 text-left">Valor</th>
                            <th className="px-6 py-3 text-left">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dadosPaginados.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{item.id}</td>
                                <td className="px-6 py-4">{item.nome}</td>
                                <td className={`px-6 py-4 ${getcorStatus(item.status)}`}>{item.status}</td>
                                <td className="px-6 py-4">{item.servico}</td>
                                <td className="px-6 py-4">{item.data}</td>
                                <td className="px-6 py-4">{item.horario}</td>
                                <td className="px-6 py-4">{item.telefone}</td>
                                <td className="px-6 py-4 text-green-400">R${item.valor},00</td>
                                <td className="px-6 py-4">
                                    <div className='flex gap-3'>
                                        <button 
                                            className='bg-blue-500 p-2 rounded-md text-white'
                                            onClick={() => onEditar(item)}
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            className='bg-red-500 p-2 rounded-md text-white'
                                            onClick={() => handleCancelar(item)}
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Componente de Paginação */}
                <div className="flex items-center justify-between px-6 py-3 bg-gray-50">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                            Mostrando {indiceInicial + 1} até {Math.min(indiceFinal, dados.length)} de {dados.length} registros
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePaginaAnterior}
                            disabled={paginaAtual === 1}
                            className={`p-2 rounded-md ${
                                paginaAtual === 1
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-violet-400 text-white hover:bg-violet-500'
                            }`}
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className="px-4 py-2 text-sm text-gray-700">
                            Página {paginaAtual} de {totalPaginas}
                        </span>

                        <button
                            onClick={handleProximaPagina}
                            disabled={paginaAtual === totalPaginas}
                            className={`p-2 rounded-md ${
                                paginaAtual === totalPaginas
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-violet-400 text-white hover:bg-violet-500'
                            }`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmação de Cancelamento */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {agendamentoSelecionado && (
                    <>
                        <h3 className="text-xl font-semibold text-center">Confirmar Cancelamento</h3>
                        <p className="text-center mt-4">
                            Deseja realmente cancelar o agendamento?
                        </p>
                        <div className="text-center mt-4">
                            <div className="mb-4">
                                <p><strong>ID:</strong> {agendamentoSelecionado.id}</p>
                                <p><strong>Nome:</strong> {agendamentoSelecionado.nome}</p>
                                <p><strong>Serviço:</strong> {agendamentoSelecionado.servico}</p>
                                <p><strong>Data:</strong> {agendamentoSelecionado.data}</p>
                                <p><strong>Hora:</strong> {agendamentoSelecionado.horario}</p>
                            </div>
                            <button
                                onClick={handleConfirmarCancelamento}
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 mr-4"
                            >
                                Confirmar Cancelamento
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                            >
                                Fechar
                            </button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    );
};

export default Tabela;
