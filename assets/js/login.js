// login.js

function getUsers() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const senha = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMessage');

  if (!email || !senha) {
    msg.style.color = 'crimson';
    msg.textContent = 'Preencha e-mail e senha.';
    return;
  }

  const users = getUsers();

  // encontra usuário por e-mail e senha
  const found = users.find(u => u.email === email && u.senha === senha);

  if (found) {
    msg.style.color = 'green';
    msg.textContent = 'Login bem-sucedido! Redirecionando...';

    // garante que o objeto de sessão tenha id, nome, email, senha
    const sessionUser = {
      id: found.id || Date.now(),
      nome: found.nome || (found.email ? found.email.split('@')[0] : 'Usuário'),
      email: found.email,
      senha: found.senha
    };

    // se o usuário original não tinha id/nome, atualiza no array e salva
    if (!found.id || !found.nome) {
      const idx = users.findIndex(u => u.email === found.email && u.senha === found.senha);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...sessionUser };
        localStorage.setItem('usuarios', JSON.stringify(users));
      }
    }

    localStorage.setItem('usuarioLogado', JSON.stringify(sessionUser));

    // Redireciona após breve delay
    setTimeout(() => {
      window.location.href = 'usuario.html';
    }, 700);
  } else {
    msg.style.color = 'crimson';
    msg.textContent = 'E-mail ou senha incorretos.';
  }
});
