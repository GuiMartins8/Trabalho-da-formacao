// Script extracted from login.html
(function () {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const toggleBtn = document.getElementById('togglePassword');
  const rememberCheckbox = document.getElementById('remember');
  const emailHelp = document.getElementById('emailHelp');
  const passwordHelp = document.getElementById('passwordHelp');
  const formMessage = document.getElementById('formMessage');

  // Carregar email salvo (se existir)
  try {
    const saved = localStorage.getItem('hi_saved_email');
    if (saved) {
      emailInput.value = saved;
      rememberCheckbox.checked = true;
    }
  } catch (e) { /* localStorage pode estar desabilitado */ }

  // Toggle mostrar/ocultar senha
  toggleBtn.addEventListener('click', () => {
    const isPwd = passwordInput.type === 'password';
    passwordInput.type = isPwd ? 'text' : 'password';
    toggleBtn.textContent = isPwd ? 'Ocultar' : 'Mostrar';
  });

  // Função simples de validação
  function validate() {
    let ok = true;
    // reset messages
    emailHelp.textContent = '';
    passwordHelp.textContent = '';
    emailHelp.classList.add('hidden');
    passwordHelp.classList.add('hidden');
    formMessage.classList.add('hidden');

    // email
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      emailHelp.textContent = 'E-mail é obrigatório.';
      emailHelp.classList.remove('hidden');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailHelp.textContent = 'Formato de e-mail inválido.';
      emailHelp.classList.remove('hidden');
      ok = false;
    }

    // senha
    const pwdVal = passwordInput.value;
    if (!pwdVal) {
      passwordHelp.textContent = 'Senha é obrigatória.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    } else if (pwdVal.length < 6) {
      passwordHelp.textContent = 'A senha precisa ter ao menos 6 caracteres.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    }

    return ok;
  }

  // Mock de autenticação (substituir por chamada real ao backend)
  function mockAuth(email, password) {
    // lógica simples: qualquer combinação que contenha "user" passa; senão falha
    // substitua por fetch(...) para seu servidor real
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.toLowerCase().includes('user') || email.toLowerCase().includes('teste')) {
          resolve({ ok: true, name: 'Usuário' });
        } else {
          reject(new Error('Credenciais inválidas.'));
        }
      }, 700);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // mostrar estado de envio
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Entrando...';

    try {
      const res = await mockAuth(email, password);
      // salvar email se lembre-me marcado
      try {
        if (rememberCheckbox.checked) {
          localStorage.setItem('hi_saved_email', email);
        } else {
          localStorage.removeItem('hi_saved_email');
        }
      } catch (e) { /* ignore */ }

      // sucesso
      formMessage.textContent = `Bem-vindo(a), ${res.name}! Redirecionando...`;
      formMessage.className = 'mt-3 text-sm text-green-300';
      formMessage.classList.remove('hidden');

      // simular redirecionamento para página inicial do app
      setTimeout(() => {
        // aqui você faria: window.location.href = 'dashboard.html';
        formMessage.textContent = 'Redirecionamento simulado. (Substitua por window.location)';

        // reabilita botão
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 900);

    } catch (err) {
      formMessage.textContent = err.message || 'Erro ao entrar.';
      formMessage.className = 'mt-3 text-sm text-red-400';
      formMessage.classList.remove('hidden');

      // reabilita botão
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  // acessibilidade: Enter no campo senha dispara submit
  passwordInput.addEventListener('keyup', (ev) => {
    if (ev.key === 'Enter') form.dispatchEvent(new Event('submit', { cancelable: true }));
  });
})();
