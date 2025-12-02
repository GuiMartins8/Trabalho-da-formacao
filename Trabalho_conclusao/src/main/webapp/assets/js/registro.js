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

// Tratamento do submit do formulário de registro
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const senha = document.getElementById('regPassword').value;

  const msg = document.getElementById('registerMessage');

  // Validações básicas
  if (!isValidEmail(email)) {
    msg.style.color = 'crimson';
    msg.textContent = 'Informe um e-mail válido.';
    return;
  }
  
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

    msg.style.color = 'green';
    msg.textContent = 'Senha válida!';



  const users = getUsers();

  // Verifica se o email já existe
  const exists = users.some(u => u.email === email);
  if (exists) {
    msg.style.color = 'crimson';
    msg.textContent = 'Este e-mail já está cadastrado.';
    return;
  }

  // Adiciona novo usuário (ATENÇÃO: senha está em texto claro — ok só para protótipo)
  users.push({ email, senha });
  saveUsers(users);

  msg.style.color = 'green';
  msg.textContent = 'Cadastro realizado com sucesso! Você pode entrar agora.';
  // limpa form
  e.target.reset();
});
