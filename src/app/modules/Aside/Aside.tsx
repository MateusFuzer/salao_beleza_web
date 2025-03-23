'use client'
import { Calendar, Home, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Aside() {
    const pathname = usePathname();

    const isSelected = (path: string) => {
        return pathname === path ? 'bg-white text-violet-400' : 'text-white hover:bg-violet-500';
    };

    return (
        <aside className="h-full w-[300px] bg-violet-400 rounded-md p-4 flex flex-col gap-4">
            <span className="text-white font-bold">Menu</span>
            <div className="flex flex-col gap-2">
                <Link href="/">
                    <button 
                        className={`w-full p-2 rounded-md flex items-center gap-2 transition-colors ${isSelected('/')}`}
                    >
                        <Home size={20} />
                        Home
                    </button>
                </Link>

                <Link href="/agendamentos">
                    <button 
                        className={`w-full p-2 rounded-md flex items-center gap-2 transition-colors ${isSelected('/agendamentos')}`}
                    >
                        <Calendar size={20} />
                        Agendamentos
                    </button>
                </Link>
            </div>
        </aside>
    );
}