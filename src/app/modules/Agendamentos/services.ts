import { Agendamento, AgendamentoRepository } from './repository';

// Interface para o agendamento com o campo cliente
export interface AgendamentoComCliente extends Agendamento {
    cliente: string;
}

export interface NovoAgendamento {
    nome: string;
    telefone: string;
    servico: string;
    data: string;
    horario: string;
    valor: number;
}

export class AgendamentoService {
    private repository: AgendamentoRepository;

    constructor() {
        this.repository = new AgendamentoRepository();
    }

    getAllAgendamentos(): Agendamento[] {
        return this.repository.getAll();
    }

    cancelarAgendamento(id: string): void {
        this.repository.updateStatus(id, 'Cancelado');
    }

    editarAgendamento(agendamento: Agendamento): AgendamentoComCliente {
        return {
            ...agendamento,
            cliente: agendamento.nome
        };
    }

    salvarAgendamento(dados: NovoAgendamento, id?: string): void {
        const agendamentos = this.repository.getAll();
        
        const novoAgendamento: Agendamento = {
            id: id || new Date().getTime().toString(),
            ...dados,
            status: 'Aberto'
        };

        if (id) {
            // Atualiza agendamento existente
            const index = agendamentos.findIndex(a => a.id === id);
            if (index !== -1) {
                agendamentos[index] = novoAgendamento;
            }
        } else {
            // Adiciona novo agendamento
            agendamentos.push(novoAgendamento);
        }

        this.repository.save(agendamentos);
    }

    calcularValorServico(servico: string): number {
        const valores: Record<string, number> = {
            'Unha': 20,
            'Maquiagem': 30,
            'Cabelo': 50
        };
        return valores[servico] || 0;
    }

    getAgendamentosEmAberto(): Agendamento[] {
        const agendamentos = this.repository.getAll();
        return agendamentos.filter(agendamento => agendamento.status === 'Aberto');
    }
} 