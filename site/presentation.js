(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const slides = window.SLIDES;
  const deck = $('#deck');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const dialogs = [...document.querySelectorAll('dialog')];
  let current = -1;
  let touchStart = null;

  slides.forEach((slide, index) => {
    const element = document.createElement('section');
    element.className = `slide ${slide.className || ''}`;
    element.hidden = true;
    element.id = `slide-${index + 1}`;
    element.setAttribute('role', 'group');
    element.setAttribute('aria-roledescription', 'slide');
    element.setAttribute('aria-label', `${index + 1} de ${slides.length}: ${slide.title}`);
    const customTitle = ['cover', 'section-slide', 'closing'].includes(slide.className);
    element.innerHTML = `<div class="slide-meta"><span>${slide.section}</span><span>SBPO · Setembro de 2026</span></div>
      ${customTitle ? '' : `<h2>${slide.title}</h2>`}
      <div class="slide-body">${slide.content}</div>
      <div class="slide-footer"><span>Junio Cesar Ferreira · ICMC / USP</span><span>${String(index + 1).padStart(2, '0')} / ${slides.length}</span></div>`;
    deck.append(element);

    const button = document.createElement('button');
    button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span>${slide.title}`;
    button.addEventListener('click', () => {
      goTo(index);
      $('#overview-dialog').close();
    });
    $('#overview-list').append(button);
  });

  if (typeof window.renderMathInElement === 'function') {
    window.renderMathInElement(deck, {
      delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }],
      throwOnError: true,
      trust: false
    });
  } else {
    $('#status').textContent = 'O renderizador de equações não carregou. Gere o site com npm run build.';
  }

  const elements = [...deck.children];
  const overviewButtons = [...$('#overview-list').children];

  function resetMedia(element) {
    const img = element?.querySelector('[data-gif]');
    if (!img) return;
    img.src = img.dataset.gif.replace('.gif', '-poster.png');
    img.dataset.playing = 'false';
    element.querySelector('canvas').hidden = true;
    updateMediaButton(element, false);
  }

  function updateMediaButton(element, playing) {
    const button = element.querySelector('[data-media-toggle]');
    button.textContent = playing ? 'Pausar' : 'Reproduzir';
    button.setAttribute('aria-label', playing ? 'Pausar animação' : 'Reproduzir animação desde o início');
    button.setAttribute('aria-pressed', String(playing));
  }

  function playMedia(element) {
    const img = element.querySelector('[data-gif]');
    if (!img) return;
    // A fresh image element restarts animated GIFs without cache-busting network requests.
    const fresh = img.cloneNode();
    fresh.dataset.playing = 'true';
    fresh.src = img.dataset.gif;
    img.replaceWith(fresh);
    element.querySelector('canvas').hidden = true;
    updateMediaButton(element, true);
  }

  function pauseMedia(element) {
    const img = element.querySelector('[data-gif]');
    if (!img || img.dataset.playing !== 'true') return;
    const canvas = element.querySelector('canvas');
    if (img.complete && img.naturalWidth) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext('2d').drawImage(img, 0, 0);
      canvas.hidden = false;
    }
    img.src = img.dataset.gif.replace('.gif', '-poster.png');
    img.dataset.playing = 'false';
    updateMediaButton(element, false);
  }

  deck.addEventListener('click', (event) => {
    const element = elements[current];
    if (event.target.closest('[data-media-restart]')) playMedia(element);
    if (event.target.closest('[data-media-toggle]')) {
      const img = element.querySelector('[data-gif]');
      if (img.dataset.playing === 'true') pauseMedia(element);
      else playMedia(element);
    }
  });

  function display(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    if (next === current) return;
    if (current >= 0) {
      resetMedia(elements[current]);
      elements[current].hidden = true;
      overviewButtons[current].removeAttribute('aria-current');
    }
    current = next;
    elements[current].hidden = false;
    overviewButtons[current].setAttribute('aria-current', 'page');
    $('#counter').textContent = `${current + 1} / ${slides.length}`;
    $('#section-label').textContent = slides[current].section;
    $('#previous-button').disabled = current === 0;
    $('#next-button').disabled = current === slides.length - 1;
    $('#progress').setAttribute('aria-valuemax', slides.length);
    $('#progress').setAttribute('aria-valuenow', current + 1);
    $('#progress span').style.width = `${((current + 1) / slides.length) * 100}%`;
    document.title = `${slides[current].title} · SBPO 2026`;
    resetMedia(elements[current]);
    if (!reducedMotion.matches) playMedia(elements[current]);
  }

  function goTo(index) {
    const next = Math.max(0, Math.min(slides.length - 1, index));
    const hash = `#/${next + 1}`;
    if (location.hash !== hash) location.hash = hash;
    display(next);
  }

  function readHash() {
    const match = location.hash.match(/^#\/(\d+)$/);
    const index = match ? Math.max(0, Math.min(slides.length - 1, Number(match[1]) - 1)) : 0;
    if (location.hash !== `#/${index + 1}`) history.replaceState(null, '', `#/${index + 1}`);
    display(index);
  }

  function resize() {
    const stage = $('#stage');
    const gutter = window.innerWidth < 800 ? 12 : 40;
    const scale = Math.max(.1, Math.min((stage.clientWidth - gutter) / 1280, (stage.clientHeight - gutter) / 720));
    deck.style.setProperty('--scale', scale);
  }

  function openDialog(id) {
    dialogs.forEach((dialog) => { if (dialog.open) dialog.close(); });
    $(id).showModal();
    if (id === '#overview-dialog') overviewButtons[current].scrollIntoView({ block: 'nearest' });
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else {
        $('#status').textContent = 'Tela cheia não está disponível neste navegador.';
        $('#fullscreen-button').textContent = 'Indisponível';
      }
    } catch {
      $('#status').textContent = 'Não foi possível ativar tela cheia. Use a opção de tela cheia do navegador.';
    }
  }

  $('#previous-button').addEventListener('click', () => goTo(current - 1));
  $('.skip-link').addEventListener('click', (event) => { event.preventDefault(); $('#stage').focus(); });
  $('#next-button').addEventListener('click', () => goTo(current + 1));
  $('#overview-button').addEventListener('click', () => openDialog('#overview-dialog'));
  $('#fullscreen-button').addEventListener('click', toggleFullscreen);
  $('#print-button').addEventListener('click', () => { $('#help-dialog').close(); window.print(); });
  dialogs.forEach((dialog) => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey || dialogs.some((dialog) => dialog.open)) return;
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key === ' ' && event.target.closest('button, a')) return;
    const key = event.key.toLowerCase();
    const actions = {
      arrowright: () => goTo(current + 1), arrowdown: () => goTo(current + 1), pagedown: () => goTo(current + 1),
      ' ': () => goTo(current + (event.shiftKey ? -1 : 1)),
      arrowleft: () => goTo(current - 1), arrowup: () => goTo(current - 1), pageup: () => goTo(current - 1),
      home: () => goTo(0), end: () => goTo(slides.length - 1),
      f: toggleFullscreen, o: () => openDialog('#overview-dialog'),
      '?': () => openDialog('#help-dialog')
    };
    if (actions[key]) { event.preventDefault(); actions[key](); }
  });

  $('#stage').addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1 && !event.target.closest('button, a')
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  $('#stage').addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  $('#stage').addEventListener('touchcancel', () => { touchStart = null; });
  window.addEventListener('hashchange', readHash);
  document.addEventListener('fullscreenchange', () => {
    document.body.classList.toggle('presentation-fullscreen', Boolean(document.fullscreenElement));
    $('#fullscreen-button').setAttribute('aria-pressed', String(Boolean(document.fullscreenElement)));
    resize();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseMedia(elements[current]);
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) pauseMedia(elements[current]);
  });
  window.addEventListener('beforeprint', () => pauseMedia(elements[current]));
  new ResizeObserver(resize).observe($('#stage'));
  readHash();
  resize();
})();
