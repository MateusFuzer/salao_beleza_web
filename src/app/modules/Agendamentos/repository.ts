export interface Agendamento {
    id: string;
    nome: string;
    telefone: string;
    servico: string;
    data: string;
    horario: string;
    valor: number;
    status: string;
    usuarioId: string;
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

    updateStatus(id: string, status: string): void {
        const agendamentos = this.getAll();
        const agendamentosAtualizados = agendamentos.map(ag => {
            if (ag.id === id) {
                return { ...ag, status };
            }
            return ag;
        });
        this.save(agendamentosAtualizados);
    }
} 