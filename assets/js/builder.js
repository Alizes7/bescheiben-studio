'use strict';

// ── HELPERS ───────────────────────────────────────────

function escHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// NOVO: Parser para tamanhos individuais de palavras
// Suporta: [size-sm]texto[/size] [size-md] [size-lg] [size-xl]
function parseWordSizes(text) {
  if (!text) return '';
  let parsed = escHtml(text);

  // [size-sm] = small (0.85x)
  parsed = parsed.replace(/\[size-sm\](.*?)\[\/size\]/g, '<span class="word-size-sm">$1</span>');

  // [size-md] = medium (1.2x) 
  parsed = parsed.replace(/\[size-md\](.*?)\[\/size\]/g, '<span class="word-size-md">$1</span>');

  // [size-lg] = large (1.5x)
  parsed = parsed.replace(/\[size-lg\](.*?)\[\/size\]/g, '<span class="word-size-lg">$1</span>');

  // [size-xl] = extra large (1.9x)
  parsed = parsed.replace(/\[size-xl\](.*?)\[\/size\]/g, '<span class="word-size-xl">$1</span>');

  return parsed;
}

// Processar highlight + tamanhos
function processText(text, highlight) {
  // Primeiro aplicar tamanhos customizados
  let processed = parseWordSizes(text);

  // Depois aplicar highlight se existir
  if (highlight && text) {
    const safeHighlight = escHtml(highlight);
    processed = processed.replace(safeHighlight, '<em>' + safeHighlight + '</em>');
  }

  return processed;
}

function pad2(n) { return String(n).padStart(2, '0'); }

function slideCounter(idx, total) {
  return '<div class="dk-counter">' + pad2(idx + 1) + ' <span>/</span> ' + pad2(total) + '</div>';
}

function swipeCue(text) {
  return (
    '<div class="dk-swipe-cue">' +
      '<span class="dk-swipe-label">' + escHtml(text || 'DESLIZE PARA VER') + '</span>' +
      '<div class="dk-swipe-dots">' +
        '<span class="dk-dot dk-dot--active"></span>' +
        '<span class="dk-dot"></span>' +
        '<span class="dk-dot"></span>' +
        '<span class="dk-dot"></span>' +
      '</div>' +
    '</div>'
  );
}

function nextArrow() {
  return (
    '<div class="dk-next-arrow" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
        '<path d="M9 18l6-6-6-6"/>' +
      '</svg>' +
    '</div>'
  );
}

function brandBadge(dark) {
  return (
    '<div class="dk-brand ' + (dark ? 'dk-brand--on-dark' : 'dk-brand--on-light') + '">' +
      '<div class="dk-brand-dot" aria-hidden="true"></div>' +
      '<span class="dk-brand-name">BESCHEIBEN</span>' +
    '</div>'
  );
}

function igStrip(actions) {
  var items = (actions || ['💾 Salve', '💬 Comente', '👆 Siga']).map(function (a) {
    return '<div class="dk-ig-item">' + a + '</div>';
  }).join('');
  return '<div class="dk-ig-strip">' + items + '</div>';
}

// ── THEME DETECTOR ────────────────────────────────────
function getThemeClass(slide) {
  const theme = slide.theme || 'dark';
  return 'dk-theme-' + theme;
}

// ── MAIN BUILDER ──────────────────────────────────────

function buildSlideHtml(s, idx, total) {
  const themeClass = getThemeClass(s);

  switch (s.type) {
    case 'cover':   return buildCover(s, idx, total, themeClass);
    case 'content': return buildContent(s, idx, total, themeClass);
    case 'quote':   return buildQuote(s, idx, total, themeClass);
    case 'cta':     return buildCta(s, idx, total, themeClass);
    default:        return '<div class="slide-canvas dk-base ' + themeClass + '"></div>';
  }
}

// ── COVER ─────────────────────────────────────────────
function buildCover(s, idx, total, themeClass) {
  return (
    '<div class="slide-canvas dk-base dk-cover ' + themeClass + '">' +
      '<div class="dk-glow dk-glow--tr" aria-hidden="true"></div>' +
      '<div class="dk-glow dk-glow--bl" aria-hidden="true"></div>' +
      '<div class="dk-grid-lines" aria-hidden="true"></div>' +

      '<div class="dk-topbar">' +
        brandBadge(s.theme !== 'light') +
        slideCounter(idx, total) +
      '</div>' +

      '<div class="dk-cover-body">' +
        '<div class="dk-tag">' + escHtml(s.tag || 'BESCHEIBEN') + '</div>' +
        '<h1 class="dk-cover-headline">' + processText(s.headline, s.headlineHighlight) + '</h1>' +
        (s.sub ? '<p class="dk-cover-sub">' + escHtml(s.sub) + '</p>' : '') +
      '</div>' +

      '<div class="dk-cover-bottom">' +
        (s.showCta ? swipeCue(s.cta) : '') +
      '</div>' +

    '</div>'
  );
}

