# VaiBem - Processo Seletivo
Este projeto consiste na prova prática do processo seletivo para desenvolvedor da empresa VaiBem. <br>
Trata-se da criação de um sistema para cadastrar e gerenciar estabelecimentos comerciais. E cumprindo os requistos do teste, foi criado a parte de cadastro de usuário e autenticação do mesmo utilizando JWT, para que este possa acessar o sistema.<br>
Esta aplicação consiste em duas partes, uma responsável pelo back-end da aplicação, que basicamente entregará os endpoints (rotas), para que possam ser consumidas, e outra o front-end web que consiste na interface que o usuário irá utilizar.

<div align='center'>
 <img src='https://user-images.githubusercontent.com/6942893/126635963-cb26b0ff-7775-4c0a-8d9c-ff625aeec6d8.png' width='500px'  /><br />
 <b>Home</b><br /><br />
 <img src='https://user-images.githubusercontent.com/6942893/126635977-1a10303e-f403-48cb-8bdb-0eb61848b50d.png' width='500px'  /><br />
 <b>Novo Usuário</b><br /><br />
 <img src='https://user-images.githubusercontent.com/6942893/126636021-1023b8be-4f3b-425e-a9a2-447f0a0b55e9.png' width='500px'  /><br />
 <b>Listagem de Estabelecimento</b><br /><br />
 <img src='https://user-images.githubusercontent.com/6942893/126636032-4c83ce67-f766-45b3-b96f-61dc1df9931b.png' width='500px'  /><br />
 <b>Cadastro de Estabelecimento</b><br /><br />
 <img src='https://user-images.githubusercontent.com/6942893/126636041-69844699-3f47-4e44-a1de-6cf10cd62a89.png' width='500px'  /><br />
 <b>Mensagem de Confirmação</b><br />
</div>

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

