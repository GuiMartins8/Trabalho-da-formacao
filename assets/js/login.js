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

  // Procura usuário exato por e-mail e senha
  const found = users.find(u => u.email === email && u.senha === senha);

  if (found) {
    msg.style.color = 'green';
    msg.textContent = 'Login bem-sucedido! Redirecionando...';

    // Marca sessão simples no localStorage
    localStorage.setItem('usuarioLogado', JSON.stringify({ email: found.email, loggedAt: Date.now() }));

    // Redireciona após breve delay (para o usuário ver a mensagem)
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 700);
  } else {
    msg.style.color = 'crimson';
    msg.textContent = 'E-mail ou senha incorretos.';
  }
});
