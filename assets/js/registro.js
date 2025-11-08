// Script extracted from registro.html
(function(){
  const form = document.getElementById('registerForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const nameHelp = document.getElementById('nameHelp');
  const emailHelp = document.getElementById('emailHelp');
  const passwordHelp = document.getElementById('passwordHelp');
  const formMessage = document.getElementById('formMessage');
  const togglePassword = document.getElementById('togglePassword');

  // Mostrar / Ocultar Senha
  togglePassword.addEventListener('click', () => {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    togglePassword.textContent = isHidden ? 'Ocultar' : 'Mostrar';
  });

  // Validação
  function validate() {
    let ok = true;
    [nameHelp, emailHelp, passwordHelp, formMessage].forEach(el => el.classList.add('hidden'));

    if (!nameInput.value.trim()) {
      nameHelp.textContent = 'O nome é obrigatório.';
      nameHelp.classList.remove('hidden');
      ok = false;
    }

    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      emailHelp.textContent = 'O e-mail é obrigatório.';
      emailHelp.classList.remove('hidden');
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailHelp.textContent = 'Formato de e-mail inválido.';
      emailHelp.classList.remove('hidden');
      ok = false;
    }

    const pwdVal = passwordInput.value;
    if (!pwdVal) {
      passwordHelp.textContent = 'A senha é obrigatória.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    } else if (pwdVal.length < 6) {
      passwordHelp.textContent = 'A senha deve ter no mínimo 6 caracteres.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    } else if (!/[A-Z]/.test(pwdVal)) {
      passwordHelp.textContent = 'A senha deve conter pelo menos uma letra maiúscula.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    } else if (!/[a-z]/.test(pwdVal)) {
      passwordHelp.textContent = 'A senha deve conter pelo menos uma letra minúscula.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwdVal)) {
      passwordHelp.textContent = 'A senha deve conter pelo menos um caractere especial.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    } else if (!/\d/.test(pwdVal)) {
      passwordHelp.textContent = 'A senha deve conter pelo menos um número.';
      passwordHelp.classList.remove('hidden');
      ok = false;
    }
    return ok;
  }

  // Mock de registro
  function mockRegister(name, email) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email.includes('teste')) reject(new Error('E-mail já cadastrado.'));
        else resolve({ ok: true, user: name });
      }, 700);
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registrando...';

    try {
      const res = await mockRegister(nameInput.value, emailInput.value);
      formMessage.textContent = `Conta criada com sucesso! Bem-vindo(a), ${res.user}.`;
      formMessage.className = 'mt-3 text-sm text-green-300';
      formMessage.classList.remove('hidden');
      setTimeout(() => window.location.href = 'login.html', 1200);
    } catch (err) {
      formMessage.textContent = err.message || 'Erro ao registrar.';
      formMessage.className = 'mt-3 text-sm text-red-400';
      formMessage.classList.remove('hidden');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
})();
