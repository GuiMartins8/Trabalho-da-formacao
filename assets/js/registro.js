// registro.js

// Helper: retorna array de usuários do localStorage (ou [] se nada)
function getUsers() {
  return JSON.parse(localStorage.getItem('usuarios') || '[]');
}

// Helper: salva a lista de usuários no localStorage
function saveUsers(users) {
  localStorage.setItem('usuarios', JSON.stringify(users));
}

// Valida formato básico de e-mail (regex simples)
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('regNome').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const senha = document.getElementById('regPassword').value;
  const msg = document.getElementById('registerMessage');

  // Validação do nome
  if (nome.length < 2) {
    msg.style.color = 'crimson';
    msg.textContent = 'Digite um nome válido.';
    return;
  }

  // Validação do e-mail
  if (!isValidEmail(email)) {
    msg.style.color = 'crimson';
    msg.textContent = 'Informe um e-mail válido.';
    return;
  }

  // Validação da senha
  const regras = [
    { teste: senha.length >= 6, msg: 'A senha precisa ter pelo menos 6 caracteres.' },
    { teste: /[A-Z]/.test(senha), msg: 'A senha deve conter pelo menos uma letra maiúscula.' },
    { teste: /[0-9]/.test(senha), msg: 'A senha deve conter pelo menos um número.' },
    { teste: /[!@#$%^&*(),.?":{}|<>_\-+=/\\]/.test(senha), msg: 'A senha deve conter pelo menos um caractere especial.' }
  ];

  for (const regra of regras) {
    if (!regra.teste) {
      msg.style.color = 'crimson';
      msg.textContent = regra.msg;
      return;
    }
  }

  const users = getUsers();

  // Verifica se o email já existe
  const exists = users.some(u => u.email === email);
  if (exists) {
    msg.style.color = 'crimson';
    msg.textContent = 'Este e-mail já está cadastrado.';
    return;
  }

  // Criação do usuário completo
  const newUser = {
    id: Date.now(),
    nome,
    email,
    senha
  };

  users.push(newUser);
  saveUsers(users);

  msg.style.color = 'green';
  msg.textContent = 'Cadastro realizado com sucesso! Você pode entrar agora.';

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 700);
  e.target.reset();
});
