## Onde Mudar as Perguntas?

1.  Procure um arquivo chamado `perguntas.json`. Ele está na mesma pasta do jogo.
2.  Abra este arquivo com um editor de texto simples (como o Bloco de Notas).

## Como é o Arquivo `perguntas.json`?

Dentro desse arquivo, você vai ver algo assim:

```json
{
  "configuracoes": {
    "metaDeAcertos": 4,
    "numeroDeOportunidades": 4
  },
  "listaDePerguntas": []
}
```

**O que você pode mudar:**

- `"metaDeAcertos"`: Quantas perguntas o jogador precisa acertar para uma mensagem especial.
- `"numeroDeOportunidades"`: Quantas perguntas vão aparecer no total no jogo.

**O mais importante: `listaDePerguntas`**

É aqui que ficam todas as perguntas do jogo.

## Como Mudar ou Adicionar uma Pergunta?

Cada pergunta no jogo parece com isso:

```json
{
  "pergunta": "Qual o nome do seu cachorro?",
  "respostas": ["Rex", "Bolinha", "Totó", "Fifi"],
  "correta": "Bolinha"
}
```

Para cada pergunta, você tem:

1.  `"pergunta"`: Escreva aqui a pergunta que você quer fazer.
    - Exemplo: `"pergunta": "Qual a cor do céu?"`
2.  `"respostas"`: Aqui você coloca as opções de resposta.
    - Coloque cada opção entre aspas `""` e separe com vírgula `,`.
    - Exemplo: `"respostas": ["Azul", "Verde", "Vermelho"]`
3.  `"correta"`: Escreva aqui **exatamente** qual das respostas acima é a certa.
    - Exemplo: Se a resposta certa é "Azul", coloque: `"correta": "Azul"`

exemplo:

{
"configuracoes": {
"metaDeAcertos": 10,
"numeroDeOportunidades": 15
},
"listaDePerguntas": [
{
"pergunta": "Qual destes instrumentos é conhecido como o 'rei dos instrumentos'?",
"respostas": ["Violino", "Piano", "Órgão de Tubos", "Flauta Transversal"],
"correta": "Órgão de Tubos"
},
{
"pergunta": "Quem é conhecido como o 'Rei do Pop'?",
"respostas": ["Elvis Presley", "Michael Jackson", "Prince", "Stevie Wonder"],
"correta": "Michael Jackson"
},
{
"pergunta": "Qual banda britânica lançou o álbum 'The Dark Side of the Moon'?",
"respostas": ["The Beatles", "Led Zeppelin", "Pink Floyd", "Queen"],
"correta": "Pink Floyd"
},
{
"pergunta": "Qual é o nome do famoso festival de música que ocorreu em 1969 nos EUA?",
"respostas": ["Lollapalooza", "Coachella", "Woodstock", "Glastonbury"],
"correta": "Woodstock"
},
{
"pergunta": "Quantas cordas tem um violão clássico padrão?",
"respostas": ["4", "6", "7", "12"],
"correta": "6"
},
{
"pergunta": "Qual destes compositores é famoso por suas 'Quatro Estações'?",
"respostas": ["Mozart", "Beethoven", "Bach", "Vivaldi"],
"correta": "Vivaldi"
},
{
"pergunta": "Qual gênero musical é fortemente associado a Nova Orleans?",
"respostas": ["Country", "Jazz", "Hip Hop", "Rock Progressivo"],
"correta": "Jazz"
},
{
"pergunta": "Quem foi o vocalista da banda Queen?",
"respostas": ["Freddie Mercury", "Roger Taylor", "Brian May", "John Deacon"],
"correta": "Freddie Mercury"
},
{
"pergunta": "Qual instrumento de percussão consiste em um conjunto de tambores e pratos?",
"respostas": ["Xilofone", "Tímpano", "Bateria", "Conga"],
"correta": "Bateria"
},
{
"pergunta": "Em que país surgiu o Tango?",
"respostas": ["Brasil", "Espanha", "Argentina", "Portugal"],
"correta": "Argentina"
},
{
"pergunta": "Qual destes artistas é um famoso rapper americano conhecido por álbuns como 'The Marshall Mathers LP'?",
"respostas": ["Snoop Dogg", "Jay-Z", "Eminem", "Kanye West"],
"correta": "Eminem"
},
{
"pergunta": "Qual é o nome da escala musical composta por sete notas distintas, mais a repetição da primeira em oitava?",
"respostas": ["Escala Pentatônica", "Escala Cromática", "Escala Diatônica", "Modo Lídio"],
"correta": "Escala Diatônica"
},
{
"pergunta": "Que banda de rock ficou famosa pela música 'Stairway to Heaven'?",
"respostas": ["Deep Purple", "Black Sabbath", "Led Zeppelin", "The Who"],
"correta": "Led Zeppelin"
},
{
"pergunta": "Qual destes é um instrumento de sopro feito de metal, comumente usado no jazz e música clássica?",
"respostas": ["Clarinete", "Fagote", "Saxofone", "Oboé"],
"correta": "Saxofone"
},
{
"pergunta": "Quem compôs a famosa 'Für Elise'?",
"respostas": ["Johann Sebastian Bach", "Wolfgang Amadeus Mozart", "Ludwig van Beethoven", "Franz Schubert"],
"correta": "Ludwig van Beethoven"
}
]
}
