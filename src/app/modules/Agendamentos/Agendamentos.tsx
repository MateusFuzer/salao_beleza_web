'use client'
import FormularioAgendamento from "@/app/Components/FormularioAgendamento/FormularioAgendamento";
import { Tabela, Agendamento as TabelaAgendamento } from "@/app/Components/Table/Table";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "@/app/Components/Modal/Modal";

interface Agendamento {
    id: string;
    data: string;
    horario: string;
    cliente: string;
    servico: string;
    status: string;
    nome: string;
    telefone: string;
    valor: number;
}

export default function Agendamentos(){
    const [ showFormularioDeAgendamento, setShowFormularioDeAgendamento ] = useState(false)
    const [ agendamentoParaEditar, setAgendamentoParaEditar ] = useState<Agendamento | null>(null)
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ agendamentoParaCancelar, setAgendamentoParaCancelar ] = useState<Agendamento | null>(null);

    const handleEditarAgendamento = (agendamento: Agendamento) => {
        setAgendamentoParaEditar(agendamento)
        setShowFormularioDeAgendamento(true)
    }

    const handleVoltarParaLista = () => {
        setShowFormularioDeAgendamento(false)
        setAgendamentoParaEditar(null)
    }

    const handleCancelar = (agendamento: Agendamento) => {
        setAgendamentoParaCancelar(agendamento);
        setIsModalOpen(true);
    };

    const handleConfirmarCancelamento = () => {
        if (agendamentoParaCancelar) {
            console.log(`Agendamento cancelado: ${agendamentoParaCancelar.id}`);
        }
        setIsModalOpen(false);
    };

    const colunas = [
        { header: 'ID', accessor: 'id' as keyof Agendamento },
        { header: 'Nome', accessor: 'nome' as keyof Agendamento },
        { header: 'Status', accessor: 'status' as keyof Agendamento },
        { header: 'Serviço', accessor: 'servico' as keyof Agendamento },
        { header: 'Data', accessor: 'data' as keyof Agendamento },
        { header: 'Hora', accessor: 'horario' as keyof Agendamento },
        { header: 'Telefone', accessor: 'telefone' as keyof Agendamento },
        { header: 'Valor', accessor: 'valor' as keyof Agendamento }
    ];

    const dados: Agendamento[] = [
        { 
            id: "1", 
            nome: 'Beatriz Valezio', 
            status: 'Aberto', 
            servico: 'Cabelo', 
            data: "2024-02-14",
            horario: "08:10",
            telefone: "14996145208", 
            valor: 50,
            cliente: 'Beatriz Valezio'
        }
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
                <span className="text-gray-700 font-bold">Agendamentos em aberto</span>
                <div>
                    <Tabela 
                        dados={dados} 
                        colunas={colunas} 
                        onEditar={handleEditarAgendamento}
                        onCancelar={handleCancelar}
                    />
                </div>
            </div>}

            {/* FORMULÁRIO DE AGENDAMENTO (NOVO OU EDIÇÃO) */}
            {showFormularioDeAgendamento &&
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <span className="text-gray-700 font-bold">
                    {agendamentoParaEditar ? 'Editar agendamento' : 'Novo agendamento'}
                </span>
                <FormularioAgendamento 
                    agendamento={agendamentoParaEditar}
                />
            </div>
            }

            {/* Modal de Cancelamento */}
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
        </div>
    )
}