# ToDo List SHX

## Documentação

- [Sobre](#sobre)
- [Estrutura](#estrutura-de-pastas-de-src)
- [Tecnologias](#tecnologias)
- [Experimente](#experimente)
- [Instalação](#instalação)

## Sobre

Este projeto foi desenvolvido como teste para vaga de front-end da empresa SHX com os seguintes objetivos:

### Avaliar habilidades fundamentais de um desenvolvedor em React Native, como:

- Expo
- Typescript
- Conhecimento de JSX e componentes.
- Uso de hooks (useState, useEffect, etc.)
- Gerenciamento de estado simples.
- Estilização e layout.
- Integração com APIs externas.

### Descrição do Teste:

Criação de um aplicativo simples utilizando expo de lista de tarefas (To-Do List) com as seguintes funcionalidades:

- ✅ Adicionar tarefas: Um campo de texto para inserir uma nova tarefa e um botão para adicionar à lista.
- ✅ Exibir tarefas: Uma lista dinâmica que mostra as tarefas adicionadas.
- ✅ Marcar como concluída: Opção para marcar/desmarcar uma tarefa como concluída.
- ✅ Remover tarefas: Botão para excluir uma tarefa.
- ✅ Persistência de dados: Salvar e carregar as tarefas usando AsyncStorage.
- ✅ Estilização básica: Interface agradável e funcional.
- ✅ Consumo de API: Integrar com uma API pública como a JSONPlaceholder (https://jsonplaceholder.typicode.com/) para exibir uma lista inicial de tarefas.

### Extras

#### Core

- ✅ Redux para gerenciamento de estado e persistência do AsyncStorage
- ✅ Uso de clean arch com injeção de independencia
- ✅ Criado HttpClient para isolar a implementação do axios
- ✅ Testes unitários no core da aplicação e redux

#### View

- ✅ Lista ordenável com drag and drop
- ✅ Uso de swipeable dentro da lista
- ✅ Uso de modais do tipo bottomSheet
- ✅ Dark Mode
- ✅ Nativewind para estilização com tailwindcss

## Estrutura de pastas de SRC

```
.
├── @types
├── app
├── assets
├── components
│   ├── atoms
│   ├── molecules
│   ├── organism
│   ├── page
│   ├── screen
│   ├── templates
│   └── ui
├── config
├── constants
├── contexts
├── core
│   ├── __tests__
│   ├── application
│   │   └── use-cases
│   ├── domain
│   └── infra
│       └── adapters
├── hooks
├── store
│   ├── __mocks__
│   ├── __tests__
│   ├── hooks
│   └── reducers
│       └── todos
└── styles
```

## Tecnologias

| Nome    | Versão  | Objetivo                           |
| ------- | ------- | ---------------------------------- |
| Node.js | 22.5.1  | Interpretador Javascript           |
| NPM     | 10.8.2  | Gerenciar dependências             |
| Expo    | 52.0.30 | Framework para dispositivos móveis |

## Versão mínima

| Nome    | Versão |
| ------- | ------ |
| IOS     | 15.1+  |
| Android | 6+     |

## Experimente

Você pode instalar o apk do app no seu `Android` baixando no link abaixo

- https://expo.dev/artifacts/eas/wj2dZszGmML4uaGGnQMHj3.apk

![app (online-video-cutter com)](https://github.com/user-attachments/assets/e87fcf6d-1a46-4e0f-b8d0-fb57f8e294f1)

## Instalação

### No Desktop

1. Clone o projeto com HTTPS ou SSH
   HTTPS

```bash
$ git clone https://github.com/oliveiragit/react-native-todo-list.git
```

SSH

```bash
$ git clone git@github.com:oliveiragit/react-native-todo-list.git
```

2. Abra a pasta

```bash
$ cd react-native-todo-list
```

Instale as dependências no projeto.

```bash
$ npm install
```

### No dispositivo

1. Instale o aplicativo **Expo Go** no seu aparelho através das lojas:

Android

- [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US)

IOS

- [App Store](https://apps.apple.com/br/app/expo-go/id982107779)

2. Mantenha-o conectado na mesma rede do computador.

### Iniciar o projeto

```bash
$ npm start
```

Aparecerá no terminal um QR code que deverá ser escaneado através do App `Expo Go` no dispositivo físico.

### Iniciar o projeto em Simulador IOS ou Emulador android

```bash
$ npm start
```

Pressione a tecla `i` para abrir o simulador do IOS (iPhone), funciona apenas no MacOS com o `Xcode` instalado, ou pressione a tecla `a` para abrir um Simulador Android, que também só funciona com o `Android Studio`(Windows, Linux ou Mac) pré instalado na máquina.

🟡 Atenção ao testar no simulador habilite o teclado dispositivo para digitar em caixa de texto dentro modais. Utilizar o teclado do computador faz o modal fechar.

### Resolução de problemas:

1. Caso tenha iniciado o projeto sem o .env ou necessitou modificá-lo em algum momento.

```bash
$ npx expo -c
```
