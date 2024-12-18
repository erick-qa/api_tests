# API Testing with Cypress

Este é um projeto de automação de testes para APIs utilizando o **Cypress**. O objetivo deste projeto é testar os endpoints da API pública [Reqres.in](https://reqres.in), incluindo operações como **listar usuários**, **criar um novo usuário**, **atualizar dados de um usuário** e **deletar um usuário**.

## Funcionalidades

Este projeto de testes inclui os seguintes cenários de teste:

1. **Listar usuários** e armazenar um ID aleatório.
2. **Validar um usuário específico** com um ID aleatório.
3. **Validar todas as páginas de usuários**.
4. **Retornar erro 404** ao buscar um usuário não encontrado.
5. **Criar um usuário** com nome e cargo aleatórios.
6. **Atualizar o nome e o cargo** de um usuário.
7. **Deletar o usuário** criado e atualizado.

## Pré-requisitos

Antes de rodar os testes, é necessário instalar as dependências. O projeto foi desenvolvido com as seguintes bibliotecas:

- **Cypress**: Framework de testes para automação de testes de APIs e interfaces.
- **@faker-js/faker**: Biblioteca para geração de dados falsos, como nome e cargo.
- **cypress-plugin-api**: Plugin para facilitar a realização de requisições API em Cypress.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/erick-qa/api_tests.git

2. Instale as dependências necessárias com o comando:

   ```bash
   npm install
   
Isso instalará o Cypress, o Faker e o cypress-plugin-api, além de outras dependências definidas no package.json.

Executando os Testes
1. Modo interativo (Cypress UI)
Para rodar os testes no modo interativo (onde você pode ver os testes sendo executados na interface gráfica do Cypress), use o comando:

   ```bash
   npx cypress open

2. Modo headless (sem interface gráfica)
Para rodar os testes sem a interface gráfica (modo headless), execute o seguinte comando:

   ```bash
   npx cypress run

Estrutura do Projeto
A estrutura do projeto é a seguinte:

