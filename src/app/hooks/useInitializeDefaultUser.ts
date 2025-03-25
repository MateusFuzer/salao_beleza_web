import { useEffect } from 'react';
import { Usuario, UsuarioRepository } from '../modules/Login/repository';

const usuariosPadrao: Usuario[] = [
    {
        id: '1',
        nome: 'Administrador',
        usuario: 'admin',
        email: 'admin@admin.com',
        senha: 'admin',
        tipo: 'ADMIN'
    },
    {
        id: '2',
        nome: 'Maria Silva',
        usuario: 'maria',
        email: 'maria@email.com',
        senha: '123456',
        tipo: 'USUARIO'
    },
    {
        id: '2',
        nome: 'Paula Santos',
        usuario: 'paula',
        email: 'paula@email.com',
        senha: '123456',
        tipo: 'USUARIO'
    },
    {
        id: '2',
        nome: 'Beatriz Pereira',
        usuario: 'beatriz',
        email: 'beatriz@email.com',
        senha: '123456',
        tipo: 'USUARIO'
    },
    {
        id: '3',
        nome: 'Atendente',
        usuario: 'atendente',
        email: 'func@email.com',
        senha: '123456',
        tipo: 'FUNCIONARIO'
    }
];

export function useInitializeDefaultUser() {
    useEffect(() => {
        const repository = new UsuarioRepository();
        const usuarios = repository.getAll();

        if (usuarios.length === 0) {
            usuariosPadrao.forEach(usuario => {
                repository.salvarUsuario(usuario);
            });
        }
    }, []);
} 