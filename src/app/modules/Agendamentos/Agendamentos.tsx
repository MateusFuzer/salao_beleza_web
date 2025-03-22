import FormularioAgendamento from "@/app/Components/FormularioAgendamento/FormularioAgendamento";
import Tabela from "@/app/Components/Table/Table";
import { Plus } from "lucide-react";

export default function Agendamentos(){
    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-2 flex flex-col gap-4 ">
            <span className="text-gray-700 font-bold">Agendamentos</span>
            <div className="p-4 w-full bg-white rounded-md">
                <button className="bg-green-500 p-2 rounded-md text-white font-bold flex gap-2 cursor-pointer">
                    <Plus color="white" size={20} />
                    Novo agendamento
                </button>
            </div>

            {/* AGENDAMENTOS QUE ESTAO EM ABERTO */}
{/* 
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
                <span className="text-gray-700 font-bold">Agendamentos em aberto</span>
                <div>
                    <Tabela/>
                </div>
            </div> */}

            {/* NOVO AGENDAMENTO */}
            <div className="p-4 w-full bg-white rounded-md flex flex-1 flex-col">
            <span className="text-gray-700 font-bold">Novo agendamento</span>
                <FormularioAgendamento/>
            </div>

        </div>
    )
}