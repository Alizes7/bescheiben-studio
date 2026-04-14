'use strict';

const slides = [
  {
    type: 'cover',
    tag: 'BESCHEIBEN',
    headline: 'Toda empresa começa com uma ideia.',
    headlineHighlight: 'ideia.',
    sub: 'Crescer é uma outra história.',
    showCta: true,
    cta: 'Deslize para ver',
    brand: 'BESCHEIBEN',
  },
  {
    type: 'content',
    step: 'CONTEXTO',
    headline: 'Muitas empresas têm produtos incríveis.',
    headlineHighlight: 'incríveis.',
    body: 'O mercado simplesmente não sabe que elas existem.',
    brand: 'BESCHEIBEN',
  },
  {
    type: 'quote',
    quoteTag: 'DIAGNÓSTICO',
    quote: 'O problema nunca foi a qualidade do produto.',
    author: 'Foi a falta de posicionamento.',
    quoteHighlight: 'posicionamento.',
  },
  {
    type: 'cta',
    eyebrow: 'MISSÃO',
    headline: 'Transformar marketing em crescimento real.',
    headlineHighlight: 'crescimento real.',
    body: 'Diagnóstico gratuito
Sem compromisso
Resposta em 24h',
    cta: 'Agendar diagnóstico gratuito',
  },
];

let currentSlide = 0;
let currentMode  = 'carousel';
let fontScale    = 1.0;

