'use client'
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface Agendamento {
    id: string;
    nome: string;
    telefone: string;
    servico: string;
    data: string;
    horario: string;
    valor: number;
    status: string;
    usuarioId: string;
}

interface Column {
    header: string;
    accessor: keyof Agendamento;
    render?: (item: Agendamento) => React.ReactNode;
}

interface TabelaProps {
    dados: Agendamento[];
    colunas: Column[];
    onEditar?: (agendamento: Agendamento) => void;
    onCancelar?: (agendamento: Agendamento) => void;
}

const ITENS_POR_PAGINA = 5;

export const Tabela = ({ dados, colunas, onEditar, onCancelar }: TabelaProps) => {
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

    const getcorStatus = (status: string) => {
        switch(status) {
            case "Aberto":
                return "text-green-400"
            case "Finalizado":
                return "text-blue-400"
            case "Cancelado":
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
                            {colunas.map((coluna, index) => (
                                <th key={index} className="px-6 py-3 text-left">
                                    {coluna.header}
                                </th>
                            ))}
                            {(onEditar || onCancelar) && (
                                <th className="px-6 py-3 text-left">Ações</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {dadosPaginados.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                {colunas.map((coluna, index) => (
                                    <td key={index} className={`px-6 py-4 ${
                                        coluna.accessor === 'status' ? getcorStatus(item.status) : 
                                        coluna.accessor === 'valor' ? 'text-green-400' : ''
                                    }`}>
                                        {coluna.render 
                                            ? coluna.render(item)
                                            : coluna.accessor === 'valor' 
                                                ? `R$${item[coluna.accessor]},00`
                                                : item[coluna.accessor]}
                                    </td>
                                ))}
                                {(onEditar || onCancelar) && (
                                    <td className="px-6 py-4">
                                        <div className='flex gap-3'>
                                            {onEditar && (
                                                <button 
                                                    className='bg-blue-500 p-2 rounded-md text-white'
                                                    onClick={() => onEditar(item)}
                                                >
                                                    Editar
                                                </button>
                                            )}
                                            {onCancelar && (
                                                <button 
                                                    className='bg-red-500 p-2 rounded-md text-white'
                                                    onClick={() => onCancelar(item)}
                                                >
                                                    Cancelar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
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
        </div>
    );
};
