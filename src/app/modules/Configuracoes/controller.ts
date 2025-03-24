import { ConfiguracoesService } from './services';
import { Usuario } from '../Login/repository';

export class ConfiguracoesController {
    private service: ConfiguracoesService;

    constructor() {
        this.service = new ConfiguracoesService();
    }

    getUsuarios(): Usuario[] {
        return this.service.getUsuarios();
    }

    criarUsuario(dados: Omit<Usuario, 'id'>): void {
        this.service.criarUsuario(dados);
    }

    editarUsuario(usuario: Usuario): void {
        this.service.editarUsuario(usuario);
    }

    deletarUsuario(id: string): void {
        this.service.deletarUsuario(id);
    }
} 