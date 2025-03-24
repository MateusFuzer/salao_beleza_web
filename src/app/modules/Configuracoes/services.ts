import { Usuario, UsuarioRepository } from '../Login/repository';

export class ConfiguracoesService {
    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

    getUsuarios(): Usuario[] {
        return this.repository.getAll();
    }

    criarUsuario(dados: Omit<Usuario, 'id'>): void {
        const novoUsuario: Usuario = {
            ...dados,
            id: new Date().getTime().toString()
        };
        this.repository.salvarUsuario(novoUsuario);
    }

    editarUsuario(usuario: Usuario): void {
        const usuarios = this.repository.getAll();
        const index = usuarios.findIndex(u => u.id === usuario.id);
        if (index === -1) throw new Error('Usuário não encontrado');
        
        usuarios[index] = usuario;
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }

    deletarUsuario(id: string): void {
        const usuarios = this.repository.getAll();
        const usuariosFiltrados = usuarios.filter(u => u.id !== id);
        localStorage.setItem('usuarios', JSON.stringify(usuariosFiltrados));
    }
} 