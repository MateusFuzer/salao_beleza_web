'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { usuario, isAdmin } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Aguarda um pequeno delay para garantir que o estado do usuário foi carregado
        const timer = setTimeout(() => {
            if (!usuario) {
                router.push('/agendamentos');
            } else if (requireAdmin && !isAdmin) {
                router.push('/agendamentos');
            }
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [usuario, isAdmin, requireAdmin, router]);

    // Mostra nada enquanto está carregando
    if (isLoading) {
        return null;
    }

    // Verifica as permissões após o carregamento
    if (!usuario || (requireAdmin && !isAdmin)) {
        return null;
    }

    return <>{children}</>;
} 