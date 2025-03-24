import { Agendamento } from "../Agendamentos/repository";

export class HistoricoRepository {
    private STORAGE_KEY = 'agendamentos';

    getAll(): Agendamento[] {
        const savedAgendamentos = localStorage.getItem(this.STORAGE_KEY);
        return savedAgendamentos ? JSON.parse(savedAgendamentos) : [];
    }

    getAllByUsuario(usuarioId: string): Agendamento[] {
        const agendamentos = this.getAll();
        return agendamentos.filter(ag => ag.usuarioId === usuarioId);
    }
} 