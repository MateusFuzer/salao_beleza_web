import { Agendamento } from "../Agendamentos/repository";
import { HistoricoRepository } from "./repository";
import { UsuarioRepository } from "../Login/repository";

export class HistoricoService {
    private repository: HistoricoRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.repository = new HistoricoRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    getAllAgendamentos(): Agendamento[] {
        const usuarioLogado = this.usuarioRepository.getUsuarioLogado();
        if (!usuarioLogado) return [];

        const agendamentos = this.repository.getAll();
       
        const agendamentosFiltrados = usuarioLogado.tipo === 'ADMIN' || usuarioLogado.tipo === 'FUNCIONARIO'
            ? agendamentos
            : agendamentos.filter(ag => ag.usuarioId === usuarioLogado.id);

        return agendamentosFiltrados.sort((a: Agendamento, b: Agendamento) => {
            const dataA = new Date(`${a.data}T${a.horario}`);
            const dataB = new Date(`${b.data}T${b.horario}`);
            return dataB.getTime() - dataA.getTime();
        });
    }
} 