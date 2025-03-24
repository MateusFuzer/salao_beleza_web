'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, UsuarioRepository } from '../modules/Login/repository';

interface AuthContextType {
    usuario: Usuario | null;
    isAdmin: boolean;
    login: (usuario: Usuario) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const repository = new UsuarioRepository();

    useEffect(() => {
        const usuarioLogado = repository.getUsuarioLogado();
        if (usuarioLogado) {
            setUsuario(usuarioLogado);
            setIsAdmin(usuarioLogado.tipo === 'ADMIN');
        }
    }, []);

    const login = (usuario: Usuario) => {
        repository.setUsuarioLogado(usuario);
        setUsuario(usuario);
        setIsAdmin(usuario.tipo === 'ADMIN');
        window.dispatchEvent(new Event('authChange'));
    };

    const logout = () => {
        repository.logout();
        setUsuario(null);
        setIsAdmin(false);
        window.dispatchEvent(new Event('authChange'));
    };

    return (
        <AuthContext.Provider value={{ usuario, isAdmin, login, logout }}>
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