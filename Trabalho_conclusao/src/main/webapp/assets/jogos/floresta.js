// ===============================================
//  JOGO: O Mistério da Floresta
// ===============================================

// Carrega CSS apenas uma vez
function carregarCssFloresta() {
    if (document.getElementById("cssFloresta")) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "assets/css/floresta.css";
    link.id = "cssFloresta";

    document.head.appendChild(link);
}

// Inicialização
window.iniciarJogoFloresta = function () {
    carregarCssFloresta();

    const container = document.getElementById("gameContainer");
    if (!container) { console.error("gameContainer não encontrado!"); return; }

    container.innerHTML = "";
    cenaIntroducao();
};

// Renderizador de cenas
function mostrarCena(texto, opcoes, imagem = null) {
    const container = document.getElementById("gameContainer");
    container.innerHTML = "";

    if (imagem) {
        container.style.backgroundImage = `url(${imagem})`;
        container.style.backgroundSize = "cover";
        container.style.backgroundPosition = "center";
        container.style.backgroundRepeat = "no-repeat";

    }

    const p = document.createElement("p");
    p.className = "cena-texto";
    p.textContent = texto;
    container.appendChild(p);

    const btnArea = document.createElement("div");
    btnArea.className = "opcoes-jogo";

    opcoes.forEach(op => {
        const btn = document.createElement("button");
        btn.className = "btn-escolha";
        btn.textContent = op.texto;
        btn.onclick = op.acao;
        btnArea.appendChild(btn);
    });

    container.appendChild(btnArea);
}

// ===============================================
//  CENAS
// ===============================================

function cenaIntroducao() {
    mostrarCena(
        "O sol estava se pondo quando você e seu amigo Coelho entraram na floresta encantada. " +
        "De repente, ouviram um barulho estranho vindo do fundo da mata... " +
        "Uma voz misteriosa sussurra: 'Só quem resolver meus enigmas encontrará o tesouro escondido!'. " +
        "Você aceita o desafio?",
        [
            { texto: "Sim", acao: cenaEscolhaTrilha },
            { texto: "Não", acao: finalNaoAceitou }
        ],
        "assets/img/cena1.png"
    );
}

function finalNaoAceitou() {
    mostrarCena(
        "Você decide que é melhor voltar para casa. O Coelho concorda, e vocês seguem para um lugar seguro. " +
        "Talvez a floresta encantada não estivesse pronta para vocês hoje!",
        [{ texto: "Retornar ao início", acao: cenaIntroducao }],
        "assets/img/cena2.png"
    );
}

function cenaEscolhaTrilha() {
    mostrarCena(
        "Vocês encontram duas trilhas na floresta. A Trilha das Luzes brilha com pontos mágicos no chão. " + "A Trilha Escura emite sons estranhos… Qual caminho escolher?",
        [
            { texto: "Trilha das Luzes", acao: cenaEnigmaLuzes },
            { texto: "Trilha Escura", acao: cenaArmadilha }
        ],
        "assets/img/cena3.png"
    );
}

function cenaEnigmaLuzes() {
    mostrarCena(
        "O chão brilha com a sequência: 🔵 🔴 🔵 ❓\n\nQual cor vem depois?",
        [
            { texto: "🔵 Azul", acao: cenaPonte },
            { texto: "🔴 Vermelho", acao: cenaEnigmaErrado }
        ],
        "assets/img/cena4.png"
    );
}

function cenaEnigmaErrado() {
    mostrarCena(
        "Você escolheu a cor errada!",
        [{ texto: "Tentar novamente", acao: cenaEnigmaLuzes }]
    );
}

function cenaArmadilha() {
    mostrarCena(
        "Ao entrar na trilha escura, vocês caem em uma rede presa nas árvores! " + "Para sair, só é possível cortar uma corda, mas qual delas?",
        [
            { texto: "Corda Verde", acao: cenaPonte },
            { texto: "Corda Vermelha", acao: cenaArmadilhaErrado }
        ],
        "assets/img/cena5.png"
    );
}

function cenaArmadilhaErrado() {
    mostrarCena(
        "A rede aperta ainda mais! Não era essa a corda certa... Que tal cortar a outra?",
        [{ texto: "Voltar", acao: cenaCordaErrada }]
    );
}

function cenaCordaErrada(){
    mostrarCena("Só nos resta cortar a outra corda.",
        [
            {texto: "Corda Verde", acao: cenaPonte }
        ]
    );
}

function cenaPonte() {
    mostrarCena(
        "Vocês chegam a um rio e um corvo guardião aparece:\n\n" + "Para atravessar essa ponte responda, se eu tenho 2 maçãs e ganho mais 3, com quantas fico?",
        [
            { texto: "5", acao: cenaFinal },
            { texto: "4", acao: cenaPonteErro },
            { texto: "6", acao: cenaPonteErro }
        ],
        "assets/img/cena6.png"
    );
}

function cenaPonteErro() {
    mostrarCena(
        "O corvo balança a cabeça… 'Resposta incorreta. Tente novamente.'",
        [{ texto: "Tentar novamente", acao: cenaPonte }]
    );
}

function cenaFinal() {
    mostrarCena(
        "Vocês encontram um baú encantado! Dentro dele há um livro mágico com a mensagem:\n\n" + "Quem usa a lógica encontra o maior tesouro: o conhecimento.\n\n" + "Parabéns!",
        [{ texto: "Jogar novamente", acao: cenaIntroducao }],
        "assets/img/cena7.png"
    );
}
