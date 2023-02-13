# :page_with_curl: Projeto

> Projeto desenvolvido no curso de apps desktop com electron da [Rocketseat](https://github.com/Rocketseat)

<LINKEDIN>
Você já conhecia o Electron?
</LINKEDIN>

O Electron é uma forma de desenvolver apps desktop utilizando stack da web, com HTML, CSS, JS, ou seja, você consegue desenvolver aps desktop aproveitando conhecimentos utilizados na web.

<LINKEDIN>
Em que momento fazer a escolha de utilizar o Electron em uma aplicação que vai para produção ?
</LINKEDIN>

Hoje existem outras alternativas além do Electron, como por exemplo o Tauri
O Tauri é um "electron" feito em Rust que tem o mesmo intuito de você conseguir
construir a interface da sua aplicação utilizando HTML, CSS, JS, porém a parte "backend" que tem dentro do electron, dentro do Tauri ela é escrita em Rust.
Outro ponto interessante no Tauri em relação ao Electron, é que as aplicações ficam menores, no Electron qualquer aplicação que você for desenvolver, pelo próprio tamanho do Electron vai ficar uma aplicação de 200MB mas no Tauri essas aplicações começam com 5 6MB, aumentando um pouco de acordo com o tanto de dependências que você tem na aplicação.

O Tauri tem suas vantagens em cima do Electron mas o Electron tem uma vantagem em cima do Tauri assim com qualquer outra ferramenta multiplataforma por exemplo um React-Native tem em cima de uma solução como o próprio SwiftUI por exemplo que é você reaproveitar conhecimentos que você já tem da web e sem perder muita performance da sua aplicação.

Nós temos de um lado máquinas mais poderosas, Internets mais velozes, cada vez mais espaço no dispositivo, então a gente simplesmente escolher uma tecnologia ou outra por migalhas de performance que pode ser a diferença que você tenha caso você não esteja nem sabendo o que está fazendo com uma ou outra(com Tauri ou Electron) dificilmente vai ser uma vantagem caso você esteja procurando produtividade.

Então se você está desenvolvendo uma aplicação desktop que é uma aplicação onde você vai reaproveitar a aplicação que você já tem na web, você quer reaproveitar conhecimento, tanto código da aplicação Web React, aplicação Backend Node criando uma aplicação Desktop, por mim vai de Electron sem duvida.

Agora, minha aplicação, o meu negócio, o core da minha empresa é uma aplicação Desktop, nesse caso, onde eu posso investir por exemplo conhecimento, posso investir em contratação, trazer time para trabalhar com outras tecnologias, nesse caso eu particularmente, dificilmente teria o olhar apenas para o Electron, ele continua sendo uma opção mas existem outras opções onde podemos olhar com mais calma.

Escolher entre o Electron e escolher entre uma outra tecnologia, se você já estudou mobile praticamente é a mesma decisão, você vai escolher entre usar um React Native, Flutter, Swift ou um Kotlin são decisões que partem de muito mais do que você está buscando, qual o seu momento, qual o seu contexto dentro do seu projeto.

Arquitetura do Electron

Cada aplicação que desenvolvemos com Electron tem as "duas pontas"
Ela tem uma camada client-side que é uma camada visual, onde tudo que está nessa camada é acessível diretamente pelo usuário, e essa camada client-side é chamada de renderer. O processo de renderer é o processo onde vai estar a camada visual da nossa aplicação, essa camada visual funciona como um browser, ela tem acesso as mesmas APIs que browser tem, ela poder fazer as mesmas operações que um browser pode fazer, ou seja, ela funciona exatamente igual a uma aplicação frontend, ela tem as mesmas permissões e também os mesmos cuidados.

Temos uma camada backend, que é chamada de main, essa camada que roda pelo server-side, é essa camada que pode ter acesso as APIs assim como o backend tem, fazer chamadas ao baco de dados, autenticação, lidar com APIs que são sensíveis e por ai vai.

E nós precisamos de alguma forma comunicar essas duas camadas, e aí o Electron tem uma forma que é chamada de Inter Process Communication(IPC), o IPC é basicamente uma API(biblioteca de funções) para poder ser possível enviar mensagens, comunicar mensagens entre a camada client-side(renderer) e a camada server-side(main), ou seja, você consegue assim como você faz em uma aplicação web tradicional, que temos chamadas HTTP enviando de um frontend para o backend, nós temos também no Electron uma comunicação que usa esse padrão de IPC que nada mais é do que envia uma mensagem, recebe a mensagem, devolve uma resposta.

Diferente de uma API REST, no Electron temos essa camada de comunicação podendo ser de via dupla(vai e volta), ou seja, o renderer pode enviar mensagens para o processo main que é onde está rodando o servidor do Electron e receber resposta, mas também eu posso ter o main enviando uma mensagem para o renderer sem necessidade do renderer ter pedido aquele informação, ou seja, na web toda vez que o frontend precisa se comunicar com o backend é o frontend que faz uma chamada para o backend buscando informações, no Electron conseguimos também tendo o processo main enviando diretamente uma informação para o renderer sem ele necessariamente ter pedido essa informação.

Temos uma terceira camada chamada de preload, o preload não necessariamente é uma camada isolada porque o preload tem código que vai ser executado dentro do renderer, ou seja, nós podemos entender que o preload é um código que vai executar na mesma camada do renderer(client-side) porém o preload tem acesso as APIs do node, ou seja, nós podemos entender o preload como sendo a ponte entre a camada main e a camada do renderer, podemos colocar no preload alguns códigos que facilitam a comunicação entre essas camadas.

# 🚀 Tecnologias/Bibliotecas utilizadas

<a href="https://www.typescriptlang.org/" target="_blank"> <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript"> </a>
<a href="https://www.electronjs.org/pt/" target="_blank"> <img src="https://img.shields.io/badge/-Electron-0057c2?style=flat-square&logo=electron&logoColor=white" alt="Electron"> </a>

# 💻 Autor

Feito com 💜 by Rodrigo Rael

<a href="https://www.linkedin.com/in/rodrigo-rael-a7a4b51a9/" target="_blank"> <img src="https://img.shields.io/badge/-RodrigoRael-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https" alt="Linkedin Rodrigo"> </a>
<a href="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" target="_blank"> <img src="https://img.shields.io/badge/-rodrigorael53@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:rodrigorael53@gmail.com" alt="Gmail Rodrigo"> </a>
