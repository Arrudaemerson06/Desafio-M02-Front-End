Para rodar o projeto utilize o liveserver (encontrado em extensões no vs code) ou abra o arquivo HTML no seu navagador;

Execute no terminal o comando $npm i para instalar todas as bibliotecas necessárias para o funcionamento da aplicação.

A aplicação consiste de um guia de filmes mais bem ranekados no IMDB. Ela faz o consumo de api externa (que alimenta os cards de filmes); A API 
está instanciada no arquivo api.js encontrado na pasta js;

Assim que executada a aplicação irá listar os 18 filmes mais bem rankeados no IMDB. Cada página exibe 6 filmes e a paginação é ativada pelas setas laterais.

<img width="1402" alt="Captura de Tela 2023-03-05 às 16 21 54" src="https://user-images.githubusercontent.com/111002975/222981229-e9a31bec-7aed-46a3-9dc7-5722402e4e70.png">

O filme do dia, traz o filme mais bem rankeado no dia.
<img width="1396" alt="Captura de Tela 2023-03-05 às 16 22 26" src="https://user-images.githubusercontent.com/111002975/222981247-c72958a4-f9d7-4620-aab7-5f4277e73900.png">

Ao clicar no filme, um modal se abrirá trazendo uma resenha sobre o filme, suas categorias e sua nota no IMDB.
![Captura de Tela 2023-03-05 às 16 23 37](https://user-images.githubusercontent.com/111002975/222981285-61249016-6798-4754-ba47-ada1e34e6567.png)

O mecanismo de pesqiusa retorno todos os conteúdos encontrados referentes àquele título.
![Captura de Tela 2023-03-05 às 16 24 25](https://user-images.githubusercontent.com/111002975/222981326-84f1833d-1d07-41eb-86b8-ef02543a647f.png)

A aplicação também está disponível no modo escuro
![Captura de Tela 2023-03-05 às 16 25 44](https://user-images.githubusercontent.com/111002975/222981392-6b86a40f-8f2e-4b80-8a9b-eee85e6753d4.png)