// ── CONTENT ───────────────────────────────────────────
function buildContent(s, idx, total, themeClass) {
  var gn = String(s.step || '').match(/\d+/);
  var ghost = gn ? gn[0].padStart(2, '0') : pad2(idx + 1);

  return (
    '<div class="slide-canvas dk-base dk-content ' + themeClass + '">' +
      '<div class="dk-ghost-num" aria-hidden="true">' + ghost + '</div>' +
      '<div class="dk-glow dk-glow--br" aria-hidden="true"></div>' +

      '<div class="dk-topbar">' +
        brandBadge(s.theme !== 'light') +
        slideCounter(idx, total) +
      '</div>' +

      '<div class="dk-content-body">' +
        '<div class="dk-step-row">' +
          '<div class="dk-step-badge">' + escHtml(s.step || 'CONTEÚDO') + '</div>' +
          '<div class="dk-step-line" aria-hidden="true"></div>' +
        '</div>' +
        '<h2 class="dk-content-headline">' + processText(s.headline, s.headlineHighlight) + '</h2>' +
        '<p class="dk-content-text">' + escHtml(s.body || '') + '</p>' +
      '</div>' +

      '<div class="dk-footer">' +
        '<div class="dk-footer-brand">@bescheiben</div>' +
        nextArrow() +
      '</div>' +

    '</div>'
  );
}

// ── QUOTE ─────────────────────────────────────────────
function buildQuote(s, idx, total, themeClass) {
  return (
    '<div class="slide-canvas dk-base dk-quote ' + themeClass + '">' +
      '<div class="dk-glow dk-glow--center" aria-hidden="true"></div>' +

      '<div class="dk-topbar">' +
        brandBadge(s.theme !== 'light') +
        slideCounter(idx, total) +
      '</div>' +

      '<div class="dk-quote-body">' +
        '<div class="dk-quote-tag">' + escHtml(s.quoteTag || 'INSIGHT') + '</div>' +
        (s.quote
          ? '<p class="dk-quote-pre">' + escHtml(s.quote) + '</p>' +
            '<div class="dk-quote-sep" aria-hidden="true"></div>'
          : '') +
        '<div class="dk-quote-main-wrap">' +
          '<div class="dk-quote-bar" aria-hidden="true"></div>' +
          '<h2 class="dk-quote-main">' + processText(s.author || '', s.quoteHighlight) + '</h2>' +
        '</div>' +
      '</div>' +

      '<div class="dk-footer">' +
        '<div class="dk-footer-brand">@bescheiben</div>' +
        nextArrow() +
      '</div>' +

    '</div>'
  );
}

// ── CTA ───────────────────────────────────────────────
function buildCta(s, idx, total, themeClass) {
  var lines = (s.body || '').split('\n').filter(Boolean);
  var checks = lines.map(function (l) {
    return (
      '<div class="dk-check-row">' +
        '<div class="dk-check-icon" aria-hidden="true">' +
          '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">' +
            '<polyline points="3 8 6.5 11.5 13 5"/>' +
          '</svg>' +
        '</div>' +
        '<span>' + escHtml(l) + '</span>' +
      '</div>'
    );
  }).join('');

  return (
    '<div class="slide-canvas dk-base dk-cta ' + themeClass + '">' +
      '<div class="dk-glow dk-glow--tr" aria-hidden="true"></div>' +
      '<div class="dk-glow dk-glow--bl-sm" aria-hidden="true"></div>' +

      '<div class="dk-topbar">' +
        brandBadge(s.theme !== 'light') +
        slideCounter(idx, total) +
      '</div>' +

      '<div class="dk-cta-body">' +
        '<div class="dk-cta-tag">' + escHtml(s.eyebrow || 'PRÓXIMO PASSO') + '</div>' +
        '<h2 class="dk-cta-headline">' + processText(s.headline, s.headlineHighlight) + '</h2>' +
        '<div class="dk-cta-btn">' +
          escHtml(s.cta || 'Falar com a Bescheiben') +
          '<svg class="dk-btn-arrow" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">' +
            '<path d="M4 10h12M11 5l5 5-5 5"/>' +
          '</svg>' +
        '</div>' +
        (checks ? '<div class="dk-checks">' + checks + '</div>' : '') +
      '</div>' +

      igStrip(['💾 Salve esse post', '💬 Comente CRESCER', '👆 Siga @bescheiben']) +

    '</div>'
  );
}