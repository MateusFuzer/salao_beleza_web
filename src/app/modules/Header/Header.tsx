'use client'
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useAuth } from '@/app/contexts/AuthContext';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { usuario, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="h-full w-full border-b-2 border-violet-400 bg-white flex items-center justify-between px-4 md:px-8">
      <div className="flex gap-2 md:gap-3 items-center">
        <div className="flex items-center">
          <Image
            src="/mulher-com-cabelo-comprido.png"
            width={25}
            height={25}
            alt="Logo do Salão"
            className="w-[20px] h-[20px] md:w-[25px] md:h-[25px]"
          />
        </div>
        <span className="font-great-vibes text-xl md:text-3xl text-violet-400 whitespace-nowrap">
          Salão da Leila
        </span>
      </div>

      <div className="relative">
        {usuario ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="cursor-pointer flex items-center gap-1 md:gap-2 bg-violet-400 text-white px-2 md:px-4 py-2 rounded-md hover:bg-violet-500 transition-colors text-sm md:text-base"
            >
              <User size={18} />
              <span className="hidden sm:inline">{usuario.nome}</span>
              <span className="sm:hidden">{usuario.nome.split(' ')[0]}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                  Logado como <br/>
                  <strong>{usuario.usuario}</strong>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button 
              onClick={() => setShowUserMenu(true)}
              className="cursor-pointer flex items-center gap-1 md:gap-2 bg-violet-400 text-white px-2 md:px-4 py-2 rounded-md hover:bg-violet-500 transition-colors text-sm md:text-base"
            >
              <User size={18} />
              <span>Entrar</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                >
                  <LogOut size={16} />
                  Sair
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
