// Script extracted from Laboratorio_ideias.html
const votos = {
  'Aventura Matemática': 0,
  'O Enigma das Cores': 0,
  'Missão do Sistema Solar': 0
};

const ctx = document.getElementById('graficoVotos');
const grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: Object.keys(votos),
    datasets: [{
      label: 'Votos',
      data: Object.values(votos),
      backgroundColor: ['#6366F1', '#8B5CF6', '#60A5FA']
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true }
    }
  }
});

function votar(tema) {
  votos[tema]++;
  grafico.data.datasets[0].data = Object.values(votos);
  grafico.update();
  document.getElementById('mensagem-voto').textContent = `✅ Voto registrado em "${tema}"!`;
}

document.getElementById('form-ideia').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  const titulo = document.getElementById('titulo').value;
  document.getElementById('mensagem-envio').textContent = `Obrigado, ${nome}! Sua ideia "${titulo}" foi enviada com sucesso.`;
  e.target.reset();
});
