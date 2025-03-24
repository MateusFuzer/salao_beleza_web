'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, UsuarioRepository } from '../modules/Login/repository';
import { useRouter } from 'next/navigation';
import { AuthService } from '../modules/Login/services';

interface AuthContextType {
    usuario: Usuario | null;
    isAdmin: boolean;
    isFuncionario: boolean;
    login: (usuario: string, senha: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFuncionario, setIsFuncionario] = useState(false);
    const repository = new UsuarioRepository();
    const authService = new AuthService();
    const router = useRouter();

    useEffect(() => {
        const usuarioLogado = repository.getUsuarioLogado();
        if (usuarioLogado) {
            setUsuario(usuarioLogado);
            setIsAdmin(usuarioLogado.tipo === 'ADMIN');
            setIsFuncionario(usuarioLogado.tipo === 'FUNCIONARIO');
        } else {
            router.push('/login');
        }
    }, [router]);

    const login = (usuario: string, senha: string): boolean => {
        const usuarioLogado = authService.login(usuario, senha);
        if (usuarioLogado) {
            setUsuario(usuarioLogado);
            setIsAdmin(usuarioLogado.tipo === 'ADMIN');
            setIsFuncionario(usuarioLogado.tipo === 'FUNCIONARIO');
            window.dispatchEvent(new Event('authChange'));
            return true;
        }
        return false;
    };

    const logout = () => {
        repository.logout();
        setUsuario(null);
        setIsAdmin(false);
        setIsFuncionario(false);
        window.dispatchEvent(new Event('authChange'));
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ usuario, isAdmin, isFuncionario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 