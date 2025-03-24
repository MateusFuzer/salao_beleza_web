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
        if (usuario.tipo === 'ADMIN' || usuario.tipo === 'FUNCIONARIO') return true;
        
        if (usuario.tipo === 'USUARIO') {
            return novoStatus === 'Cancelado';
        }

        return false;
    }

    alterarStatus(id: string, novoStatus: Agendamento['status'], observacao?: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        if (!this.podeAlterarStatus(usuarioLogado, novoStatus)) {
            throw new Error('Você não tem permissão para realizar esta ação');
        }

        this.repository.updateStatus(id, novoStatus, usuarioLogado, observacao);
    }

    private getAgendamentosDaSemana(usuarioId: string, data: string): Agendamento[] {
        const agendamentos = this.repository.getAllByUsuario(usuarioId);
        const dataReferencia = new Date(data);
        const inicioSemana = new Date(dataReferencia);
        inicioSemana.setDate(dataReferencia.getDate() - dataReferencia.getDay()); // Domingo
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6); // Sábado

        return agendamentos.filter(agendamento => {
            const dataAgendamento = new Date(agendamento.data);
            return dataAgendamento >= inicioSemana && dataAgendamento <= fimSemana;
        });
    }

    salvarAgendamento(dados: NovoAgendamento, id?: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        const agendamentos = this.repository.getAll();
        
        // Verifica se já existe agendamento na mesma semana
        const agendamentosDaSemana = this.getAgendamentosDaSemana(usuarioLogado.id, dados.data);
        
        let dataAgendamento = dados.data;
        let horarioAgendamento = dados.horario;

        if (agendamentosDaSemana.length > 0 && !id) {
            // Se já existe agendamento na semana e não é uma edição,
            // usa a mesma data do primeiro agendamento da semana
            const primeiroAgendamento = agendamentosDaSemana[0];
            dataAgendamento = primeiroAgendamento.data;
        }

        const novoAgendamento: Agendamento = {
            id: id || new Date().getTime().toString(),
            ...dados,
            data: dataAgendamento,
            horario: horarioAgendamento,
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