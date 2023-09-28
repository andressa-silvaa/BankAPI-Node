# BankAPI-Node

📌 Status :  aguardando melhorias 

>Este projeto é uma API desenvolvida em Node.js que gerencia operações bancárias básicas. Ela se conecta a um banco de dados PostgreSQL chamado "dindin" e oferece um conjunto abrangente de recursos para o gerenciamento de contas bancárias. Isso inclui operações como cadastro de usuários, transações e categorias. O projeto segue o padrão REST e foi implementado em JavaScript.


## Pré-Requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- Node.js
- npm (Node Package Manager)
- PostgreSQL
- Visual Studio 




## 📢Funcionalidades

- Autenticação de usuário
- Cadastro de Usuários
- Cadastro de Transações
- Exclusão de Transações
- Listagem de Transações
- Listagem de Transações com Parâmetros
- E muito mais!
- Explore as rotas disponíveis para aproveitar ao máximo as funcionalidades.




## ⚠️Como Usar
1.Clone o repositório:

```bash

git clone https://github.com/seu-usuario/seu-projeto.git
```
2.Instale as dependências do projeto:

```bash

npm install
```

3.Inicie o servidor(somente após concluída todas as etapas seguintes):
```bash

npm run dev
```


>Use o Insomnia (ou outro cliente HTTP) para criar as rotas para acessar as funcionalidades da API.

>Para autenticação, adicione o token de acesso (Recebido após requisição de login) na propriedade autorizathion do cabeçalho (Header) .

>Certifique-se de enviar dados no formato JSON ao fazer requisições que exigem corpo (request body).

## 🗺️Sobre as Rotas 
`(POST) http://localhost:3000/usuarios`  


>Descrição: Esta rota permite criar um novo usuário na aplicação. Os dados do usuário devem ser fornecidos no body da requisição no formato JSON.

>Exemplo de body no formato JSON:
```json
{
    "nome": "Andressa",
    "email": "andressa@email.com",
    "senha": "123456"
}
```


`(POST) http://localhost:3000/login`  


>Descrição: Esta rota é usada para autenticar um usuário existente. Um token de autenticação é gerado se as credenciais forem válidas, permitindo o acesso às funcionalidades protegidas da API.

>Exemplo de body no formato JSON:
```json
{
    "email": "andressa@email.com",
    "senha": "123456"
}
```

`(GET) http://localhost:3000/usuario`  


>Descrição: Recupera as informações do usuário autenticado com base no token de autenticação. É útil para exibir detalhes do perfil do usuário logado.  

`(GET) http://localhost:3000/categoria`  


>Descrição: Retorna a lista de categorias disponíveis para classificar as transações bancárias. Pode ser usado para exibir opções de categorias ao criar uma nova transação.  

`(POST) http://localhost:3000/transacao`  


>Descrição: Permite criar uma nova transação bancária. As informações da transação, incluindo a categoria, devem ser fornecidas no corpo da requisição no formato JSON.

>Exemplo de body no formato JSON:
```json
{
    "tipo": "saida",
    "descricao": "Lazer",
    "valor": 100000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 8
}
```
>Observação : o valor é dado em centavos 

`(GET) http://localhost:3000/transacao`  


>Descrição: Recupera a lista de todas as transações bancárias registradas na conta do usuário autenticado. É útil para exibir o histórico de transações.  

`(GET) http://localhost:3000/transacao/categoria`  


>Descrição: Retorna as transações bancárias com base na categoria especificada no campo query da requisição. Isso pode ser útil para análises financeiras e relatórios.

>Observação: a query deve se chamar "filtro" e o conteúdo deve ser uma String separada por vírgulas, isto é, cada campo da String é referente a uma categoria.

>Exemplo de url para a query Salário,Lazer,Educação:


```bash

http://localhost:3000/transacao/categoria?filtro=Sal%C3%A1rio,Lazer,Educa%C3%A7%C3%A3o
```

>Lembrando que pode ser passado valores diferentes do exemplo, e quando não for incluída query na requisição, a aplicação continuará funcionando.

`(GET) http://localhost:3000/transacao/id`  


>Descrição: Recupera detalhes específicos de uma transação com base no ID da transação fornecido. Isso permite visualizar informações detalhadas de uma transação específica.  

`(PUT) http://localhost:3000/transacao/id`  


>Descrição: Atualiza os detalhes de uma transação existente com base no ID da transação fornecido. Os novos dados da transação devem ser fornecidos no corpo da requisição no formato JSON.

>Exemplo de body JSON:
```json
{
    "tipo": "saida",
    "descricao": "lazer",
    "valor": 200000,
    "data": "2022-03-24T15:30:00.000Z",
    "categoria_id": 8
}
```

`(DELETE) http://localhost:3000/transacao/id`  


>Descrição: Exclui uma transação específica com base no ID da transação fornecido. Isso permite ao usuário remover transações indesejadas.  

`(GET) http://localhost:3000/transacao/extrato`  


