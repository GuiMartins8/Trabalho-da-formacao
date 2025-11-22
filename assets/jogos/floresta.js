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
function mostrarCena(texto, opcoes = [], imagem = null) {
    const container = document.getElementById("gameContainer");
    container.innerHTML = "";

    if (imagem) {
        const img = document.createElement("img");
        img.src = imagem;
        img.className = "cena-img";
        container.appendChild(img);
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
        ]
    );
}

function finalNaoAceitou() {
    mostrarCena(
        "Você decide que é melhor voltar para casa. O Coelho concorda, e vocês seguem para um lugar seguro. " +
        "Talvez a floresta encantada não estivesse pronta para vocês hoje!",
        [{ texto: "Retornar ao início", acao: cenaIntroducao }]
    );
}

function cenaEscolhaTrilha() {
    mostrarCena(
        "Vocês encontram duas trilhas na floresta...",
        [
            { texto: "Trilha das Luzes", acao: cenaEnigmaLuzes },
            { texto: "Trilha Escura", acao: cenaArmadilha }
        ]
    );
}

function cenaEnigmaLuzes() {
    mostrarCena(
        "O chão brilha com a sequência: 🔵 🔴 🔵 ❓\n\nQual cor vem depois?",
        [
            { texto: "🔵 Azul", acao: cenaPonte },
            { texto: "🔴 Vermelho", acao: cenaEnigmaErrado }
        ]
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
        "Ao entrar na trilha escura, vocês caem em uma rede...",
        [
            { texto: "Corda Verde", acao: cenaPonte },
            { texto: "Corda Vermelha", acao: cenaArmadilhaErrado }
        ]
    );
}

function cenaArmadilhaErrado() {
    mostrarCena(
        "A rede aperta ainda mais!",
        [{ texto: "Voltar", acao: cenaEscolhaTrilha }]
    );
}

function cenaPonte() {
    mostrarCena(
        "Vocês chegam a um rio e um corvo guardião aparece:\n\n'2 maçãs + 3 = ?'",
        [
            { texto: "5", acao: cenaFinal },
            { texto: "4", acao: cenaPonteErro },
            { texto: "6", acao: cenaPonteErro }
        ]
    );
}

function cenaPonteErro() {
    mostrarCena(
        "Incorreto. Tente de novo.",
        [{ texto: "Tentar novamente", acao: cenaPonte }]
    );
}

function cenaFinal() {
    mostrarCena(
        "Tesouro encontrado! Parabéns!",
        [{ texto: "Jogar novamente", acao: cenaIntroducao }]
    );
}
