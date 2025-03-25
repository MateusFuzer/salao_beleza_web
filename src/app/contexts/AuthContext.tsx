'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, UsuarioRepository } from '../modules/Login/repository';
import { useRouter, usePathname } from 'next/navigation';
import { AuthService } from '../modules/Login/services';

interface AuthContextType {
    usuario: Usuario | null;
    isAdmin: boolean;
    isFuncionario: boolean;
    login: (usuario: string, senha: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ROTAS_PUBLICAS = ['/login'];
const ROTAS_ADMIN = ['/configuracoes', '/relatorio-semanal'];

export function AuthProvider({ children }: { children: ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFuncionario, setIsFuncionario] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const repository = new UsuarioRepository();
    const authService = new AuthService();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const verificarAutenticacao = () => {
            const usuarioLogado = repository.getUsuarioLogado();
            
            if (usuarioLogado) {
                setUsuario(usuarioLogado);
                setIsAdmin(usuarioLogado.tipo === 'ADMIN');
                setIsFuncionario(usuarioLogado.tipo === 'FUNCIONARIO');
            }

            if (ROTAS_PUBLICAS.includes(pathname)) {
                if (usuarioLogado) {
                    router.push('/agendamentos');
                }
            } else {
                if (!usuarioLogado) {
                    router.push('/login');
                    return;
                }

                if (ROTAS_ADMIN.includes(pathname) && usuarioLogado.tipo !== 'ADMIN') {
                    router.push('/agendamentos');
                    return;
                }
            }

            setIsLoading(false);
        };

        verificarAutenticacao();
    }, [pathname, router]);

    const login = (usuario: string, senha: string): boolean => {
        const usuarioLogado = authService.login(usuario, senha);
        if (usuarioLogado) {
            setUsuario(usuarioLogado);
            setIsAdmin(usuarioLogado.tipo === 'ADMIN');
            setIsFuncionario(usuarioLogado.tipo === 'FUNCIONARIO');
            return true;
        }
        return false;
    };

    const logout = () => {
        repository.logout();
        setUsuario(null);
        setIsAdmin(false);
        setIsFuncionario(false);
        router.push('/login');
    };

    if (isLoading) {
        return null; // ou um componente de loading
    }

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