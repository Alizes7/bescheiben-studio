'use strict';

function renderSlideList() {
  const list = document.getElementById('slideList');
  list.innerHTML = '';
  slides.forEach(function (s, i) {
    const li = document.createElement('li');
    li.className = 'slide-item' + (i === currentSlide ? ' active' : '');
    li.setAttribute('data-slide-idx', i);
    li.setAttribute('tabindex', '0');
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', 'Slide ' + (i + 1) + ': ' + getSlideLabel(s));
    li.setAttribute('aria-pressed', String(i === currentSlide));

    // Indicador de tema
    const themeBadge = s.theme && s.theme !== 'dark' ? 
      '<span class="theme-indicator" style="background:' + getThemeColor(s.theme) + '"></span>' : '';

    li.innerHTML =
      '<div class="slide-item-header">' +
        '<div>' +
          '<div class="slide-num">SLIDE ' + String(i + 1).padStart(2, '0') + '</div>' +
          '<div class="slide-label">' + themeBadge + escHtml(getSlideLabel(s)) + '</div>' +
        '</div>' +
        '<div class="slide-actions">' +
          '<button class="icon-btn" type="button" data-action="move-up" aria-label="Mover para cima">↑</button>' +
          '<button class="icon-btn" type="button" data-action="move-down" aria-label="Mover para baixo">↓</button>' +
          '<button class="icon-btn del" type="button" data-action="delete" aria-label="Remover">×</button>' +
        '</div>' +
      '</div>';
    list.appendChild(li);
  });
  document.getElementById('navIndicator').textContent = (currentSlide + 1) + ' / ' + slides.length;
}

function getThemeColor(theme) {
  const colors = {
    'light': '#f8f9fa',
    'lavender': '#f3e8ff',
    'neon': '#000000',
    'corporate': '#1f2937',
    'gradient': '#312e81',
    'dark': '#0c0a1e'
  };
  return colors[theme] || '#0c0a1e';
}

function getSlideLabel(s) {
  switch (s.type) {
    case 'cover':   return (s.headline || 'Cover').slice(0, 30);
    case 'content': return (s.step || '') + ': ' + (s.headline || '').slice(0, 20);
    case 'quote':   return (s.author || s.quote || 'Insight').slice(0, 28) + '…';
    case 'cta':     return s.headline || 'CTA';
    default:        return 'Slide';
  }
}

function renderSlidePreview() {
  const el  = document.getElementById('slide-preview');
  const fmt = FORMAT[currentMode];
  el.style.width  = fmt.previewW + 'px';
  el.style.height = fmt.previewH + 'px';
  el.style.setProperty('--font-scale', String(fontScale));
  el.innerHTML = buildSlideHtml(slides[currentSlide], currentSlide, slides.length);
  const badge = document.getElementById('formatBadge');
  if (badge) badge.textContent = fmt.label;
  const fsd = document.getElementById('fontScaleDisplay');
  if (fsd) fsd.textContent = Math.round(fontScale * 100) + '%';
}

