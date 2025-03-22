import { ClipboardList, CalendarDays } from 'lucide-react';

export default function Aside(){
    return(
        <div className="h-full w-full bg-violet-400">
            <div className="p-2 text-white flex gap-2 cursor-pointer">
                <CalendarDays color="white" size={20} />
                <span className="font-bold">Agendamentos</span>
            </div>
            <div className="p-2 text-white flex gap-2 cursor-pointer">
            <ClipboardList color="white" size={20} />
            <span className="font-bold">Histórico de agendamentos</span>
            </div>
        </div>
    )
}