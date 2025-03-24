import { AgendamentoService, AgendamentoComCliente, NovoAgendamento } from './services';
import { Agendamento } from './repository';

export class AgendamentoController {
    private service: AgendamentoService;

    constructor() {
        this.service = new AgendamentoService();
    }

    carregarAgendamentos(): Agendamento[] {
        return this.service.getAllAgendamentos();
    }

    carregarAgendamentosEmAberto(): Agendamento[] {
        return this.service.getAgendamentosEmAberto();
    }

    handleCancelarAgendamento(id: string): void {
        this.service.cancelarAgendamento(id);
    }

    prepararAgendamentoParaEdicao(agendamento: Agendamento): AgendamentoComCliente {
        return this.service.editarAgendamento(agendamento);
    }

    handleSubmit(dados: NovoAgendamento, id?: string): void {
        this.service.salvarAgendamento(dados, id);
    }

    calcularValorServico(servico: string): number {
        return this.service.calcularValorServico(servico);
    }

    alterarStatus(id: string, novoStatus: Agendamento['status'], observacao?: string): void {
        this.service.alterarStatus(id, novoStatus, observacao);
    }

    loadAgendamentos(): void {
        return this.service.getAllAgendamentos();
    }
} 