function renderEditor() {
  const s = slides[currentSlide];
  const container = document.getElementById('editorFields');
  const ICONS  = { cover: '🖼️', content: '📄', quote: '💬', cta: '🎯' };
  const LABELS = { cover: 'Cover', content: 'Conteúdo', quote: 'Insight', cta: 'CTA' };
  const THEMES = { 
    dark: 'Dark', light: 'Clean White', lavender: 'Lavender', 
    neon: 'Neon', corporate: 'Corporate', gradient: 'Gradient' 
  };

  const typeOpts = ['cover', 'content', 'quote', 'cta'].map(function (t) {
    return (
      '<div class="type-opt' + (s.type === t ? ' selected' : '') + '" ' +
        'data-type-opt="' + t + '" role="radio" ' +
        'aria-checked="' + (s.type === t) + '" ' +
        'tabindex="' + (s.type === t ? '0' : '-1') + '">' +
        '<span class="type-icon" aria-hidden="true">' + ICONS[t] + '</span>' + LABELS[t] +
      '</div>'
    );
  }).join('');

  // Seletor de tema
  let themeOpts = '<div class="theme-grid">';
  for (const [key, label] of Object.entries(THEMES)) {
    themeOpts += '<div class="theme-opt' + (s.theme === key ? ' selected' : '') + '" data-theme-opt="' + key + '">' +
      '<span class="theme-dot" style="background:' + getThemeColor(key) + '"></span>' +
      '<span class="theme-label">' + label + '</span>' +
    '</div>';
  }
  themeOpts += '</div>';

  let html =
    '<div class="editor-section">' +
      '<div class="field-label" id="type-label">Tipo de Slide</div>' +
      '<div class="type-grid" role="radiogroup" aria-labelledby="type-label">' + typeOpts + '</div>' +
    '</div>' +
    '<div class="editor-section">' +
      '<div class="field-label">Tema do Fundo</div>' +
      themeOpts +
    '</div>';

  // EDITOR AVANÇADO DE TEXTO (NOVO)
  html += 
    '<div class="editor-section word-size-editor">' +
      '<div class="field-label">🎨 Tamanho por Palavra (Avançado)</div>' +
      '<div class="word-size-help">Selecione texto e clique nos botões para aplicar tamanhos individuais:</div>' +
      '<div class="word-size-buttons">' +
        '<button type="button" class="word-size-btn" data-size="sm" title="Pequeno (0.85x)">A<span class="size-label">-</span></button>' +
        '<button type="button" class="word-size-btn" data-size="md" title="Médio (1.2x)">A</button>' +
        '<button type="button" class="word-size-btn active" data-size="normal" title="Normal (1x)">A<span class="size-label">+</span></button>' +
        '<button type="button" class="word-size-btn lg" data-size="lg" title="Grande (1.5x)">A<span class="size-label">++</span></button>' +
        '<button type="button" class="word-size-btn xl" data-size="xl" title="Gigante (1.9x)">A<span class="size-label">+++</span></button>' +
      '</div>' +
      '<div class="word-size-syntax">' +
        'Use: [size-md]palavra[/size] ou selecione e clique acima' +
      '</div>' +
    '</div>';

  if (s.type === 'cover') {
    html += fld('Tag da pílula', 'tag', s.tag, 'text');
    html += fld('Título principal', 'headline', s.headline, 'textarea', 'Use [size-lg]texto[/size] para destacar');
    html += fld('Palavra em destaque (cor)', 'headlineHighlight', s.headlineHighlight, 'text', 'roxo');
    html += fld('Subtítulo', 'sub', s.sub, 'textarea');
    html += tog('Mostrar texto de arraste', 'showCta', s.showCta);
    if (s.showCta) html += fld('Texto do swipe cue', 'cta', s.cta, 'text');
  } else if (s.type === 'content') {
    html += fld('Badge / Categoria', 'step', s.step, 'text', 'pílula + nº fantasma');
    html += fld('Título', 'headline', s.headline, 'textarea', 'Use [size-lg]texto[/size] para destacar');
    html += fld('Palavra em destaque (cor)', 'headlineHighlight', s.headlineHighlight, 'text', 'roxo');
    html += fld('Corpo do texto', 'body', s.body, 'textarea');
  } else if (s.type === 'quote') {
    html += fld('Tag da pílula', 'quoteTag', s.quoteTag, 'text', 'ex: DIAGNÓSTICO');
    html += fld('Texto acima da linha (pequeno)', 'quote', s.quote, 'textarea');
    html += fld('Frase principal (grande)', 'author', s.author, 'textarea', 'Use [size-xl]texto[/size] para gigante');
    html += fld('Palavra em destaque (cor)', 'quoteHighlight', s.quoteHighlight, 'text', 'roxo na frase principal');
  } else if (s.type === 'cta') {
    html += fld('Tag da pílula', 'eyebrow', s.eyebrow, 'text');
    html += fld('Título', 'headline', s.headline, 'textarea', 'Use [size-lg]texto[/size] para destacar');
    html += fld('Palavra em destaque (cor)', 'headlineHighlight', s.headlineHighlight, 'text', 'roxo');
    html += fld('Itens do checklist (1 por linha)', 'body', s.body, 'textarea', 'cada linha = ✓ item');
    html += fld('Texto do botão', 'cta', s.cta, 'text');
  }

  container.innerHTML = html;

  // Adicionar event listeners para os botões de tamanho
  container.querySelectorAll('.word-size-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const size = this.dataset.size;
      applyWordSizeToSelection(size);
    });
  });
}

// NOVA FUNÇÃO: Aplicar tamanho à seleção
function applyWordSizeToSelection(size) {
  const activeEl = document.activeElement;
  if (!activeEl || !activeEl.dataset.fieldKey) {
    alert('Clique em um campo de texto primeiro (título ou conteúdo)');
    return;
  }

  const start = activeEl.selectionStart;
  const end = activeEl.selectionEnd;
  const text = activeEl.value;

  if (start === end) {
    alert('Selecione uma palavra primeiro');
    return;
  }

  const selectedText = text.substring(start, end);
  const before = text.substring(0, start);
  const after = text.substring(end);

  const sizedText = size === 'normal' ? selectedText : '[size-' + size + ']' + selectedText + '[/size]';

  activeEl.value = before + sizedText + after;
  updateField(activeEl.dataset.fieldKey, activeEl.value);

  // Restaurar foco
  activeEl.focus();
  activeEl.setSelectionRange(start, start + sizedText.length);
}

function fld(label, key, val, type, hint) {
  const sv = escHtml(val || '');
  const sk = escHtml(key);
  const h  = hint ? '<span class="badge">' + escHtml(hint) + '</span>' : '';
  const inp = type === 'textarea'
    ? '<textarea data-field-key="' + sk + '">' + sv + '</textarea>'
    : '<input type="text" value="' + sv + '" data-field-key="' + sk + '" />';
  return '<div class="editor-section"><div class="field-label">' + escHtml(label) + h + '</div>' + inp + '</div>';
}

function tog(label, key, val) {
  return (
    '<div class="editor-section"><div class="toggle-row">' +
      '<span class="toggle-label">' + escHtml(label) + '</span>' +
      '<label class="toggle"><input type="checkbox" data-field-key="' + escHtml(key) + '"' + (val ? ' checked' : '') + ' />' +
      '<span class="toggle-slider"></span></label>' +
    '</div></div>'
  );
}

function updateField(key, val) {
  slides[currentSlide][key] = val;
  renderSlidePreview();
  renderSlideList();
}

function changeType(type) {
  slides[currentSlide].type = type;
  renderEditor();
  renderSlidePreview();
  renderSlideList();
}

// NOVA FUNÇÃO: Mudar tema
function changeTheme(theme) {
  slides[currentSlide].theme = theme;
  renderEditor();
  renderSlidePreview();
  renderSlideList();
}

function adjustFontScale(delta) {
  fontScale = Math.min(1.8, Math.max(0.6, Math.round((fontScale + delta) * 10) / 10));
  renderSlidePreview();
}

function resetFontScale() {
  fontScale = 1.0;
  renderSlidePreview();
}