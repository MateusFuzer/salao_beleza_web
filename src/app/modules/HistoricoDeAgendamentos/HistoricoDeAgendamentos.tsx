'use client'
import { Tabela, Agendamento as TabelaAgendamento } from "@/app/Components/Table/Table";
import Modal from "@/app/Components/Modal/Modal";
import { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { HistoricoController } from "./controller";
import { UsuarioRepository } from "../Login/repository";
import { useAuth } from "@/app/contexts/AuthContext";
import { StatusInfo } from "../Agendamentos/repository";

interface HistoricoAgendamento extends TabelaAgendamento {
    solicitadoPor: StatusInfo;
    confirmadoPor?: StatusInfo;
    finalizadoPor?: StatusInfo;
    canceladoPor?: StatusInfo;
}

export default function HistoricoDeAgendamentos() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<HistoricoAgendamento | null>(null);
    const [agendamentos, setAgendamentos] = useState<HistoricoAgendamento[]>([]);
    const { isAdmin, isFuncionario } = useAuth();
    const usuarioRepository = new UsuarioRepository();
    const controller = new HistoricoController();

    const loadAgendamentos = () => {
        const agendamentosCarregados = controller.carregarTodosAgendamentos();
        setAgendamentos(agendamentosCarregados);
    };

    useEffect(() => {
        loadAgendamentos();
    }, []);


    const handleVisualizarDetalhes = (agendamento: HistoricoAgendamento) => {
        setAgendamentoSelecionado(agendamento);
        setIsModalOpen(true);
    };

    const colunas = [
        { header: 'ID', accessor: 'id' as keyof TabelaAgendamento },
        { header: 'Nome', accessor: 'nome' as keyof TabelaAgendamento },
        { header: 'Status', accessor: 'status' as keyof TabelaAgendamento },
        { header: 'Serviço', accessor: 'servico' as keyof TabelaAgendamento },
        { header: 'Data', accessor: 'data' as keyof TabelaAgendamento },
        { header: 'Hora', accessor: 'horario' as keyof TabelaAgendamento },
        { header: 'Telefone', accessor: 'telefone' as keyof TabelaAgendamento },
        { header: 'Valor', accessor: 'valor' as keyof TabelaAgendamento },
        {
            header: 'Ação',
            accessor: 'id' as keyof TabelaAgendamento,
            render: (agendamento: TabelaAgendamento) => {
                const agendamentoCompleto = agendamentos.find(a => a.id === agendamento.id);
                if (!agendamentoCompleto) return null;
                
                return (
                    <button 
                        onClick={() => handleVisualizarDetalhes(agendamentoCompleto)}
                        className="cursor-pointer bg-blue-500 p-2 rounded-md text-white flex items-center gap-2 hover:bg-blue-600"
                    >
                        <Eye size={16} />
                        Visualizar
                    </button>
                );
            }
        }
    ];

    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-2 flex flex-col gap-4">
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-bold">
                        {isAdmin ? 'Histórico Completo de Agendamentos' : 'Meu Histórico de Agendamentos'}
                    </span>
                    <span className="text-sm text-gray-500">
                        {agendamentos.length} agendamento(s) no total
                    </span>
                </div>
                <div>
                    <Tabela 
                        dados={agendamentos as TabelaAgendamento[]} 
                        colunas={colunas}
                        isAdmin={isAdmin}
                        isFuncionario={isFuncionario}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Detalhes do Agendamento</h2>
                    {agendamentoSelecionado && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">Nome</p>
                                    <p className="font-medium">{agendamentoSelecionado.nome}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Telefone</p>
                                    <p className="font-medium">{agendamentoSelecionado.telefone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Serviço</p>
                                    <p className="font-medium">{agendamentoSelecionado.servico}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Valor</p>
                                    <p className="font-medium">R$ {agendamentoSelecionado.valor}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Data</p>
                                    <p className="font-medium">{agendamentoSelecionado.data}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Hora</p>
                                    <p className="font-medium">{agendamentoSelecionado.horario}</p>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <h3 className="font-semibold mb-2">Status do Agendamento</h3>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm text-gray-500">Solicitado por</p>
                                        <p className="font-medium">
                                            {agendamentoSelecionado.solicitadoPor.nome} em {agendamentoSelecionado.solicitadoPor.data} às {agendamentoSelecionado.solicitadoPor.hora}
                                        </p>
                                    </div>
                                    {agendamentoSelecionado.confirmadoPor && (
                                        <div>
                                            <p className="text-sm text-gray-500">Confirmado por</p>
                                            <p className="font-medium">
                                                {agendamentoSelecionado.confirmadoPor.nome} em {agendamentoSelecionado.confirmadoPor.data} às {agendamentoSelecionado.confirmadoPor.hora}
                                            </p>
                                        </div>
                                    )}
                                    {agendamentoSelecionado.finalizadoPor && (
                                        <div>
                                            <p className="text-sm text-gray-500">Finalizado por</p>
                                            <p className="font-medium">
                                                {agendamentoSelecionado.finalizadoPor.nome} em {agendamentoSelecionado.finalizadoPor.data} às {agendamentoSelecionado.finalizadoPor.hora}
                                            </p>
                                        </div>
                                    )}
                                    {agendamentoSelecionado.canceladoPor && (
                                        <div>
                                            <p className="text-sm text-gray-500">Cancelado por</p>
                                            <p className="font-medium">
                                                {agendamentoSelecionado.canceladoPor.nome} em {agendamentoSelecionado.canceladoPor.data} às {agendamentoSelecionado.canceladoPor.hora}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
} 