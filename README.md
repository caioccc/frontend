# Frontend para TODO List APP

[![Netlify Status](https://api.netlify.com/api/v1/badges/db52211b-33d7-4097-bd53-5e4219258cb2/deploy-status)](https://app.netlify.com/sites/jolly-tarsier-4e4b89/deploys)

Frontend para aplicação de Todo List App, desenvolvido em React com NextJS Framework, utilizando:
- React 19
- NextJS 15
- Typescript 5
- Axios
- ShadCN UI
- Cypress
- Eslint


## **Tabela de Conteúdos**

- [📝 Descrição](#descrição)
- [🚀 Instalação](#instalação)
- [📦 Execução](#execução))
- [Sobre os componentes base (Core).](#sobre-os-componentes-base-(core))
- [Testes](#testes)
- [Qualidade de código](#qualidade-de-código)
- [Docker](#docker)
- [🚀 Sobre o desafio](#sobre-o-desafio)
- [📝 Licença](#licença)
- [📝 Autor](#autor)

## 📝 Descrição

Este projeto foi desenvolvido com Angular Framework, utilizando:

- React 19
- NextJS 15
- Typescript 5
- NPM 10.5.0
- Node 18.20.2

## 🚀 Instalação

Para rodar a aplicação você deverá se certificar que está utilizando a versão 18.20.2 do Node e a versão 10.5.0 do NPM.

### 1. Instale o Node e o NPM na sua máquina

Se estiver no Windows:

- Baixe e instale o NodeJS: https://nodejs.org/en/download/

### 2. Instale as dependencias do projeto

Instale todas as dependencias do projeto:

```sh
$ npm install
```

## 📦 Execução em development

Para executar a aplicação, basta rodar o comando abaixo:

```sh
$ npm run dev
```

Finalmente, acesse http://localhost:3000 (frontend app).

OBS: Para rodar a aplicação, é necessário que o backend esteja rodando. Para isto, deve-se observar em enviroments/.env.dev o endereço do backend. Você pode alterar o endereço do backend para o endereço local, caso esteja rodando o backend localmente.

```ts
NEXT_PUBLIC_BASE_URL=http://localhost:8000
```

## Testes

Todos os testes criados são testes de end-to-end (e2e), construídos com a biblioteca Cypress. Nestes testes temos a
verificação dos componentes presentes na tela de acordo com requisitos pré-definidos, além da verificação de fluxos de
navegação e de interação com o usuário.

Para rodar os testes implementados, é necessário que o BACKEND esteja ligado, para que as funcionalidades implementadas
possam requisitar a API corretamente. Para isto, basta executar o comando abaixo:

```bash
  npm run e2e
```

Uma suíte com os testes irá rodar. Você pode verificar o resultado no terminal.

Se você tiver conhecimento de Cypress, é possível acessar a GUI do Cypress para visualizar os testes e rodá-los
individualmente. Para isto, basta executar o comando abaixo:

```bash
  npm run e2e-gui
```

## Qualidade de código

Para verificar a qualidade de código, foi utilizado o TSLint, que é um linter de código.

TSLint é uma ferramenta que pode ser usada para verificar o código TypeScript. Ele pode ser usado para verificar se o
código está em conformidade com um conjunto de regras definidas. Por exemplo, você pode usar TSLint para verificar se o
código está em conformidade com o guia de estilo do Airbnb.

Todos os erros mais comuns foram corrigidos com a utilização do TSLint:

- [x] Missing semicolon
- [x] Missing whitespace
- [x] Expected indentation of 2 spaces but found 4
- [x] Expected blank line between class members
- [x] Missing trailing comma
- [x] Missing space before function parentheses
- [x] Missing space before opening brace

## Docker

Além da instalação manual, o projeto também pode ser executado em um container Docker. Para isso, temos dois caminhos
bem fáceis. Assim, basta seguir os passos abaixo:

### Primeiro caminho

Com o docker e docker-compose instalados, basta rodar o comando abaixo na raiz do projeto frontend:

```bash
  docker-compose up --build
```

A aplicação já estará rodando em http://localhost:3000

### Segundo caminho

Com o docker instalado, basta rodar o comando abaixo na raiz do projeto frontend:

```bash
  docker build -t frontend .
```

Após a construção da imagem, basta rodar o comando abaixo para executar o container:

```bash
  docker run docker-next -p 3000:3000 -v /app/node_modules -v .:/app
```

A aplicação já estará rodando em http://localhost:3000

## 🚀 Sobre o desafio

O problema consiste em criar um frontend para uma Lista de Tarefas. O sistema deve ser capaz de listar as tarefas e realizar operações de CRUD (Create, Read, Update, Delete) sobre elas.

Pode-se perceber que o sistema possui uma estrutura de componentes bem definida, que facilita a manutenção e a criação de novas funcionalidades. A idealização do design implementado foi feita "de cabeça", necessitando de tempo maior paramelhor elaboração com relação a responsividade, adaptabilidade a multiplataformas, e técnicas para acessibilidade, porém utilizando o ShadCN UI, acredito que não ficou a desejar pois o framework de UI corresponde de maneira adequada.

Como estamos trabalhando em um MVP, temos então uma aplicação que atende os requisitos propostos, e que pode ser melhorada e evoluída posteriormente, seguindo uma filosofia Ágil de desenvolvimento, com um desenvolvimento iterativo e incremental, entregando funcionalidades mesmo que com Design ainda primário. Assim, proponho para uma nova versão a continuidade do desenvolvimento implementando esta listagem de acordo com os padrões citados acima, além de novas funcionalidades mais avançadas, como por exemplo, a criação de alertas de compartilhamento de tarefas, tab de notificações de alerta com contador, e a possibilidade de criar tarefas recorrentes, com a possibilidade de escolher a frequência de repetição, entre outras funcionalidades.


## Opcionais utilizados: IPSTACK e WHEATHERSTACK
Esta aplicação faz uso de API externa para buscar informações de localização e clima. Para isso, foi utilizado o IPSTACK e WHEATHERSTACK.
Ambos os serviços são gratuitos, porém, é necessário criar uma conta para obter a chave de acesso. Para isso, foi criado contas gratuitas em ambos os serviços e as chaves de acesso estão disponíveis no arquivo .env.dev

OBS: As chaves de acesso atualmente estão no código, porém, o ideal é que as chaves de acesso fiquem em um arquivo de "enviroment" e que este arquivo não seja versionado.
Porém para esta seleção decidi deixar as chaves de acesso no código para facilitar a execução do projeto.


## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

## Autor

<a href="#">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/7137962?v=4" width="100px;" alt=""/>
</a>
 <br />
 <sub><b>Caio Marinho</b></sub>
 <a href="#" title="Caio Marinho">🚀</a>

[![Linkedin Badge](https://img.shields.io/badge/-Caio%20Marinho-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/caiomarinho/)](https://www.linkedin.com/in/caiomarinho/)
[![Gmail Badge](https://img.shields.io/badge/-caiomarinho8@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:caiomarinho8@gmail.com)](mailto:caiomarinho8@gmail.com)

Made with ❤️ by [Caio Marinho!](https://www.linkedin.com/in/caiomarinho/) 👋🏽 [Get in Touch!](https://www.linkedin.com/in/caiomarinho/)

