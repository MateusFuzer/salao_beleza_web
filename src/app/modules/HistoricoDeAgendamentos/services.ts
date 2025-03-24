import { Agendamento } from "../Agendamentos/repository";
import { HistoricoRepository } from "./repository";

export class HistoricoService {
    private repository: HistoricoRepository;

    constructor() {
        this.repository = new HistoricoRepository();
    }

    getAllAgendamentos(): Agendamento[] {
        const agendamentos = this.repository.getAll();
        
        // Ordena os agendamentos por data e hora (mais recentes primeiro)
        return agendamentos.sort((a, b) => {
            const dataA = new Date(`${a.data}T${a.horario}`);
            const dataB = new Date(`${b.data}T${b.horario}`);
            return dataB.getTime() - dataA.getTime();
        });
    }
} 