let todasAsPerguntasDoJSON = [];
let rodadaAtual = 0;
let pontos = 0;
let metaDeAcertos = 0;
let numeroTotalDeRodadas = 0;
let perguntaExibidaNaRodada;
let perguntasDoCicloAtual = [];

const somCorreto = new Audio("sons/correct.mp3");
const somIncorreto = new Audio("sons/incorrect.mp3");

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

async function carregarPerguntas() {
  try {
    const response = await fetch("perguntas.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const dadosQuiz = await response.json();

    if (
      dadosQuiz.configuracoes &&
      typeof dadosQuiz.configuracoes.metaDeAcertos === "number"
    ) {
      metaDeAcertos = dadosQuiz.configuracoes.metaDeAcertos;
    } else {
      console.warn("Meta de acertos não configurada ou inválida. Usando 0.");
      metaDeAcertos = 0;
    }

    if (
      dadosQuiz.configuracoes &&
      typeof dadosQuiz.configuracoes.numeroDeOportunidades === "number" &&
      dadosQuiz.configuracoes.numeroDeOportunidades > 0
    ) {
      numeroTotalDeRodadas = dadosQuiz.configuracoes.numeroDeOportunidades;
    } else {
      console.warn(
        "Número de oportunidades não configurado ou inválido. Usando o total de perguntas do JSON."
      );
      numeroTotalDeRodadas = dadosQuiz.listaDePerguntas
        ? dadosQuiz.listaDePerguntas.length
        : 0;
    }

    if (
      dadosQuiz.listaDePerguntas &&
      Array.isArray(dadosQuiz.listaDePerguntas)
    ) {
      todasAsPerguntasDoJSON = dadosQuiz.listaDePerguntas;
    } else {
      throw new Error("Formato da lista de perguntas inválido no JSON.");
    }

    if (todasAsPerguntasDoJSON.length === 0 && numeroTotalDeRodadas > 0) {
      console.error(
        "Configurado para ter rodadas, mas não há perguntas no JSON."
      );
      document.getElementById("question").innerText =
        "Erro: Nenhuma pergunta disponível para o quiz.";
      return;
    }

    if (numeroTotalDeRodadas === 0) {
      document.getElementById("question").innerText =
        "Nenhuma pergunta para exibir (0 oportunidades configuradas ou 0 perguntas no JSON).";
      return;
    }

    if (todasAsPerguntasDoJSON.length > 0) {
      prepararProximoCicloDePerguntas();
      iniciarQuiz();
    } else if (numeroTotalDeRodadas > 0) {
      console.error(
        "Configurado para ter rodadas, mas não há perguntas no JSON."
      );
      document.getElementById("question").innerText =
        "Erro: Nenhuma pergunta disponível para o quiz.";
    } else {
      document.getElementById("question").innerText =
        "Nenhuma pergunta para exibir.";
    }
  } catch (error) {
    console.error("Não foi possível carregar os dados do quiz:", error);
    document.getElementById("question").innerText =
      "Erro ao carregar dados do quiz.";
  }
}

function prepararProximoCicloDePerguntas() {
  if (todasAsPerguntasDoJSON.length === 0) {
    perguntasDoCicloAtual = [];
    return;
  }
  perguntasDoCicloAtual = [...todasAsPerguntasDoJSON];
  embaralharArray(perguntasDoCicloAtual);
}

function iniciarQuiz() {
  rodadaAtual = 0;
  pontos = 0;

  prepararProximoCicloDePerguntas();

  document.getElementById("score").style.display = "none";
  document.getElementById("score").innerHTML = "";
  document.getElementById("question-container").style.display = "block";
  proximaRodada();
}

function proximaRodada() {
  const feedbackEl = document.getElementById("feedback-message");
  if (feedbackEl) {
    feedbackEl.style.visibility = "hidden";
    feedbackEl.style.opacity = "0";
    feedbackEl.innerText = "";
    feedbackEl.className = "";
  }

  const progressInfoEl = document.getElementById("progress-info");
  if (progressInfoEl) {
    progressInfoEl.innerText = `Rodada ${
      rodadaAtual + 1
    } de ${numeroTotalDeRodadas} | Acertos: ${pontos}`;
    progressInfoEl.style.display = "block";
  }

  if (rodadaAtual >= numeroTotalDeRodadas) {
    mostrarPontuacao();
    return;
  }

  if (perguntasDoCicloAtual.length === 0) {
    if (todasAsPerguntasDoJSON.length > 0) {
      prepararProximoCicloDePerguntas();
    } else {
      document.getElementById("question").innerText =
        "Erro: Faltam perguntas para continuar.";
      return;
    }
  }

  if (perguntasDoCicloAtual.length === 0) {
    document.getElementById("question").innerText =
      "Não há mais perguntas únicas disponíveis.";
    return;
  }

  perguntaExibidaNaRodada = perguntasDoCicloAtual.pop();

  document.getElementById("question").innerText =
    perguntaExibidaNaRodada.pergunta;

  const containerRespostas = document.getElementById("answers");
  containerRespostas.innerHTML = "";

  perguntaExibidaNaRodada.respostas.forEach((resposta, index) => {
    const btn = document.createElement("button");
    btn.innerText = resposta;
    btn.classList.add("answer-btn");
    btn.onclick = () => verificarResposta(index);
    containerRespostas.appendChild(btn);
  });
}

function verificarResposta(respostaSelecionadaIndex) {
  const q = perguntaExibidaNaRodada;
  const feedbackEl = document.getElementById("feedback-message");
  const answerButtons = document.querySelectorAll("#answers .answer-btn");

  answerButtons.forEach((btn) => (btn.disabled = true));

  const textoRespostaSelecionada = q.respostas[respostaSelecionadaIndex];
  if (textoRespostaSelecionada === q.correta) {
    pontos++;
    feedbackEl.innerText = "Resposta correta! 🎉";
    feedbackEl.className = "feedback-correct";
    somCorreto.play();
  } else {
    feedbackEl.innerText = `Incorreto! 😥 A resposta correta é: ${q.correta}`;
    feedbackEl.className = "feedback-incorrect";
    somIncorreto.play();
  }
  feedbackEl.style.visibility = "visible";
  feedbackEl.style.opacity = "1";

  setTimeout(() => {
    feedbackEl.style.visibility = "hidden";
    feedbackEl.style.opacity = "0";
    feedbackEl.innerText = "";
    feedbackEl.className = "";

    rodadaAtual++;
    if (rodadaAtual < numeroTotalDeRodadas) {
      proximaRodada();
    } else {
      mostrarPontuacao();
    }
  }, 2000);
}

function mostrarPontuacao() {
  document.getElementById("question-container").style.display = "none";

  const progressInfoEl = document.getElementById("progress-info");
  if (progressInfoEl) {
    progressInfoEl.style.display = "none";
  }

  const scoreEl = document.getElementById("score");
  let mensagemFinal = `Você acertou ${pontos} de ${numeroTotalDeRodadas} rodadas!`;

  if (metaDeAcertos > 0) {
    if (pontos >= metaDeAcertos) {
      mensagemFinal += ` 🎉 Parabéns! Você atingiu a meta de ${metaDeAcertos} acertos!`;
    } else {
      mensagemFinal += ` 😥 Você não atingiu a meta de ${metaDeAcertos} acertos. Continue tentando!`;
    }
  }

  scoreEl.innerText = mensagemFinal;
  scoreEl.style.display = "block";

  const restartBtn = document.createElement("button");
  restartBtn.innerText = "Jogar Novamente";
  restartBtn.classList.add("answer-btn");
  restartBtn.onclick = iniciarQuiz;
  scoreEl.appendChild(restartBtn);
}

carregarPerguntas();
