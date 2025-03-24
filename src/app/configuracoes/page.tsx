'use client'
import Configuracoes from "../modules/Configuracoes/Configuracoes";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function ConfiguracoesPage() {
    return (
        <ProtectedRoute requireAdmin>
            <Configuracoes />
        </ProtectedRoute>
    );
} 