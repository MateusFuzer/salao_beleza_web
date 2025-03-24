import { Agendamento, AgendamentoRepository } from './repository';
import { UsuarioRepository } from '../Login/repository';
import { Usuario } from '../Login/repository';

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

    private podeAlterarStatus(usuario: Usuario, novoStatus: string): boolean {
        if (usuario.tipo === 'ADMIN') return true;
        
        if (usuario.tipo === 'USUARIO') {
            return novoStatus === 'Cancelado';
        }

        return ['Confirmado', 'Finalizado'].includes(novoStatus);
    }

    alterarStatus(id: string, novoStatus: Agendamento['status'], observacao?: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        if (!this.podeAlterarStatus(usuarioLogado, novoStatus)) {
            throw new Error('Você não tem permissão para realizar esta ação');
        }

        this.repository.updateStatus(id, novoStatus, usuarioLogado, observacao);
    }

    salvarAgendamento(dados: NovoAgendamento, id?: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        const agendamentos = this.repository.getAll();
        
        const novoAgendamento: Agendamento = {
            id: id || new Date().getTime().toString(),
            ...dados,
            status: 'Solicitacao pendente',
            solicitadoPor: {
                nome: usuarioLogado.nome,
                data: new Date().toISOString().split('T')[0],
                hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
            }
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
        
        // Filtra por status e aplica regra de permissão
        const agendamentosFiltrados = (usuarioLogado.tipo === 'ADMIN' 
            ? agendamentos 
            : agendamentos.filter(ag => ag.usuarioId === usuarioLogado.id))
            .filter(agendamento => 
                agendamento.status === 'Solicitacao pendente' || 
                agendamento.status === 'Confirmado'
            );

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