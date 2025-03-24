'use client'
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
    const [loginData, setLoginData] = useState({
        usuario: '',
        senha: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const success = login(loginData.usuario, loginData.senha);
            if (success) {
                router.push('/agendamentos');
            } else {
                setError('Usuário ou senha inválidos');
            }
        } catch (error) {
            setError('Erro ao fazer login');
        }
    };

    return (
        <div className="min-h-screen bg-violet-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex flex-col items-center mb-8">
                    <Image
                        src="/mulher-com-cabelo-comprido.png"
                        width={60}
                        height={60}
                        alt="Logo do Salão"
                        className="mb-4"
                    />
                    <h1 className="text-3xl font-great-vibes text-violet-400">Salão da Leila</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Usuário
                        </label>
                        <input
                            type="text"
                            value={loginData.usuario}
                            onChange={(e) => setLoginData(prev => ({ ...prev, usuario: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                            placeholder="Digite seu usuário"
                            required
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
                            placeholder="Digite sua senha"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-violet-400 text-white py-2 px-4 rounded-md hover:bg-violet-500 transition-colors"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
} 