# Projeto CamelTech

Este é o README.md para o projeto CamelTech. Abaixo estão as instruções desde o início do projeto até as rotas disponíveis.

## Inicialização do Projeto

### 1. Clone o Repositório

git clone https://github.com/seu-usuario/cameltech.git
cd cameltech

#### Instale as dependencias:

```
npm run dev

ou

yarn add
```

### 2. Crie um arquivo docker-compose.yml com os seguintes dados

```bash
version: '3.9'

services:
  database:
    image: postgres:latest
    container_name: cameltech
    restart: always
    ports:
      - 5432:5432
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=cameltech
    volumes:
      - pgdata:/data/postgres

volumes:
  pgdata:
    driver: local
```

### 3. Docker Compose

Execute o Docker Compose para configurar o ambiente.

```bash
docker-compose up -d
```

#### Migrar banco de dados

```
  npx prisma generate
  npx prisma db push

  ou


  yarn prisma generate
  yarn prisma db push

```

### 4. Ambiente Pronto

Agora, seu ambiente está pronto para uso.

## Rotas Disponíveis:

### Usuários

Criar Usuário
Método: POST
Rota: /users

Listar Todos os Usuários:
Método: GET
Rota: /users

Encontrar Usuário por ID:
Método: GET
Rota: /users/:id

Atualizar Usuário por ID:
Método: PUT
Rota: /users/:id

Desativar Usuário por ID:
Método: PUT
Rota: /users/deactivate/:id

### Profissões

Criar Profissão:
Método: POST
Rota: /professions

Atualizar Profissão por ID:
Método: PUT
Rota: /professions/:id

Encontrar Profissão por ID:
Método: GET
Rota: /professions/:id

Certifique-se de substituir :id pelos identificadores apropriados ao usar as rotas.

env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cameltech
NODE_ENV='dev'
Certifique-se de adaptar as configurações de acordo com suas necessidades e ambiente.

Aproveite o desenvolvimento com CamelTech!
