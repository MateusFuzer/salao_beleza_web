import { Usuario, UsuarioRepository } from './repository';

export class AuthService {
    private repository: UsuarioRepository;

    constructor() {
        this.repository = new UsuarioRepository();
    }

    login(email: string, senha: string): Usuario | null {
        const usuario = this.repository.getByEmail(email);
        
        if (usuario && usuario.senha === senha) {
            this.repository.setUsuarioLogado(usuario);
            return usuario;
        }
        
        return null;
    }

    verificarLogin(): Usuario | null {
        return this.repository.getUsuarioLogado();
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