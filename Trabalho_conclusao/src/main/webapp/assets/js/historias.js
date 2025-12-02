// assets/js/historias.js
// Loader robusto para carregar jogos dinamicamente dentro do #gameContainer

(function () {
  // mapa de histórias -> { src: caminhoDoScript, starter: nomeDaFuncaoDeInicio }
  const HISTORY_MAP = {
    "floresta": { src: "assets/jogos/floresta.js", starter: "iniciarJogoFloresta" },
    "castelo": { src: "assets/jogos/castelo.js", starter: "iniciarJogoCastelo" },
    "espaco":  { src: "assets/jogos/espaco.js",  starter: "iniciarJogoEspaco" }
  };

  // controla scripts já carregados
  const loadedScripts = {};

  function log(...args) { console.log("[historias.js]", ...args); }
  function error(...args) { console.error("[historias.js]", ...args); }

  // limpa área do jogo (remover placeholder)
  function limparGameContainer() {
    const container = document.getElementById("gameContainer");
    if (!container) {
      error("gameContainer não encontrado no DOM.");
      return null;
    }
    container.innerHTML = "";
    // opcional: manter classe para estilo
    container.classList.remove("vazio");
    container.classList.add("cheio");
    return container;
  }

  // carrega script dinamicamente (retorna Promise)
  function carregarScriptOnce(src) {
    return new Promise((resolve, reject) => {
      // se já carregado, resolve imediatamente
      if (loadedScripts[src]) {
        log("Script já carregado:", src);
        resolve(loadedScripts[src]); // valor salvo (por compatibilidade)
        return;
      }

      // verifica se já existe um <script> com esse src no DOM
      const existing = Array.from(document.getElementsByTagName("script"))
        .find(s => s.src && s.src.includes(src));

      if (existing) {
        log("Encontrado <script> existente no DOM para:", src);
        loadedScripts[src] = true;
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        log("Script carregado com sucesso:", src);
        loadedScripts[src] = true;
        resolve(true);
      };
      script.onerror = (e) => {
        error("Falha ao carregar script:", src, e);
        reject(new Error("Falha ao carregar script: " + src));
      };
      document.body.appendChild(script);
    });
  }

  // chama a função starter se existir
  function chamarStarterIfExists(starterName) {
    if (!starterName) {
      error("Nenhum starter fornecido.");
      return false;
    }
    const fn = window[starterName];
    if (typeof fn === "function") {
      try {
        log("Chamando função starter:", starterName);
        fn(); // chama a função do jogo
        return true;
      } catch (err) {
        error("Erro ao executar starter:", starterName, err);
        return false;
      }
    } else {
      error(`Starter "${starterName}" não encontrado no escopo global (window).`);
      return false;
    }
  }

  // função pública que será chamada pelos botões no HTML
  window.carregarJogo = async function (historiaKey) {
    log("Solicitado carregar história:", historiaKey);

    const entry = HISTORY_MAP[historiaKey];
    if (!entry) {
      error("História não mapeada:", historiaKey);
      return;
    }

    // limpa o placeholder
    const container = limparGameContainer();
    if (!container) return;

    // opcional: mostra mensagem de carregamento
    container.innerHTML = "<p>Carregando jogo...</p>";

    try {
      await carregarScriptOnce(entry.src);

      // após carregar, tentar chamar a função starter
      const ok = chamarStarterIfExists(entry.starter);
      if (!ok) {
        // debug: listar funções globais parecidas (ajuda em erro de nome)
        const suggestions = Object.keys(window).filter(k => k.toLowerCase().includes(historiaKey));
        log("Sugestões de funções no window relacionadas:", suggestions);
        container.innerHTML = `<p>Erro: não foi possível iniciar a história (${historiaKey}). Veja console para detalhes.</p>`;
      }
    } catch (err) {
      error("Erro ao carregar história:", err);
      container.innerHTML = `<p>Erro ao carregar o jogo. Veja console para detalhes.</p>`;
    }
  };

  // debug: expor mapa (opcional)
  window.__HISTORY_MAP = HISTORY_MAP;

  log("historias.js pronto. Use carregarJogo('floresta') para iniciar.");
})();
