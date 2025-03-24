import { AgendamentoRepository, Agendamento } from '../Agendamentos/repository';

export class RelatorioService {
    private repository: AgendamentoRepository;

    constructor() {
        this.repository = new AgendamentoRepository();
    }

    gerarRelatorioSemanal(dataInicio: string) {
        const agendamentos = this.repository.getAll();
        const dataRef = new Date(dataInicio);
        const inicioSemana = new Date(dataRef);
        const fimSemana = new Date(dataRef);
        fimSemana.setDate(dataRef.getDate() + 6);

        const agendamentosDaSemana = agendamentos.filter(agendamento => {
            const dataAgendamento = new Date(agendamento.data);
            return dataAgendamento >= inicioSemana && dataAgendamento <= fimSemana;
        });

        const totalValor = agendamentosDaSemana.reduce((total, ag) => total + ag.valor, 0);

        const agendamentosPorStatus = agendamentosDaSemana.reduce((acc, ag) => {
            acc[ag.status] = (acc[ag.status] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        const agendamentosPorServico = agendamentosDaSemana.reduce((acc, ag) => {
            acc[ag.servico] = (acc[ag.servico] || 0) + 1;
            return acc;
        }, {} as { [key: string]: number });

        return {
            totalAgendamentos: agendamentosDaSemana.length,
            totalValor,
            agendamentosPorStatus,
            agendamentosPorServico
        };
    }
} 