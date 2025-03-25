'use client'
import FormularioAgendamento from "@/app/Components/FormularioAgendamento/FormularioAgendamento";
import { Tabela, Agendamento as TabelaAgendamento } from "@/app/Components/Table/Table";
import { ArrowLeft, Plus } from "lucide-react";
import { useState, useEffect } from "react";
import Modal from "@/app/Components/Modal/Modal";
import { AgendamentoController } from "./controller";
import { AgendamentoComCliente } from './services';
import { UsuarioRepository } from "../Login/repository";
import { useAuth } from '@/app/contexts/AuthContext';
import { Agendamento } from "./repository";

interface AgendamentoForm extends TabelaAgendamento {
    cliente: string;
}

export default function Agendamentos() {
    const [showFormularioDeAgendamento, setShowFormularioDeAgendamento] = useState(false);
    const [agendamentoParaEditar, setAgendamentoParaEditar] = useState<Agendamento | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [agendamentoParaCancelar, setAgendamentoParaCancelar] = useState<AgendamentoComCliente | null>(null);
    const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [agendamentoParaConfirmar, setAgendamentoParaConfirmar] = useState<Agendamento | null>(null);
    const [showFinalizeModal, setShowFinalizeModal] = useState(false);
    const [agendamentoParaFinalizar, setAgendamentoParaFinalizar] = useState<Agendamento | null>(null);
    const { isAdmin, isFuncionario } = useAuth();
    const controller = new AgendamentoController();

    const loadAgendamentos = () => {
        const agendamentosCarregados = controller.carregarAgendamentosEmAberto();
        setAgendamentos(agendamentosCarregados);
    };

    useEffect(() => {
        loadAgendamentos();
    }, []);

    const handleEditarAgendamento = (agendamento: TabelaAgendamento) => {
        const agendamentoCompleto = agendamentos.find(a => a.id === agendamento.id);
        if (agendamentoCompleto) {
            setAgendamentoParaEditar(agendamentoCompleto);
            setShowFormularioDeAgendamento(true);
        }
    };

    const handleVoltarParaLista = () => {
        setShowFormularioDeAgendamento(false);
        setAgendamentoParaEditar(null);
    };

    const handleCancelar = (agendamento: TabelaAgendamento) => {
        const agendamentoCompleto = agendamentos.find(a => a.id === agendamento.id);
        if (agendamentoCompleto) {
            const agendamentoComCliente: AgendamentoComCliente = {
                ...agendamentoCompleto,
                cliente: agendamentoCompleto.nome
            };
            setAgendamentoParaCancelar(agendamentoComCliente);
            setIsModalOpen(true);
        }
    };

    const handleConfirmarCancelamento = () => {
        if (agendamentoParaCancelar) {
            controller.handleCancelarAgendamento(agendamentoParaCancelar.id);
            const agendamentosAtualizados = controller.carregarAgendamentosEmAberto();
            setAgendamentos(agendamentosAtualizados);
            setIsModalOpen(false);
            setAgendamentoParaCancelar(null);
        }
    };

    const handleConfirmar = (agendamento: TabelaAgendamento) => {
        const agendamentoCompleto = agendamentos.find(a => a.id === agendamento.id);
        if (agendamentoCompleto) {
            setAgendamentoParaConfirmar(agendamentoCompleto);
            setShowConfirmModal(true);
        }
    };

    const handleFinalizar = (agendamento: TabelaAgendamento) => {
        const agendamentoCompleto = agendamentos.find(a => a.id === agendamento.id);
        if (agendamentoCompleto) {
            setAgendamentoParaFinalizar(agendamentoCompleto);
            setShowFinalizeModal(true);
        }
    };

    const handleConfirmarConfirmacao = () => {
        if (agendamentoParaConfirmar) {
            try {
                controller.alterarStatus(agendamentoParaConfirmar.id, 'Confirmado');
                loadAgendamentos();
                setShowConfirmModal(false);
                setAgendamentoParaConfirmar(null);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('Erro ao confirmar agendamento');
                }
            }
        }
    };

    const handleConfirmarFinalizacao = () => {
        if (agendamentoParaFinalizar) {
            try {
                controller.alterarStatus(agendamentoParaFinalizar.id, 'Finalizado');
                loadAgendamentos();
                setShowFinalizeModal(false);
                setAgendamentoParaFinalizar(null);
            } catch (error) {
                if (error instanceof Error) {
                    alert(error.message);
                } else {
                    alert('Erro ao finalizar agendamento');
                }
            }
        }
    };

    const colunas = [
        { header: 'Nome', accessor: 'nome' as keyof TabelaAgendamento },
        { header: 'Status', accessor: 'status' as keyof TabelaAgendamento },
        { header: 'Serviço', accessor: 'servico' as keyof TabelaAgendamento },
        { header: 'Data', accessor: 'data' as keyof TabelaAgendamento },
        { header: 'Hora', accessor: 'horario' as keyof TabelaAgendamento },
        { header: 'Telefone', accessor: 'telefone' as keyof TabelaAgendamento },
        { header: 'Valor', accessor: 'valor' as keyof TabelaAgendamento }
    ];

    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-2 flex flex-col gap-4 ">
            <span className="text-gray-700 font-bold">Agendamentos</span>
            <div className="p-4 w-full bg-white rounded-md flex justify-between">
                <button 
                    className="bg-green-500 p-2 rounded-md text-white font-bold flex gap-2 cursor-pointer" 
                    onClick={() => setShowFormularioDeAgendamento(true)}
                >
                    <Plus color="white" size={20} />
                    Novo agendamento
                </button>
                {
                showFormularioDeAgendamento &&
                <button 
                    className="bg-yellow-500 p-2 rounded-md text-white font-bold flex gap-2 cursor-pointer" 
                    onClick={handleVoltarParaLista}
                >
                    <ArrowLeft color="white" size={20} />
                    Voltar para lista de agendamentos
                </button>
                }
            </div>

            {/* AGENDAMENTOS QUE ESTAO EM ABERTO */}
            {!showFormularioDeAgendamento && 
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700 font-bold">
                        {isAdmin ? 'Todos os Agendamentos em Aberto' : 'Meus Agendamentos em Aberto'}
                    </span>
                    <span className="text-sm text-gray-500">
                        {agendamentos.length} agendamento(s) em aberto
                    </span>
                </div>
                <div>
                    <Tabela 
                        dados={agendamentos as TabelaAgendamento[]} 
                        colunas={colunas} 
                        onEditar={handleEditarAgendamento}
                        onCancelar={handleCancelar}
                        onConfirmar={handleConfirmar}
                        onFinalizar={handleFinalizar}
                        isAdmin={isAdmin}
                        isFuncionario={isFuncionario}
                    />
                </div>
            </div>}

            {showFormularioDeAgendamento &&
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <span className="text-gray-700 font-bold">
                    {agendamentoParaEditar ? 'Editar agendamento' : 'Novo agendamento'}
                </span>
                <FormularioAgendamento 
                    agendamento={agendamentoParaEditar as Agendamento | null}
                />
            </div>
            }

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {agendamentoParaCancelar && (
                    <>
                        <h3 className="text-xl font-semibold text-center">Confirmar Cancelamento</h3>
                        <p className="text-center mt-4">
                            Deseja realmente cancelar o agendamento?
                        </p>
                        <div className="text-center mt-4">
                            <div className="mb-4">
                                <p><strong>ID:</strong> {agendamentoParaCancelar.id}</p>
                                <p><strong>Nome:</strong> {agendamentoParaCancelar.nome}</p>
                                <p><strong>Serviço:</strong> {agendamentoParaCancelar.servico}</p>
                                <p><strong>Data:</strong> {agendamentoParaCancelar.data}</p>
                                <p><strong>Hora:</strong> {agendamentoParaCancelar.horario}</p>
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

            <Modal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}>
                {agendamentoParaConfirmar && (
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Confirmar Agendamento</h3>
                        <p>Deseja confirmar este agendamento?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmarConfirmacao}
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal isOpen={showFinalizeModal} onClose={() => setShowFinalizeModal(false)}>
                {agendamentoParaFinalizar && (
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Finalizar Agendamento</h3>
                        <p>Deseja finalizar este agendamento?</p>
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                onClick={() => setShowFinalizeModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmarFinalizacao}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Finalizar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}