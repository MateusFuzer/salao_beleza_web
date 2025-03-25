import { Usuario, UsuarioRepository } from './repository';

export class AuthService {
    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

    login(usuario: string, senha: string): Usuario | null {
        const usuarioEncontrado = this.repository.getByUsuario(usuario);
        
        if (usuarioEncontrado && usuarioEncontrado.senha === senha) {
            this.repository.setUsuarioLogado(usuarioEncontrado);
            return usuarioEncontrado;
        }
        
        return null;
    }


    cadastrar(dados: Omit<Usuario, 'id'>): Usuario {
        const novoUsuario: Usuario = {
            ...dados,
            id: new Date().getTime().toString()
        };

        this.repository.salvarUsuario(novoUsuario);
        return novoUsuario;
    }

    logout(): void {
        this.repository.logout();
    }
} 