const FORMAT = {
  carousel: {
    previewW: 400, previewH: 500,
    exportScale: 2.7,
    label: '1080 × 1350 · Carrossel 4:5',
    downloadSuffix: 'carousel',
  },
  story: {
    previewW: 281, previewH: 500,
    exportScale: 3.84,
    label: '1080 × 1920 · Story 9:16',
    downloadSuffix: 'story',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATES — 12 total: 6 originais (dark) + 6 novos (variações roxo/branco)
// ─────────────────────────────────────────────────────────────────────────────
const TEMPLATES = [

  // === 6 TEMPLATES ORIGINAIS (fundo dark roxo) ===

  // 1 ── ORIGINAL: Educativo
  {
    name: 'Educativo',
    icon: '📚',
    desc: '5 erros · autoridade · hook forte',
    color: '#7c5cfc',
    slides: [
      {
        type: 'cover',
        tag: 'ESTRATÉGIA DIGITAL',
        headline: '5 erros que estão destruindo sua presença digital.',
        headlineHighlight: 'destruindo',
        sub: 'Se você comete qualquer um deles, está perdendo clientes todos os dias.',
        showCta: true, cta: 'Deslize e descubra', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ERRO 01',
        headline: 'Postar sem estratégia',
        headlineHighlight: 'sem estratégia',
        body: 'Conteúdo sem planejamento editorial não gera resultado. Cada post precisa de objetivo, público e CTA definidos antes de ser criado.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ERRO 02',
        headline: 'Ignorar os dados',
        headlineHighlight: 'os dados',
        body: 'Métricas de vaidade não pagam boletos. Acompanhe alcance, cliques e conversões reais para saber o que está funcionando.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ERRO 03',
        headline: 'Identidade visual inconsistente',
        headlineHighlight: 'inconsistente',
        body: 'Sua marca precisa ser reconhecida em 2 segundos. Cor, fonte e tom de voz desalinhados fazem você parecer amador — mesmo tendo serviço premium.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'REFLEXÃO',
        quote: 'Marca forte não é sobre parecer bonito.',
        author: 'É sobre ser lembrado na hora certa.',
        quoteHighlight: 'lembrado na hora certa.',
      },
      {
        type: 'cta', eyebrow: 'CHEGA DE ERRAR',
        headline: 'A gente corrige isso por você.',
        headlineHighlight: 'corrige isso',
        body: 'Auditoria gratuita
Sem compromisso
Resposta em 24h',
        cta: 'Quero minha auditoria',
      },
    ],
  },

  // 2 ── ORIGINAL: Provocativo
  {
    name: 'Provocativo',
    icon: '🔥',
    desc: 'Dor real · urgência · transformação',
    color: '#ff5566',
    slides: [
      {
        type: 'cover',
        tag: 'REALIDADE',
        headline: 'Seu concorrente está crescendo. E você?',
        headlineHighlight: 'E você?',
        sub: 'Enquanto você espera o momento certo, outros estão capturando os seus clientes.',
        showCta: true, cta: 'Veja o que está acontecendo', brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'CONTEXTO',
        quote: 'Muitas empresas têm produtos incríveis.',
        author: 'O mercado simplesmente não sabe que elas existem.',
        quoteHighlight: 'não sabe que elas existem.',
      },
      {
        type: 'quote', quoteTag: 'DIAGNÓSTICO',
        quote: 'O problema nunca foi a qualidade do produto.',
        author: 'Foi a falta de posicionamento.',
        quoteHighlight: 'posicionamento.',
      },
      {
        type: 'content', step: 'A SOLUÇÃO',
        headline: 'Estratégia, design e execução.',
        headlineHighlight: 'execução.',
        body: 'Não é sobre estar em todo lugar. É sobre estar no lugar certo, com a mensagem certa, para o cliente certo.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'O MOMENTO É AGORA',
        headline: 'Pare de perder espaço no mercado.',
        headlineHighlight: 'perder espaço',
        body: 'Diagnóstico gratuito
Sem compromisso
Resposta em 24h',
        cta: 'Quero sair na frente',
      },
    ],
  },

  // 3 ── ORIGINAL: Serviços
  {
    name: 'Serviços',
    icon: '⚙️',
    desc: 'O que fazemos · método · CTA',
    color: '#c4f542',
    slides: [
      {
        type: 'cover',
        tag: 'SERVIÇOS',
        headline: 'O que fazemos por você.',
        headlineHighlight: 'você.',
        sub: 'Construímos sistemas completos de crescimento digital para empresas que querem resultados consistentes.',
        showCta: true, cta: 'Deslize para ver', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'SERVIÇO 01',
        headline: 'A marca que as pessoas lembram.',
        headlineHighlight: 'lembram.',
        body: 'Definimos o posicionamento estratégico da sua marca para que ela gere autoridade, desperte confiança e seja a escolha natural.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'SERVIÇO 02',
        headline: 'Conteúdo que atrai o cliente certo.',
        headlineHighlight: 'cliente certo.',
        body: 'Cada publicação constrói percepção de valor. Copy que converte. Design consistente. SEO que gera tráfego qualificado.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'SERVIÇO 03',
        headline: 'Leads que viram clientes.',
        headlineHighlight: 'clientes.',
        body: 'Criamos sistemas de tráfego e funis de conversão que geram oportunidades de negócio com consistência — não campanhas avulsas.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'O SISTEMA COMPLETO',
        headline: 'Tudo conectado. Tudo funcionando.',
        headlineHighlight: 'funcionando.',
        body: 'Diagnóstico gratuito
Sem compromisso
Resposta em 24h',
        cta: 'Quero conhecer a Bescheiben',
      },
    ],
  },

  // 4 ── ORIGINAL: Lista Rápida
  {
    name: 'Lista Rápida',
    icon: '⚡',
    desc: 'Hook de lista · retenção · saves',
    color: '#a688fd',
    slides: [
      {
        type: 'cover',
        tag: 'MARKETING B2B',
        headline: '3 perguntas que todo dono de negócio precisa responder.',
        headlineHighlight: 'responder.',
        sub: 'Se você não sabe as respostas, está operando no escuro.',
        showCta: true, cta: 'Salve esse post', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 01',
        headline: 'Quem é o seu cliente dos sonhos?',
        headlineHighlight: 'sonhos?',
        body: 'Não "empresas do setor X". Uma pessoa real, com cargo, dor específica e orçamento definido. Sem isso, sua comunicação atinge todo mundo e não converte ninguém.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 02',
        headline: 'Por que alguém te escolhe e não o concorrente?',
        headlineHighlight: 'te escolhe',
        body: '"Qualidade e atendimento" não é diferencial — é o mínimo. Seu diferencial real precisa ser claro em 1 frase e visível em todo ponto de contato.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 03',
        headline: 'Qual é o próximo passo que você quer que ele dê?',
        headlineHighlight: 'próximo passo',
        body: 'Todo post, todo e-mail, toda conversa precisa de um CTA claro. Se você não conduz, o cliente some. É simples assim.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'CONCLUSÃO',
        quote: 'Clareza não é opcional no marketing B2B.',
        author: 'É o produto em si.',
        quoteHighlight: 'produto em si.',
      },
      {
        type: 'cta', eyebrow: 'PRÓXIMO PASSO',
        headline: 'Respondeu as 3? Hora de agir.',
        headlineHighlight: 'agir.',
        body: 'Diagnóstico gratuito
Análise do seu posicionamento
Plano de ação em 24h',
        cta: 'Quero meu diagnóstico',
      },
    ],
  },

  // 5 ── ORIGINAL: Antes/Depois
  {
    name: 'Antes/Depois',
    icon: '🔄',
    desc: 'Transformação · resultado · prova',
    color: '#22d3ee',
    slides: [
      {
        type: 'cover',
        tag: 'TRANSFORMAÇÃO',
        headline: 'Como uma empresa saiu do invisible para referência no digital.',
        headlineHighlight: 'invisible para referência',
        sub: 'Em 90 dias. Com método. Sem milagre.',
        showCta: true, cta: 'Ver o processo completo', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ANTES',
        headline: 'Presença digital sem resultado.',
        headlineHighlight: 'sem resultado.',
        body: 'Perfil ativo, conteúdo saindo, mas zero leads. Seguidores aumentando, faturamento estagnado. Som familiar?',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'DIAGNÓSTICO',
        headline: 'O problema estava no posicionamento.',
        headlineHighlight: 'posicionamento.',
        body: 'Não na frequência de posts. Não no design. O conteúdo certo para o público errado — ou o público certo com a mensagem errada.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PROCESSO',
        headline: 'Reposicionamento em 3 fases.',
        headlineHighlight: '3 fases.',
        body: 'Diagnóstico de marca → Estratégia de conteúdo → Execução com métricas. Cada fase conectada. Cada ação mensurável.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'RESULTADO',
        quote: '90 dias depois do reposicionamento:',
        author: 'Primeiro contrato B2B fechado pelo Instagram.',
        quoteHighlight: 'fechado pelo Instagram.',
      },
      {
        type: 'cta', eyebrow: 'ESSA PODE SER SUA HISTÓRIA',
        headline: 'Quer esse resultado?',
        headlineHighlight: 'resultado?',
        body: 'Diagnóstico gratuito
Sem compromisso
Iniciamos em 7 dias',
        cta: 'Quero começar agora',
      },
    ],
  },

  // 6 ── ORIGINAL: Autoridade
  {
    name: 'Autoridade',
    icon: '🏆',
    desc: 'Expertise · confiança · liderança',
    color: '#f59e0b',
    slides: [
      {
        type: 'cover',
        tag: 'POSICIONAMENTO',
        headline: 'A diferença entre ser encontrado e ser escolhido.',
        headlineHighlight: 'ser escolhido.',
        sub: 'Empresas que dominam o digital não postam mais. Postam melhor.',
        showCta: true, cta: 'Descubra como', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'REALIDADE 01',
        headline: 'Visibilidade sem autoridade não converte.',
        headlineHighlight: 'não converte.',
        body: 'Você pode ter mil seguidores novos por mês e continuar sem fechar contratos. O problema não é alcance — é autoridade percebida.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'REALIDADE 02',
        headline: 'Autoridade se constrói com consistência.',
        headlineHighlight: 'consistência.',
        body: 'Não com um viral. Um posicionamento claro, reforçado semana a semana, cria o ativo mais valioso do digital: confiança antes do primeiro contato.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'PRINCÍPIO',
        quote: 'Quando o cliente pensa no seu nicho,',
        author: 'ele precisa pensar em você primeiro.',
        quoteHighlight: 'pensar em você primeiro.',
      },
      {
        type: 'content', step: 'O CAMINHO',
        headline: 'Posicionamento → Conteúdo → Conversão.',
        headlineHighlight: 'Conversão.',
        body: 'Esse é o sistema. Funciona para agências, consultorias, escritórios e qualquer negócio B2B que quer crescer com previsibilidade.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'CONSTRUA SUA AUTORIDADE',
        headline: 'Comece pelo diagnóstico.',
        headlineHighlight: 'diagnóstico.',
        body: 'Diagnóstico gratuito
Plano personalizado
Iniciamos em 7 dias',
        cta: 'Agendar agora',
      },
    ],
  },

  // === 6 NOVOS TEMPLATES COM FUNDOS VARIADOS ===

  // 7 ── FUNDO BRANCO / Roxo escuro como cor primária
  {
    name: 'Clean White',
    icon: '⬜',
    desc: 'Fundo claro · elegância · contraste invertido',
    color: '#f8f9fa',
    slides: [
      {
        type: 'cover',
        tag: 'ELEGÂNCIA',
        headline: 'Menos é mais.',
        headlineHighlight: 'mais.',
        sub: 'Design que respira e converte.',
        showCta: true, cta: 'Deslize', brand: 'BESCHEIBEN',
        theme: 'light'
      },
      {
        type: 'content', step: '01',
        headline: 'Clareza antes de tudo.',
        headlineHighlight: 'tudo.',
        body: 'Em um mundo de excesso de informação, o minimalismo chama atenção justamente pelo que elimina.',
        brand: 'BESCHEIBEN',
        theme: 'light'
      },
      {
        type: 'quote', quoteTag: 'FILOSOFIA',
        quote: 'Perfeição é atingida,',
        author: 'não quando não há mais o que adicionar, mas quando não há mais o que remover.',
        quoteHighlight: 'o que remover.',
        theme: 'light'
      },
      {
        type: 'cta', eyebrow: 'COMECE SIMPLES',
        headline: 'Vamos limpar sua comunicação?',
        headlineHighlight: 'limpar',
        body: 'Diagnóstico visual
Sem custo',
        cta: 'Quero minimalismo',
        theme: 'light'
      },
    ],
  },

  // 8 ── FUNDO ROXO CLARO / Lavanda
  {
    name: 'Lavender',
    icon: '💜',
    desc: 'Roxo pastel · suave · diferenciado',
    color: '#e9d5ff',
    slides: [
      {
        type: 'cover',
        tag: 'SOFT',
        headline: 'Marketing com alma.',
        headlineHighlight: 'alma.',
        sub: 'Conexões reais geram resultados reais.',
        showCta: true, cta: 'Siga', brand: 'BESCHEIBEN',
        theme: 'lavender'
      },
      {
        type: 'content', step: 'ESSÊNCIA',
        headline: 'Pessoas compram de pessoas.',
        headlineHighlight: 'pessoas.',
        body: 'Não importa se é B2B ou B2C. No final, são sempre pessoas tomando decisões emocionais e justificando com lógica.',
        brand: 'BESCHEIBEN',
        theme: 'lavender'
      },
      {
        type: 'quote', quoteTag: 'VERDADE',
        quote: 'Não venda para empresas.',
        author: 'Venda para as pessoas dentro delas.',
        quoteHighlight: 'pessoas dentro delas.',
        theme: 'lavender'
      },
      {
        type: 'cta', eyebrow: 'HUMANIZE',
        headline: 'Sua marca merece personalidade.',
        headlineHighlight: 'personalidade.',
        body: 'Descubra sua voz
Autenticidade vende',
        cta: 'Humanizar marca',
        theme: 'lavender'
      },
    ],
  },

  // 9 ── FUNDO PRETO PURO / Neon Roxo
  {
    name: 'Neon Dark',
    icon: '⚡',
    desc: 'Preto puro · neon · alta energia',
    color: '#000000',
    slides: [
      {
        type: 'cover',
        tag: 'ALTA VOLTAGEM',
        headline: 'Disrupt ou morra.',
        headlineHighlight: 'morra.',
        sub: 'O mercado não espera por ninguém.',
        showCta: true, cta: 'Entre', brand: 'BESCHEIBEN',
        theme: 'neon'
      },
      {
        type: 'content', step: 'CHOQUE',
        headline: 'O óbvio não funciona mais.',
        headlineHighlight: 'não funciona mais.',
        body: 'O que todo mundo faz já saturou. Para se destacar, você precisa quebrar padrões — com estratégia.',
        brand: 'BESCHEIBEN',
        theme: 'neon'
      },
      {
        type: 'quote', quoteTag: 'LEI',
        quote: 'Quem não inova,',
        author: 'fica para trás. Rápido.',
        quoteHighlight: 'fica para trás.',
        theme: 'neon'
      },
      {
        type: 'cta', eyebrow: 'REINVENTE',
        headline: 'Chegou sua hora de brilhar.',
        headlineHighlight: 'brilhar.',
        body: 'Estratégia disruptiva
Resultados explosivos',
        cta: 'Quero inovar',
        theme: 'neon'
      },
    ],
  },

  // 10 ── FUNDO CINZA ESCURO / Corporate
  {
    name: 'Corporate',
    icon: '🏢',
    desc: 'Cinza · sério · institucional B2B',
    color: '#374151',
    slides: [
      {
        type: 'cover',
        tag: 'B2B',
        headline: 'Resultados mensuráveis.',
        headlineHighlight: 'mensuráveis.',
        sub: 'Sem achismos. Apenas dados e crescimento.',
        showCta: true, cta: 'Analise', brand: 'BESCHEIBEN',
        theme: 'corporate'
      },
      {
        type: 'content', step: 'ROI',
        headline: 'Cada real investido precisa retornar.',
        headlineHighlight: 'retornar.',
        body: 'Marketing não é gasto — é investimento. E como todo investimento, precisa de retorno claro e mensurável.',
        brand: 'BESCHEIBEN',
        theme: 'corporate'
      },
      {
        type: 'quote', quoteTag: 'MÉTRICA',
        quote: 'Se não dá para medir,',
        author: 'não dá para melhorar.',
        quoteHighlight: 'não dá para melhorar.',
        theme: 'corporate'
      },
      {
        type: 'cta', eyebrow: 'DADOS',
        headline: 'Vamos aos números reais.',
        headlineHighlight: 'números reais.',
        body: 'Auditoria de métricas
Relatório completo',
        cta: 'Quero dados',
        theme: 'corporate'
      },
    ],
  },

  // 11 ── FUNDO ROXO DEGRADÊ / Gradiente
  {
    name: 'Gradient',
    icon: '🌅',
    desc: 'Degradê roxo · moderno · fluido',
    color: '#7c3aed',
    slides: [
      {
        type: 'cover',
        tag: 'FLUXO',
        headline: 'Evolução constante.',
        headlineHighlight: 'constante.',
        sub: 'Marcas que se movem conquistam.',
        showCta: true, cta: 'Flua', brand: 'BESCHEIBEN',
        theme: 'gradient'
      },
      {
        type: 'content', step: 'MOVIMENTO',
        headline: 'Estagnação é regressão.',
        headlineHighlight: 'regressão.',
        body: 'O mercado muda todos os dias. Quem para para pensar demais, fica para trás. Ação gera clareza.',
        brand: 'BESCHEIBEN',
        theme: 'gradient'
      },
      {
        type: 'quote', quoteTag: 'DINÂMICA',
        quote: 'Não espere estar pronto.',
        author: 'Comece e ajuste no caminho.',
        quoteHighlight: 'ajuste no caminho.',
        theme: 'gradient'
      },
      {
        type: 'cta', eyebrow: 'EVOLUA',
        headline: 'O próximo nível espera por você.',
        headlineHighlight: 'próximo nível',
        body: 'Mentoria estratégica
Acompanhamento mensal',
        cta: 'Subir de nível',
        theme: 'gradient'
      },
    ],
  },

  // 12 ── FUNDO BRANCO + ROXO / Duotone
  {
    name: 'Duotone',
    icon: '🔲',
    desc: 'Branco e roxo · alternância · dinâmico',
    color: '#ffffff',
    slides: [
      {
        type: 'cover',
        tag: 'DUALIDADE',
        headline: 'Estratégia e criatividade.',
        headlineHighlight: 'criatividade.',
        sub: 'A combinação que gera resultados extraordinários.',
        showCta: true, cta: 'Comece', brand: 'BESCHEIBEN',
        theme: 'light'
      },
      {
        type: 'content', step: 'BALANCE',
        headline: 'Dados sem criatividade são inúteis.',
        headlineHighlight: 'inúteis.',
        body: 'E criatividade sem estratégia é arte. Para vender, você precisa dos dois lados trabalhando juntos.',
        brand: 'BESCHEIBEN',
        theme: 'dark'
      },
      {
        type: 'quote', quoteTag: 'SINERGIA',
        quote: 'O melhor dos dois mundos',
        author: 'cria o impossível.',
        quoteHighlight: 'o impossível.',
        theme: 'light'
      },
      {
        type: 'cta', eyebrow: 'UNIDADE',
        headline: 'Junte-se aos melhores.',
        headlineHighlight: 'melhores.',
        body: 'Time estrategista
Time criativo',
        cta: 'Quero os dois',
        theme: 'dark'
      },
    ],
  },
];

function loadTemplate(idx) {
  var tpl = TEMPLATES[idx];
  if (!tpl) return;
  slides.length = 0;
  tpl.slides.forEach(function (s) { slides.push(Object.assign({}, s)); });
  currentSlide = 0;
  renderSlideList();
  renderSlidePreview();
  renderEditor();
  var modal = document.getElementById('templateModal');
  if (modal) modal.classList.remove('open');
}