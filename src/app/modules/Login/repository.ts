export interface Usuario {
    id: string;
    nome: string;
    usuario: string;
    email: string;
    senha: string;
    tipo: 'ADMIN' | 'USUARIO' | 'FUNCIONARIO';
}

export class UsuarioRepository {
    private STORAGE_KEY = 'usuarios';
    private LOGGED_USER_KEY = 'usuarioLogado';

    salvarUsuario(usuario: Usuario): void {
        const usuarios = this.getAll();
        usuarios.push(usuario);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
    }

    getAll(): Usuario[] {
        const savedUsuarios = localStorage.getItem(this.STORAGE_KEY);
        return savedUsuarios ? JSON.parse(savedUsuarios) : [];
    }

    getByEmail(email: string): Usuario | undefined {
        const usuarios = this.getAll();
        return usuarios.find(u => u.email === email);
    }

    getByUsuario(usuario: string): Usuario | undefined {
        const usuarios = this.getAll();
        return usuarios.find(u => u.usuario === usuario);
    }

    setUsuarioLogado(usuario: Usuario): void {
        localStorage.setItem(this.LOGGED_USER_KEY, JSON.stringify(usuario));
    }

    getUsuarioLogado(): Usuario | null {
        const usuarioLogado = localStorage.getItem(this.LOGGED_USER_KEY);
        if (!usuarioLogado) return null;
        
        try {
            const usuario = JSON.parse(usuarioLogado);
            return usuario;
        } catch (error) {
            console.error('Erro ao parsear usuário:', error);
            return null;
        }
    }

    logout(): void {
        localStorage.removeItem(this.LOGGED_USER_KEY);
    }
} 