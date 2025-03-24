'use client'
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Usuario } from '../Login/repository';
import { ConfiguracoesController } from './controller';
import Modal from '@/app/Components/Modal/Modal';

interface FormData {
    nome: string;
    usuario: string;
    email: string;
    senha: string;
    tipo: 'ADMIN' | 'USUARIO' | 'FUNCIONARIO';
}

export default function Configuracoes() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState<Usuario | null>(null);
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        usuario: '',
        email: '',
        senha: '',
        tipo: 'USUARIO'
    });

    const controller = new ConfiguracoesController();

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = () => {
        const usuariosCarregados = controller.getUsuarios();
        setUsuarios(usuariosCarregados);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (usuarioEmEdicao) {
                controller.editarUsuario({ ...formData, id: usuarioEmEdicao.id });
            } else {
                controller.criarUsuario(formData);
            }
            setShowModal(false);
            setUsuarioEmEdicao(null);
            resetForm();
            loadUsuarios();
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Erro ao salvar usuário');
        }
    };

    const handleEditar = (usuario: Usuario) => {
        setUsuarioEmEdicao(usuario);
        setFormData({
            nome: usuario.nome,
            usuario: usuario.usuario,
            email: usuario.email,
            senha: usuario.senha,
            tipo: usuario.tipo
        });
        setShowModal(true);
    };

    const handleDeletar = (usuario: Usuario) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            try {
                controller.deletarUsuario(usuario.id);
                loadUsuarios();
            } catch (error) {
                alert(error instanceof Error ? error.message : 'Erro ao deletar usuário');
            }
        }
    };

    const resetForm = () => {
        setFormData({
            nome: '',
            usuario: '',
            email: '',
            senha: '',
            tipo: 'USUARIO'
        });
    };

    return (
        <div className="h-full w-full bg-slate-200 rounded-md p-4">
            <div className="bg-white rounded-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Gerenciar Usuários</h2>
                    <button
                        onClick={() => {
                            setUsuarioEmEdicao(null);
                            resetForm();
                            setShowModal(true);
                        }}
                        className="bg-violet-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-violet-600"
                    >
                        <Plus size={20} />
                        Novo Usuário
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td className="px-6 py-4">{usuario.nome}</td>
                                    <td className="px-6 py-4">{usuario.usuario}</td>
                                    <td className="px-6 py-4">{usuario.email}</td>
                                    <td className="px-6 py-4">{usuario.tipo}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditar(usuario)}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeletar(usuario)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {usuarioEmEdicao ? 'Editar Usuário' : 'Novo Usuário'}
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome</label>
                            <input
                                type="text"
                                value={formData.nome}
                                onChange={e => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Usuário</label>
                            <input
                                type="text"
                                value={formData.usuario}
                                onChange={e => setFormData(prev => ({ ...prev, usuario: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Senha</label>
                            <input
                                type="password"
                                value={formData.senha}
                                onChange={e => setFormData(prev => ({ ...prev, senha: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                                required={!usuarioEmEdicao}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Tipo</label>
                            <select
                                value={formData.tipo}
                                onChange={e => setFormData(prev => ({ ...prev, tipo: e.target.value as 'ADMIN' | 'USUARIO' | 'FUNCIONARIO' }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500"
                            >
                                <option value="USUARIO">Usuário</option>
                                <option value="ADMIN">Administrador</option>
                                <option value="FUNCIONARIO">Funcionário</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-medium text-white bg-violet-600 rounded-md hover:bg-violet-700"
                            >
                                {usuarioEmEdicao ? 'Salvar' : 'Criar'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
} 