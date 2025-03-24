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
        <aside className="w-full md:h-full bg-violet-400 rounded-md p-2 md:p-4 flex flex-col gap-2 md:gap-4">
            <span className="text-white font-bold hidden md:block">Menu</span>
            <nav className="flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible">
                <Link href="/agendamentos" className="min-w-fit">
                    <button
                        className={`w-full p-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer ${isSelected('/agendamentos')}`}
                    >
                        <Calendar size={20} />
                        <span className="hidden md:inline">Agendamentos</span>
                    </button>
                </Link>
                
                <Link href="/historico" className="min-w-fit">
                    <button
                        className={`w-full p-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer ${isSelected('/historico')}`}
                    >
                        <Home size={20} />
                        <span className="hidden md:inline">Histórico</span>
                    </button>
                </Link>

                {isAdmin && (
                    <>
                        <Link href="/configuracoes" className="min-w-fit">
                            <button
                                className={`w-full p-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer ${isSelected('/configuracoes')}`}
                            >
                                <Settings size={20} />
                                <span className="hidden md:inline">Configurações</span>
                            </button>
                        </Link>
                        
                        <Link href="/relatorio-semanal" className="min-w-fit">
                            <button
                                className={`w-full p-2 rounded-md flex items-center gap-2 transition-colors cursor-pointer ${isSelected('/relatorio-semanal')}`}
                            >
                                <BarChart size={20} />
                                <span className="hidden md:inline">Relatório</span>
                            </button>
                        </Link>
                    </>
                )}
            </nav>
        </aside>
    );
}