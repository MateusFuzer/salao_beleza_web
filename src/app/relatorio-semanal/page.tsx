'use client'
import RelatorioSemanal from "../modules/RelatorioSemanal/RelatorioSemanal";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

export default function RelatorioSemanalPage() {
    return (
        <ProtectedRoute requireAdmin>
            <RelatorioSemanal />
        </ProtectedRoute>
    );
} 