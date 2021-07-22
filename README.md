# VaiBem - Processo Seletivo
Este projeto consiste na prova prática do processo seletivo para desenvolvedor da empresa VaiBem. <br>
Trata-se da criação de um sistema para cadastrar e gerenciar estabelecimentos comerciais. E cumprindo os requistos do teste, foi criado a parte de cadastro de usuário e autenticação do mesmo, para que este possa acessar o sistema.<br>
Esta aplicação consiste em duas partes, uma responsável pelo back-end da aplicação, que basicamente entregará os endpoints (rotas), para que possam ser consumidas, e outra o front-end web que consiste na interface que o usuário irá utilizar.

## Pré-Requisitos
 - Docker
 - Docker Compose


## Server
Fornece os endpoints (rotas) para o front-end. Foi desenvolvido utilizando Node.js e o banco Postgress.<br>
Para executar o servidor da aplicação, basta entrar na raiz do projeto e executar o comando abaixo:

> sudo docker-compose up -d

Este processo pode levar alguns minutos, por favor aguarde até ser finalizado.

### Endpoints (Rotas)

1) Valida o email e a senha do usuário, e retorna o token de acesso. (Pública)
> POST [http://localhost:3333/api/v1/authenticate]

2) Criar um novo usuário. (Pública)
> POST [http://localhost:3333/api/v1/users]

3) Mostra todos os usuários criados no sistema. (Autenticada)
> GET [http://localhost:3333/api/v1/users]

4) Mostra os dados de um usuário específico. (Autenticada)
> GET [http://localhost:3333/api/v1/users/{id}]

5) Atualizar as informações de um usuário. (Autenticada)
> UPDATE [http://localhost:3333/api/v1/users/{id}]

6) Excluir um usuário. (Autenticada)
> DELETE [http://localhost:3333/api/v1/users/{id}]

7) Exibir todos os estabelecimentos criados.  (Autenticada)
> GET [http://localhost:3333/api/v1/stores]

> GET [http://localhost:3333/api/v1/stores?search={termo}]

8) Mostra os dados de um estabelecimento específico. (Autenticada)
> GET [http://localhost:3333/api/v1/stores/{id}]

9) Criar uma novo estabelecimento. (Autenticada)
> POST [http://localhost:3333/api/v1/stores]

10) Atualizar as informações de um estabelecimento. (Autenticada)
> UPDATE [http://localhost:3333/api/v1/stores/{id}]

11) Excluir um estabelecimento. (Autenticada)
> DELETE [http://localhost:3333/api/v1/stores/{id}]


## Web
Fornece a interface web, para que os usuário possam acessar o sistema. <br>
Esta etapa do projeto foi desenvolvido utilizando ReactJS.<br>
Para executar o projeto, basta entrar na raiz do projeto e executar o comando abaixo:

> sudo docker-compose up -d

Este processo pode levar alguns minutos, por favor aguarde até ser finalizado.

Após o processo finalizado e o container rodando, basta acessa no seu navegador o endereço abaixo:
> http://localhost:3000

