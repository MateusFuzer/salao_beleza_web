'use client'
import { LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { AuthService } from "../Login/services";
import { Usuario } from "../Login/repository";
import { useAuth } from '@/app/contexts/AuthContext';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginData, setLoginData] = useState({
    usuario: '',
    senha: ''
  });

  const { usuario, login, logout } = useAuth();
  const authService = new AuthService();

  const handleLogin = () => {
    const usuarioLogado = authService.login(loginData.usuario, loginData.senha);
    
    if (usuarioLogado) {
      login(usuarioLogado);
      setShowLoginModal(false);
      setLoginData({ usuario: '', senha: '' });
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

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
              className="flex items-center gap-2 bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors"
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
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-2 bg-violet-400 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors"
            >
              <User size={20} />
              Entrar
            </button>

            {/* Modal de Login */}
            {showLoginModal && (
              <div className="absolute right-0 top-12 w-64 bg-white rounded-md shadow-lg py-4 px-4 z-50">
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usuário
                    </label>
                    <input
                      type="text"
                      value={loginData.usuario}
                      onChange={(e) => setLoginData(prev => ({ ...prev, usuario: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-400"
                      placeholder="Digite seu usuário"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Senha
                    </label>
                    <input
                      type="password"
                      value={loginData.senha}
                      onChange={(e) => setLoginData(prev => ({ ...prev, senha: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-violet-400"
                      placeholder="Digite sua senha"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setShowLoginModal(false)}
                      className="flex-1 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleLogin}
                      className="flex-1 px-4 py-2 text-sm text-white bg-violet-400 hover:bg-violet-500 rounded-md transition-colors"
                    >
                      Entrar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Clique fora para fechar os menus */}
      {(showUserMenu || showLoginModal) && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowLoginModal(false);
          }}
        />
      )}
    </div>
  );
}