>Descrição: Gera um extrato bancário que mostra um resumo das transações em um período específico. Pode ser útil para acompanhar o saldo da conta ao longo do tempo.  

## 💥Importante💥
Para garantir a segurança das suas informações e o acesso às funcionalidades protegidas, é necessário fornecer um token de autenticação válido em todas as rotas que estão abaixo da rota de login.  


- **Token de Autenticação:** O token de autenticação é fornecido como resposta à rota de login. Exemplo de token:
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk1NTg1Mzc0LCJleHAiOjE2OTU4NDQ1NzR9.DxEakW3WcUDIyBApMN-9pxehPSpvJv_9Clh_UNWJ9go`
- **Duração do Token:** O token de autenticação é válido por um período de 8 horas a partir do momento em que é gerado. Após esse período, o token expirará e você precisará fazer login novamente para obter um novo token.
  

- **Inclusão do Token:** Para acessar as rotas protegidas, você deve incluir o token de autenticação no cabeçalho (Header) de suas requisições HTTP, na propriedade "Authorization" do objeto Headers.
  
## 🗃️Banco de Dados

Para que o projeto funcione corretamente, você precisa configurar o objeto `pool` no arquivo `connection.js` para que ele aponte para as informações do banco de dados PostgreSQL instalado em sua máquina. Siga os passos abaixo para fazer essa configuração:

1. **Execute o Dump SQL:** Antes de configurar o objeto `pool`, certifique-se de ter executado o script SQL fornecido (`dump.sql`) no seu banco de dados PostgreSQL. Isso criará as tabelas necessárias.

2. **Configure o Objeto `pool`:** Abra o arquivo `connection.js` e localize o objeto `pool`. Ele se parece com o seguinte(As informações contidas nele são um mero exemplo):

   ```javascript
   const pool = new Pool({
       host: 'localhost',
       port: 5432,
       user: 'postgres',
       password: '123456',
       database: 'dindin',
   });
   ```
  3. Altere as Informações do Banco de Dados: Modifique as propriedades host, port, user, password e database do objeto pool para refletir as configurações do seu banco de dados local. Por exemplo:  
  
  ```javascript
    const pool = new Pool({
        host: 'localhost',     // Endereço do servidor do banco de dados
        port: 5432,            // Porta do servidor do banco de dados
        user: 'seu-usuario',   // Nome de usuário do banco de dados
        password: 'sua-senha', // Senha do banco de dados
        database: 'seu-banco', // Nome do banco de dados
    });
   ```
Certifique-se de fornecer as informações corretas de acordo com o seu ambiente local. Após essa configuração, o projeto estará pronto para se conectar ao seu banco de dados PostgreSQL local.

Lembre-se de que as informações do banco de dados são sensíveis, portanto, mantenha-as seguras e não compartilhe com terceiros.

## 💯Estrutura do Projeto

- `controllers`: Contém os controladores.
- `middleware`: Contém os intermediários.
- `routers`: Contém as rotas.
- `utils`: Contém as funções auxiliares.
- `index`: Contém o aqruivo principal do programa.
- `connection`: Contém as conexão com o banco de dados.
- `jwtpassword`: Contém a senha segura do token.

## 💌Informações Adicionais

Além da funcionalidade principal de gerenciamento de contas bancárias por meio de uma API REST, este projeto incorpora diversas práticas e conceitos avançados de desenvolvimento de software:

- Autenticação de Usuário

- Criptografia de Senhas com Hash


- Manipulação de Banco de Dados


- Segurança em Geral


## 🕹️Tecnologias

JAVASCRIPT | NODE.JS | POSTGRES | EXPRESS.JS | API REST 
:------:  | :------: | :------: | :------: | :------:
<img align="center" alt="JavaScript" height="40em" width="40em" src="https://github.com/andressa-silvaa/BankAPI-Node/assets/120581625/0e01b699-bb38-4fe4-803a-d8927926ecd6" /> | <img align="center" alt="Node" height="45em" width="50em" src="https://github.com/andressa-silvaa/BankAPI-Node/assets/120581625/32d12d0d-f886-4973-875c-db5202606b63" /> | <img align="center" alt="Postegres" height="40em" width="40em" src="https://github.com/andressa-silvaa/BankAPI-Node/assets/120581625/9f1ce95b-f8a7-46a2-9827-7c3f8bb47ca8" /> | <img align="center" alt="Express" height="35em" width="60em" src="https://github.com/andressa-silvaa/BankAPI-Node/assets/120581625/5a00fb36-21dc-410c-9282-f11d577dbec6" /> | <img align="center" alt="Api-Rest" height="35em" width="40em" src="https://github.com/andressa-silvaa/BankAPI-Node/assets/120581625/a2a32005-bccc-4a78-a8fc-a7e18152a362" />

## 👩Autor
<img align="center" alt="Andressa" height="150em" width="150em" src="https://media.discordapp.net/attachments/805220480566165514/1143905030819295332/2fc4a8b8-fefc-488e-8451-d74ea820b6ea.jpg?width=441&height=441" />

>Andressa Silva
