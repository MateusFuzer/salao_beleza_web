import { Usuario } from '../Login/repository';

export interface StatusInfo {
    nome: string;
    data: string;
    hora: string;
    observacao?: string;
}

export interface Agendamento {
    id: string;
    nome: string;
    telefone: string;
    servico: string;
    data: string;
    horario: string;
    valor: number;
    status: 'Solicitacao pendente' | 'Confirmado' | 'Finalizado' | 'Cancelado';
    usuarioId: string;
    solicitadoPor: StatusInfo;
    confirmadoPor?: StatusInfo;
    finalizadoPor?: StatusInfo;
    canceladoPor?: StatusInfo;
}

export class AgendamentoRepository {
    private STORAGE_KEY = 'agendamentos';

    getAll(): Agendamento[] {
        const savedAgendamentos = localStorage.getItem(this.STORAGE_KEY);
        return savedAgendamentos ? JSON.parse(savedAgendamentos) : [];
    }

    getAllByUsuario(usuarioId: string): Agendamento[] {
        const agendamentos = this.getAll();
        return agendamentos.filter(ag => ag.usuarioId === usuarioId);
    }

    save(agendamentos: Agendamento[]): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(agendamentos));
    }

    updateStatus(id: string, status: Agendamento['status'], usuario: Usuario, observacao?: string): void {
        const agendamentos = this.getAll();
        const dataAtual = new Date();
        
        const statusInfo: StatusInfo = {
            nome: usuario.nome,
            data: dataAtual.toISOString().split('T')[0],
            hora: dataAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            observacao
        };

        const agendamentosAtualizados = agendamentos.map(ag => {
            if (ag.id === id) {
                const atualizacao: Partial<Agendamento> = { 
                    ...ag,
                    status 
                };

                switch (status) {
                    case 'Confirmado':
                        atualizacao.confirmadoPor = statusInfo;
                        break;
                    case 'Finalizado':
                        atualizacao.finalizadoPor = statusInfo;
                        break;
                    case 'Cancelado':
                        atualizacao.canceladoPor = statusInfo;
                        break;
                }

                return { ...ag, ...atualizacao };
            }
            return ag;
        });

        this.save(agendamentosAtualizados);
    }
} 