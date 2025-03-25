# Salão da Leila - Sistema de Agendamentos

## Pré-requisitos

- [Node.js](https://nodejs.org/) versão v23.10.0
  - Para instalar o Node.js, acesse [https://nodejs.org/download/release/v23.10.0/](https://nodejs.org/download/release/v23.10.0/)
  - Ou use o NVM (Node Version Manager):
    ```bash
    nvm install 23.10.0
    nvm use 23.10.0
    ```

## Instalação

1. Clone o repositório
```bash
git clone https://github.com/MateusFuzer/salao_beleza_web
cd salao_beleza_web
```

2. Instale as dependências
```bash
npm install
```

## Executando o Projeto

Para rodar o projeto em ambiente de produção:

```bash
npm run deploy
```

Após a execução, acesse o sistema em:
[http://localhost:3000](http://localhost:3000)

## Usuários Padrão

O sistema já vem com 3 usuários pré-cadastrados para teste:

1. **Administrador**
   - Usuário: admin
   - Senha: admin

2. **Funcionário**
   - Usuário: atendente
   - Senha: 123456

3. **Cliente**
   - Usuário: maria
   - Senha: 123456
   - 
3. **Cliente**
   - Usuário: beatriz
   - Senha: 123456
   - 
3. **Cliente**
   - Usuário: paula
   - Senha: 123456

## Funcionalidades

- Sistema de login e autenticação
- Gerenciamento de agendamentos
- Histórico de agendamentos
- Relatório semanal (apenas admin)
- Configurações de usuários (apenas admin)

## Estrutura do Projeto

```
src/
├── app/
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # Contextos React (AuthContext)
│   ├── modules/         # Módulos principais do sistema
│   └── hooks/          # Hooks customizados
```

## Tecnologias Utilizadas

- Next.js 15.2.3
- React 19
- TypeScript
- TailwindCSS
- Lucide React (ícones)

## Desenvolvimento

Para rodar o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

O sistema estará disponível em [http://localhost:3000](http://localhost:3000)

## Observações Importantes

- O sistema utiliza localStorage como banco de dados
- Recomendado usar navegadores modernos Chrome
