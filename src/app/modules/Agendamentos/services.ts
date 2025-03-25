import { Agendamento, AgendamentoRepository } from './repository';
import { UsuarioRepository } from '../Login/repository';
import { Usuario } from '../Login/repository';

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

    alterarStatus(id: string, novoStatus: Agendamento['status'], observacao?: string): void {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        if (!this.podeAlterarStatus(usuarioLogado, novoStatus)) {
            throw new Error('Você não tem permissão para realizar esta ação');
        }

        this.repository.updateStatus(id, novoStatus, usuarioLogado, observacao);
    }

    private podeAlterarStatus(usuario: Usuario, novoStatus: Agendamento['status']): boolean {
        if (usuario.tipo === 'ADMIN' || usuario.tipo === 'FUNCIONARIO') return true;
        
        if (usuario.tipo === 'USUARIO') {
            return novoStatus === 'Cancelado';
        }

        return false;
    }

    private verificarEAjustarDataAgendamento(dados: NovoAgendamento): { dados: NovoAgendamento, dataAjustada: boolean } {
        const agendamentosDaSemana = this.getAgendamentosDaSemana(dados.usuarioId, dados.data);
        
        const outrosAgendamentosDaSemana = agendamentosDaSemana.filter(ag => 
            ag.usuarioId === dados.usuarioId && 
            ag.data !== dados.data
        );
        
        if (outrosAgendamentosDaSemana.length > 0) {
            const agendamentoExistente = outrosAgendamentosDaSemana[0];
            
            return {
                dados: {
                    ...dados,
                    data: agendamentoExistente.data
                },
                dataAjustada: true
            };
        }

        return { dados, dataAjustada: false };
    }

    private getAgendamentosDaSemana(usuarioId: string, data: string): Agendamento[] {
        const agendamentos = this.repository.getAllByUsuario(usuarioId);
        const dataReferencia = new Date(data);
        const inicioSemana = new Date(dataReferencia);
        inicioSemana.setDate(dataReferencia.getDate() - dataReferencia.getDay());
        const fimSemana = new Date(inicioSemana);
        fimSemana.setDate(inicioSemana.getDate() + 6);

        return agendamentos.filter(agendamento => {
            const dataAgendamento = new Date(agendamento.data);
            return (
                dataAgendamento >= inicioSemana && 
                dataAgendamento <= fimSemana &&
                agendamento.status !== 'Cancelado' &&
                agendamento.status !== 'Finalizado'
            );
        });
    }

    salvarAgendamento(dados: NovoAgendamento, id?: string): { success: boolean, dataAjustada: boolean } {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) throw new Error('Usuário não está logado');

        const agendamentos = this.repository.getAll();
        
        if (id) {
            const agendamentoExistente = agendamentos.find(a => a.id === id);
            if (!agendamentoExistente) {
                throw new Error('Agendamento não encontrado');
            }

            const { dados: dadosAjustados, dataAjustada } = this.verificarEAjustarDataAgendamento(dados);

            const agendamentoAtualizado = {
                ...agendamentoExistente,
                ...dadosAjustados,
                id,
                usuarioId: agendamentoExistente.usuarioId,
                status: agendamentoExistente.status
            };

            const agendamentosAtualizados = agendamentos.map(ag => 
                ag.id === id ? agendamentoAtualizado : ag
            );

            this.repository.save(agendamentosAtualizados);
            return { success: true, dataAjustada };
        } else {
            const { dados: dadosAjustados, dataAjustada } = this.verificarEAjustarDataAgendamento(dados);

            const novoAgendamento: Agendamento = {
                id: new Date().getTime().toString(),
                ...dadosAjustados,
                status: 'Solicitacao pendente',
                usuarioId: dados.usuarioId,
                solicitadoPor: {
                    nome: usuarioLogado.nome,
                    data: new Date().toISOString().split('T')[0],
                    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
                }
            };

            agendamentos.push(novoAgendamento);
            this.repository.save(agendamentos);
            return { success: true, dataAjustada };
        }
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