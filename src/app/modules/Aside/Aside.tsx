'use client'
import { Calendar, Home, Settings, BarChart } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAuth } from "@/app/contexts/AuthContext";

export default function Aside() {
    const pathname = usePathname();
    const { isAdmin, isFuncionario } = useAuth();

    const isSelected = (path: string) => {
        return pathname === path ? 'bg-white text-violet-400' : 'text-white hover:bg-violet-500';
    };

    return (
        <aside className="h-full w-[300px] bg-violet-400 rounded-md p-4 flex flex-col gap-4">
            <span className="text-white font-bold">Menu</span>
            <div className="flex flex-col gap-2">
                <Link href="/agendamentos">
                    <button
                        className={`cursor-pointer w-full p-2 rounded-md flex items-center gap-2 transition-colors ${isSelected('/agendamentos')}`}
                    >
                        <Calendar size={20} />
                        Agendamentos
                    </button>
                </Link>
                <Link href="/historico">
                    <button
                        className={` cursor-pointer w-full p-2 rounded-md flex items-center gap-2 transition-colors ${isSelected('/historico')}`}
                    >
                        <Home size={20} />
                        Histórico de agendamentos
                    </button>
                </Link>
                {isAdmin && (
                    <>
                        <Link href="/configuracoes">
                            <button
                                className={`cursor-pointer w-full p-2 rounded-md flex items-center gap-2 transition-colors ${isSelected('/configuracoes')}`}
                            >
                                <Settings size={20} />
                                Configurações
                            </button>
                        </Link>
                        <Link href="/relatorio-semanal">
                            <button
                                className={`cursor-pointer w-full p-2 rounded-md flex items-center gap-2 transition-colors ${isSelected('/relatorio-semanal')}`}
                            >
                                <BarChart size={20} />
                                Relatório Semanal
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </aside>
    );
}