// ---------------------------
// SISTEMA DE VOTOS
// ---------------------------

// Se não existir nada no localStorage, cria o objeto inicial:
if (!localStorage.getItem("votosIdeias")) {
  localStorage.setItem("votosIdeias", JSON.stringify({
    ideia1: 0,
    ideia2: 0,
    ideia3: 0
  }));
}

// Função para votar em uma ideia
function votarNaIdeia(ideia) {
  let votos = JSON.parse(localStorage.getItem("votosIdeias"));
  votos[ideia]++; // incrementa o voto
  localStorage.setItem("votosIdeias", JSON.stringify(votos));

  alert(`Obrigado pelo voto na ${ideia}!`);
}

// Associar eventos aos botões
document.querySelectorAll(".vote-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".lab-card");
    const ideia = card.getAttribute("data-idea");
    votarNaIdeia(ideia);
  });
});


// ---------------------------
// FORMULÁRIO "ENVIE-NOS A SUA IDEIA"
// ---------------------------
document.getElementById("form-ideias").addEventListener("submit", function(event) {
  event.preventDefault(); // evita recarregar a página

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const descricao = document.getElementById("descricao").value.trim();

  if (!nome || !email || !descricao) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // opcional: guardar também no localStorage
  const novaIdeia = {
    nome,
    email,
    descricao,
    data: new Date().toLocaleString()
  };

  let ideiasSalvas = JSON.parse(localStorage.getItem("ideiasEnviadas")) || [];
  ideiasSalvas.push(novaIdeia);

  localStorage.setItem("ideiasEnviadas", JSON.stringify(ideiasSalvas));

  alert("Sua ideia foi enviada com sucesso!");

  this.reset();
});
