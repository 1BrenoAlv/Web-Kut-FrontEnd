
# WebKut ✨

Bem-vindo ao repositório do frontend do **WebKut**, uma aplicação web moderna construída com Vue.js e as melhores ferramentas do ecossistema. Este projeto serve como a interface de usuário para a plataforma WebKut, oferecendo uma experiência de usuário rica e reativa.

## 📜 Sobre o Projeto

WebKut é uma plataforma social projetada para conectar pessoas através de postagens e interações. Este frontend consome uma [API RESTful](https://github.com/1BrenoAlv/ApiWebKut) (ASP.NET) para realizar operações como autenticação de usuários, criação e visualização de posts, gerenciamento de perfil e muito mais. A interface foi construída com foco em reatividade, performance e um design limpo.

-----

## 🚀 Funcionalidades Principais

  * **Autenticação de Usuário:** Sistema completo de login e registro com gerenciamento de sessão via JWT.
  * **Feed de Posts:** Visualização de posts de usuários, com suporte a imagens e conteúdo de texto.
  * **Criação e Gerenciamento de Posts:** Usuários autenticados podem criar, editar e deletar seus próprios posts.
  * **Gerenciamento de Perfil:** Os usuários podem visualizar e atualizar suas informações de perfil e alterar a senha.
  * **Estilização:** Interface construída com Tailwind CSS.
  * **Gerenciamento de Estado Centralizado:** Utiliza Pinia para um gerenciamento de estado global previsível e eficiente.

-----

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um conjunto de tecnologias modernas para garantir performance e uma ótima experiência de desenvolvimento.

  * **Framework Principal:** [Vue.js](https://vuejs.org/) (v3)
  * **Roteamento:** [Vue Router](https://router.vuejs.org/)
  * **Gerenciamento de Estado:** [Pinia](https://pinia.vuejs.org/)
  * **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
  * **Cliente HTTP:** [Axios](https://axios-http.com/)
  * **Build Tool:** [Vite](https://vitejs.dev/)
  * **Utilitários:**
      * `jwt-decode` para decodificar tokens JWT no cliente.
      * `@headlessui/vue` e `@heroicons/vue` para componentes de UI acessíveis.
      * `@tailwindcss/line-clamp` para truncamento de texto.

-----

## 📁 Estrutura do Projeto

O projeto segue uma estrutura de pastas organizada para facilitar a manutenção e o desenvolvimento:

```
/src
├── assets/         # Arquivos estáticos como CSS global e imagens
├── components/     # Componentes Vue reutilizáveis (botões, modais, etc.)
├── router/         # Configuração das rotas da aplicação (Vue Router)
├── services/       # Lógica de comunicação com a API (configuração do Axios)
├── stores/         # Módulos de estado global (Pinia)
├── views/          # Componentes de página (Home, Login, Perfil, etc.)
├── App.vue         # Componente raiz da aplicação
└── main.js         # Ponto de entrada da aplicação
```

-----

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em uma versão compatível.

  * **Node.js:** `^20.19.0` ou `>=22.12.0`

-----

## 🏁 Como Começar

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

**1. Clone o repositório:**

```bash
git clone https://github.com/1BrenoAlv/Web-Kut-FrontEnd.git
cd Web-Kut-FrontEnd
```

**2. Instale as dependências:**

O comando a seguir irá ler o arquivo `package.json` e instalar todas as dependências necessárias de uma só vez, incluindo Vue, Tailwind CSS, Pinia, Axios, etc.

```bash
npm install
```

**3. Conecte com o Backend:**

Este projeto frontend precisa se comunicar com a API backend para funcionar. Certifique-se de que o servidor backend esteja rodando. A URL da API está configurada diretamente no arquivo de serviços do Axios (ex: `src/services/api.js`).

**4. Rode o servidor de desenvolvimento:**

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173` (ou outra porta indicada no terminal). O Vite fornecerá uma experiência de desenvolvimento rápida com Hot-Reload.

-----

## 📜 Scripts Disponíveis

  * **`npm run dev`**: Inicia o servidor de desenvolvimento.
  * **`npm run build`**: Compila e otimiza a aplicação para produção, gerando os arquivos na pasta `dist/`.
  * **`npm run preview`**: Inicia um servidor local para visualizar a versão de produção (requer `npm run build` antes).
  * **`npm run format`**: Formata todos os arquivos do projeto usando o Prettier, garantindo a consistência do código.
