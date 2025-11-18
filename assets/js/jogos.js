// Abrir / Fechar menu
const menuBtn = document.getElementById("menuBtn");
const headerMenu = document.getElementById("headerMenu");

menuBtn.addEventListener("click", () => {
  headerMenu.style.display = headerMenu.style.display === "block" ? "none" : "block";
});

// Carregar jogo na esquerda
function carregarJogo(jogo) {
  const area = document.getElementById("gameContainer");

  if (jogo === "floresta") {
    area.innerHTML = "<h2>Mistério da Floresta</h2><p>Carregando jogo...</p>";
  }

  if (jogo === "castelo") {
    area.innerHTML = "<h2>Aventura no Castelo</h2><p>Carregando jogo...</p>";
  }

  if (jogo === "espaco") {
    area.innerHTML = "<h2>A Jornada Espacial</h2><p>Carregando jogo...</p>";
  }
}
