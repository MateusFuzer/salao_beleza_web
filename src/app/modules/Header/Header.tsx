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
    <div className="h-full w-full border-b-2 border-violet-400 bg-white flex items-center justify-between px-8">
      <div className="w-[15%] h-full flex gap-3 items-center">
        <div className="flex items-center">
          <Image
            src="/mulher-com-cabelo-comprido.png"
            width={25}
            height={25}
            alt="Logo do Salão"
          />
        </div>
        <span className="font-great-vibes text-3xl text-violet-400">
          Salão da Leila
        </span>
      </div>

      <div className="relative">
        {usuario ? (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className=" cursor-pointer flex items-center gap-2 bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors"
            >
              <User size={20} />
              <span>{usuario.nome}</span>
            </button>

            {/* Menu dropdown do usuário logado */}
            {showUserMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                  Logado como <br/>
                  <strong>{usuario.usuario}</strong>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
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
              className="flex items-center gap-2 bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors"
            >
              <User size={20} />
              Entrar
            </button>

            {/* Menu dropdown do usuário não logado */}
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
