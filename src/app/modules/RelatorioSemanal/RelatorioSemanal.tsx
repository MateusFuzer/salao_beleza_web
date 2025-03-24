'use client'
import { useState, useEffect } from 'react';
import { RelatorioController } from './controller';
import { Calendar } from 'lucide-react';

interface RelatorioSemanal {
    totalAgendamentos: number;
    totalValor: number;
    agendamentosPorStatus: {
        [key: string]: number;
    };
    agendamentosPorServico: {
        [key: string]: number;
    };
}

export default function RelatorioSemanal() {
    const [relatorio, setRelatorio] = useState<RelatorioSemanal | null>(null);
    const [dataInicio, setDataInicio] = useState(new Date().toISOString().split('T')[0]);
    const controller = new RelatorioController();

    useEffect(() => {
        carregarRelatorio();
    }, [dataInicio]);

    const carregarRelatorio = () => {
        const dados = controller.gerarRelatorioSemanal(dataInicio);
        setRelatorio(dados);
    };

    if (!relatorio) return null;

    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Relatório Semanal</h2>
                    <div className="flex items-center gap-4">
                        <Calendar size={20} className="text-violet-500" />
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-violet-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-violet-600 mb-2">Total de Agendamentos</h3>
                        <p className="text-3xl font-bold text-violet-700">{relatorio.totalAgendamentos}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-600 mb-2">Valor Total</h3>
                        <p className="text-3xl font-bold text-green-700">
                            R$ {relatorio.totalValor.toFixed(2)}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Agendamentos por Status</h3>
                        <div className="space-y-2">
                            {Object.entries(relatorio.agendamentosPorStatus).map(([status, quantidade]) => (
                                <div key={status} className="flex justify-between items-center">
                                    <span className="text-gray-600">{status}</span>
                                    <span className="font-semibold">{quantidade}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Agendamentos por Serviço</h3>
                        <div className="space-y-2">
                            {Object.entries(relatorio.agendamentosPorServico).map(([servico, quantidade]) => (
                                <div key={servico} className="flex justify-between items-center">
                                    <span className="text-gray-600">{servico}</span>
                                    <span className="font-semibold">{quantidade}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 