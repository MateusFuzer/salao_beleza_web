import { Agendamento, AgendamentoRepository } from './repository';
import { UsuarioRepository } from '../Login/repository';

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
    usuarioId: string;
}

export class AgendamentoService {
    private repository: AgendamentoRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.repository = new AgendamentoRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    getAllAgendamentos(): Agendamento[] {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) return [];

        const agendamentos = this.repository.getAll();
        
        // Se for admin, retorna todos os agendamentos
        // Se for usuário comum, retorna apenas os seus
        const agendamentosFiltrados = usuarioLogado.tipo === 'ADMIN' 
            ? agendamentos 
            : agendamentos.filter(ag => ag.usuarioId === usuarioLogado.id);

        return agendamentosFiltrados.sort((a, b) => {
            const dataA = new Date(`${a.data}T${a.horario}`);
            const dataB = new Date(`${b.data}T${b.horario}`);
            return dataB.getTime() - dataA.getTime();
        });
    }

    cancelarAgendamento(id: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        this.repository.updateStatus(id, 'Cancelado', usuarioLogado);
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
            const index = agendamentos.findIndex(a => a.id === id);
            if (index !== -1) {
                agendamentos[index] = novoAgendamento;
            }
        } else {
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
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) return [];

        const agendamentos = this.repository.getAll();
        
        // Filtra por status aberto e aplica regra de permissão
        const agendamentosFiltrados = (usuarioLogado.tipo === 'ADMIN' 
            ? agendamentos 
            : agendamentos.filter(ag => ag.usuarioId === usuarioLogado.id))
            .filter(agendamento => agendamento.status === 'Aberto');

        return agendamentosFiltrados.sort((a, b) => {
            const dataA = new Date(`${a.data}T${a.horario}`);
            const dataB = new Date(`${b.data}T${b.horario}`);
            return dataB.getTime() - dataA.getTime();
        });
    }

    finalizarAgendamento(id: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        this.repository.updateStatus(id, 'Finalizado', usuarioLogado);
    }
} 