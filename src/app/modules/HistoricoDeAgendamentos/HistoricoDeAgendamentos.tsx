'use client'
import { Tabela, Agendamento } from "@/app/Components/Table/Table";
import Modal from "@/app/Components/Modal/Modal";
import { useState } from "react";
import { Eye } from "lucide-react";

interface AgendamentoHistorico extends Agendamento {
    finalizadoPor: string;
    dataFinalizacao: string;
}

export default function HistoricoDeAgendamentos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<AgendamentoHistorico | null>(null);

    const handleVisualizarDetalhes = (agendamento: AgendamentoHistorico) => {
        setAgendamentoSelecionado(agendamento);
        setIsModalOpen(true);
    };

    const colunas = [
        { header: 'ID', accessor: 'id' as keyof Agendamento },
        { header: 'Nome', accessor: 'nome' as keyof Agendamento },
        { header: 'Status', accessor: 'status' as keyof Agendamento },
        { header: 'Serviço', accessor: 'servico' as keyof Agendamento },
        { header: 'Data', accessor: 'data' as keyof Agendamento },
        { header: 'Hora', accessor: 'horario' as keyof Agendamento },
        { header: 'Telefone', accessor: 'telefone' as keyof Agendamento },
        { header: 'Valor', accessor: 'valor' as keyof Agendamento },
        {
            header: 'Ação',
            accessor: 'id' as keyof Agendamento,
            render: (item: Agendamento) => (
                <button 
                    onClick={() => handleVisualizarDetalhes(item as AgendamentoHistorico)}
                    className="bg-blue-500 p-2 rounded-md text-white flex items-center gap-2 hover:bg-blue-600"
                >
                    <Eye size={16} />
                    Visualizar
                </button>
            )
        }
    ];

    const dados: AgendamentoHistorico[] = [
        { 
            id: "1", 
            nome: 'Beatriz Valezio', 
            status: 'Finalizado', 
            servico: 'Cabelo', 
            data: "2024-02-14",
            horario: "08:10",
            telefone: "14996145208", 
            valor: 50,
            finalizadoPor: "Maria Silva",
            dataFinalizacao: "2024-02-14 08:45"
        }
    ];

    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-2 flex flex-col gap-4 ">
            <span className="text-gray-700 font-bold">Histórico de Agendamentos</span>
            
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <span className="text-gray-700 font-bold">Agendamentos realizados</span>
                <div>
                    <Tabela 
                        dados={dados} 
                        colunas={colunas}
                    />
                </div>
            </div>

            {/* Modal de Detalhes */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {agendamentoSelecionado && (
                    <>
                        <h3 className="text-xl font-semibold text-center">Detalhes do Agendamento</h3>
                        <div className="mt-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <p className="mb-2"><strong>Cliente:</strong> {agendamentoSelecionado.nome}</p>
                                <p className="mb-2"><strong>Serviço:</strong> {agendamentoSelecionado.servico}</p>
                                <p className="mb-2"><strong>Data:</strong> {agendamentoSelecionado.data}</p>
                                <p className="mb-2"><strong>Hora:</strong> {agendamentoSelecionado.horario}</p>
                                <p className="mb-2"><strong>Valor:</strong> R${agendamentoSelecionado.valor},00</p>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-green-600 mb-2">
                                        <strong>Finalizado por:</strong> {agendamentoSelecionado.finalizadoPor}
                                    </p>
                                    <p className="text-green-600">
                                        <strong>Data de finalização:</strong> {agendamentoSelecionado.dataFinalizacao}
                                    </p>
                                </div>
                            </div>
                            <div className="text-center mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                                >
                                    Fechar
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    )
} 