(() => {
  const body = document.body;
  const page = body.dataset.page;

  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.dataset.nav === page) link.classList.add('active');
  });

  const menuButton = document.querySelector('[data-menu]');
  const overlay = document.querySelector('.overlay');
  menuButton?.addEventListener('click', () => body.classList.toggle('nav-open'));
  overlay?.addEventListener('click', () => body.classList.remove('nav-open'));

  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  }

  document.querySelectorAll('[data-choice]').forEach((choice) => {
    choice.addEventListener('click', () => {
      document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('active'));
      choice.classList.add('active');
      const input = document.querySelector('#taskType');
      if (input) input.value = choice.dataset.choice;
    });
  });

  document.querySelectorAll('[data-demo-start]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const prompt = document.querySelector('#request');
      if (prompt && !prompt.value.trim()) {
        prompt.focus();
        showToast('조사 요청 내용을 입력하세요.');
        return;
      }
      showToast('정적 프로토타입입니다. 샘플 작업 상세로 이동합니다.');
      setTimeout(() => { window.location.href = 'session-detail.html'; }, 450);
    });
  });

  document.querySelectorAll('[data-decision]').forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.dataset.decision === 'approve' ? '승인' : '거부';
      const card = button.closest('[data-approval-card]');
      if (card) {
        card.querySelectorAll('button').forEach((item) => item.disabled = true);
        const state = card.querySelector('[data-approval-state]');
        if (state) {
          state.className = `status ${action === '승인' ? 'ok' : 'bad'}`;
          state.textContent = `${action}됨`;
        }
      }
      showToast(`샘플 승인 요청을 ${action}했습니다. 실제 작업은 실행되지 않습니다.`);
    });
  });

  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.addEventListener('click', async () => {
      const target = document.querySelector(button.dataset.copy);
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        showToast('CLI 예시를 복사했습니다.');
      } catch {
        showToast('브라우저에서 복사를 허용하지 않았습니다.');
      }
    });
  });
})();
