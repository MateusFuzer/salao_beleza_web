import { useEffect } from 'react';
import { Usuario, UsuarioRepository } from '../modules/Login/repository';

const usuariosPadrao: Usuario[] = [
    {
        id: '1',
        nome: 'Administrador',
        usuario: 'admin',
        senha: 'admin',
        tipo: 'ADMIN'
    },
    {
        id: '2',
        nome: 'Maria Silva',
        usuario: 'maria',
        senha: '123456',
        tipo: 'USUARIO'
    }
];

export function useInitializeDefaultUser() {
    useEffect(() => {
        const repository = new UsuarioRepository();
        const usuarios = repository.getAll();

        // Verifica se já existe algum usuário cadastrado
        if (usuarios.length === 0) {
            usuariosPadrao.forEach(usuario => {
                repository.salvarUsuario(usuario);
            });
            console.log('Usuários padrão criados:', usuariosPadrao);
        }
    }, []);
} 