import { RelatorioService } from './services';

export class RelatorioController {
    private service: RelatorioService;

    constructor() {
        this.service = new RelatorioService();
    }

    gerarRelatorioSemanal(dataInicio: string) {
        return this.service.gerarRelatorioSemanal(dataInicio);
    }
} 