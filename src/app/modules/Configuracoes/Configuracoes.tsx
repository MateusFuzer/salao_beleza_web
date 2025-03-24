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
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [usuarioParaDeletar, setUsuarioParaDeletar] = useState<Usuario | null>(null);
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

    const handleExcluir = (usuario: Usuario) => {
        setUsuarioParaDeletar(usuario);
        setShowDeleteModal(true);
    };

    const confirmarExclusao = () => {
        if (usuarioParaDeletar) {
            try {
                controller.deletarUsuario(usuarioParaDeletar.id);
                loadUsuarios();
                setShowDeleteModal(false);
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
        <div className="w-full bg-slate-200 rounded-md p-2 md:p-4">
            <div className="bg-white rounded-md p-3 md:p-6">
                <div className="overflow-x-auto">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                        <h2 className="text-lg font-semibold">Usuários</h2>
                        <button
                            onClick={() => {
                                setUsuarioEmEdicao(null);
                                resetForm();
                                setShowModal(true);
                            }}
                            className="flex items-center gap-2 bg-violet-600 text-white px-3 py-2 rounded-md hover:bg-violet-700 cursor-pointer"
                        >
                            <Plus size={20} />
                            <span className="hidden sm:inline">Novo Usuário</span>
                        </button>
                    </div>
                    <div className="min-w-full overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
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
                                                    className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer"
                                                >
                                                    <Pencil size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleExcluir(usuario)}
                                                    className="text-red-600 hover:text-red-900 cursor-pointer"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className="p-4 md:p-6 max-w-lg mx-auto">
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

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <div className="p-4 md:p-6 max-w-sm mx-auto">
                    <h3 className="text-lg font-semibold mb-4">Confirmar Exclusão</h3>
                    <p className="text-gray-600 mb-6">
                        Tem certeza que deseja excluir o usuário {usuarioParaDeletar?.nome}?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={confirmarExclusao}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 cursor-pointer"
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
} 