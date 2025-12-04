// usuario.js

function getUsers() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('usuarios', JSON.stringify(users));
}

let userLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');

// Se não houver sessão, tenta recobrar pelo e-mail (caso a sessão esteja incompleta)
if (!userLogado) {
  // não logado -> redireciona para login
  window.location.href = "login.html";
}

// Garantir que temos um objeto completo: se faltar nome/id, busca no array e atualiza
(function ensureSessionComplete() {
  const users = getUsers();
  let updated = false;

  // acha por email primeiro
  const fromList = users.find(u => u.email === userLogado.email) || users.find(u => u.id === userLogado.id);
  if (fromList) {
    // preenche campos faltantes
    if (!userLogado.id && fromList.id) { userLogado.id = fromList.id; updated = true; }
    if (!userLogado.nome && fromList.nome) { userLogado.nome = fromList.nome; updated = true; }
    if (!userLogado.senha && fromList.senha) { userLogado.senha = fromList.senha; updated = true; }

    // Se a lista não tiver id/nome mas sessão tem, atualiza a lista também
    const idx = users.findIndex(u => u.email === userLogado.email || u.id === userLogado.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...userLogado };
      saveUsers(users);
      updated = true;
    }
  }

  if (updated) {
    localStorage.setItem('usuarioLogado', JSON.stringify(userLogado));
  }
})();

// Proteção extra: se ainda estiver sem nome, preenche com fallback
if (!userLogado.nome) {
  userLogado.nome = (userLogado.email ? userLogado.email.split('@')[0] : 'Usuário');
  localStorage.setItem('usuarioLogado', JSON.stringify(userLogado));
}

// Preenchendo header (se existir)
const headerEl = document.getElementById('headerUser');
if (headerEl) {
  headerEl.innerHTML = `<a href="usuario.html">Olá, ${userLogado.nome.split(" ")[0]}</a>`;
}

// Preenche inputs se existirem no DOM
const elNome = document.getElementById('userNome');
const elEmail = document.getElementById('userEmail');
const elSenha = document.getElementById('userSenha');
const msg = document.getElementById('msg');

if (elNome) elNome.value = userLogado.nome || '';
if (elEmail) elEmail.value = userLogado.email || '';
if (elSenha) elSenha.value = userLogado.senha || '';

// SALVAR ALTERAÇÕES
const btnSalvar = document.getElementById('salvarAlteracoes');
if (btnSalvar) {
  btnSalvar.addEventListener('click', () => {
    const novoNome = (elNome.value || '').trim();
    const novoEmail = (elEmail.value || '').trim().toLowerCase();
    const novaSenha = elSenha.value || '';

    if (novoNome.length < 2) {
      if (msg) { msg.style.color = 'crimson'; msg.textContent = 'O nome deve ser válido.'; }
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(novoEmail)) {
      if (msg) { msg.style.color = 'crimson'; msg.textContent = 'E-mail inválido.'; }
      return;
    }

    const users = getUsers();
    const index = users.findIndex(u => u.id === userLogado.id);

    if (users.some(u => u.email === novoEmail && u.id !== userLogado.id)) {
      if (msg) { msg.style.color = 'crimson'; msg.textContent = 'Esse e-mail já está sendo usado.'; }
      return;
    }

    // Atualiza array e sessão
    users[index] = { ...users[index], nome: novoNome, email: novoEmail, senha: novaSenha };
    saveUsers(users);
    userLogado = users[index];
    localStorage.setItem('usuarioLogado', JSON.stringify(userLogado));

    if (headerEl) headerEl.innerHTML = `<a href="usuario.html">Olá, ${userLogado.nome.split(" ")[0]}</a>`;

    if (msg) { msg.style.color = 'green'; msg.textContent = 'Alterações salvas com sucesso!'; }
  });
}

// EXCLUIR CONTA
const btnDeletar = document.getElementById('deletarConta');
if (btnDeletar) {
  btnDeletar.addEventListener('click', () => {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) return;

    let users = getUsers();
    users = users.filter(u => u.id !== userLogado.id);
    saveUsers(users);
    localStorage.removeItem('usuarioLogado');
    alert("Conta excluída!");
    window.location.href = "index.html";
  });
}
