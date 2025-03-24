import { Agendamento } from "../Agendamentos/repository";
import { HistoricoService } from "./services";

export class HistoricoController {
    private service: HistoricoService;

    constructor() {
        this.service = new HistoricoService();
    }

    carregarTodosAgendamentos(): Agendamento[] {
        return this.service.getAllAgendamentos();
    }
} 