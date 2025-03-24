'use client'
import { Tabela, Agendamento } from "@/app/Components/Table/Table";
import Modal from "@/app/Components/Modal/Modal";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { HistoricoController } from "./controller";

export default function HistoricoDeAgendamentos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

    const controller = new HistoricoController();

    useEffect(() => {
        const todosAgendamentos = controller.carregarTodosAgendamentos();
        setAgendamentos(todosAgendamentos);
    }, []);

    const handleVisualizarDetalhes = (agendamento: Agendamento) => {
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
            render: (agendamento: Agendamento) => (
                <button 
                    onClick={() => handleVisualizarDetalhes(agendamento)}
                    className="bg-blue-500 p-2 rounded-md text-white flex items-center gap-2 hover:bg-blue-600"
                >
                    <Eye size={16} />
                    Visualizar
                </button>
            )
        }
    ];

    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-2 flex flex-col gap-4">
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-bold">Histórico de Agendamentos</span>
                    <span className="text-sm text-gray-500">
                        {agendamentos.length} agendamento(s) no total
                    </span>
                </div>
                <div>
                    <Tabela 
                        dados={agendamentos} 
                        colunas={colunas}
                    />
                </div>
            </div>

            {/* Modal de Detalhes */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {agendamentoSelecionado && (
                    <>
                        <h3 className="text-xl font-semibold text-center mb-4">
                            Detalhes do Agendamento
                        </h3>
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p><strong>ID:</strong> {agendamentoSelecionado.id}</p>
                                <p><strong>Nome:</strong> {agendamentoSelecionado.nome}</p>
                                <p><strong>Serviço:</strong> {agendamentoSelecionado.servico}</p>
                                <p><strong>Data:</strong> {agendamentoSelecionado.data}</p>
                                <p><strong>Hora:</strong> {agendamentoSelecionado.horario}</p>
                                <p><strong>Telefone:</strong> {agendamentoSelecionado.telefone}</p>
                                <p><strong>Valor:</strong> R$ {agendamentoSelecionado.valor}</p>
                                <p><strong>Status:</strong> {agendamentoSelecionado.status}</p>
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
    );
} 