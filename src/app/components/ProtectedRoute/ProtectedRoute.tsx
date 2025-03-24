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
        const timer = setTimeout(() => {
            if (!usuario) {
                router.push('/login');
            } else if (requireAdmin && !isAdmin) {
                router.push('/agendamentos');
            }
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, [usuario, isAdmin, requireAdmin, router]);

    if (isLoading || !usuario || (requireAdmin && !isAdmin)) {
        return null;
    }

    return <>{children}</>;
} 