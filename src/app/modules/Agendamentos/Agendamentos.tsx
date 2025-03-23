'use client'
import FormularioAgendamento from "@/app/Components/FormularioAgendamento/FormularioAgendamento";
import Tabela from "@/app/Components/Table/Table";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

interface Agendamento {
    id: string;
    data: string;
    horario: string;
    cliente: string;
    servico: string;
    status: string;
}

export default function Agendamentos(){
    const [ showFormularioDeAgendamento, setShowFormularioDeAgendamento ] = useState(false)
    const [ agendamentoParaEditar, setAgendamentoParaEditar ] = useState<Agendamento | null>(null)

    const handleEditarAgendamento = (agendamento: Agendamento) => {
        setAgendamentoParaEditar(agendamento)
        setShowFormularioDeAgendamento(true)
    }

    const handleVoltarParaLista = () => {
        setShowFormularioDeAgendamento(false)
        setAgendamentoParaEditar(null)
    }

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
                    <Tabela onEditar={handleEditarAgendamento}/>
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
        </div>
    )
}