'use client'
import { Tabela, Agendamento } from "@/app/Components/Table/Table";

export default function HistoricoDeAgendamentos() {
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
            status: 'Finalizado', 
            servico: 'Cabelo', 
            data: "2024-02-14",
            horario: "08:10",
            telefone: "14996145208", 
            valor: 50
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
        </div>
    )
} 