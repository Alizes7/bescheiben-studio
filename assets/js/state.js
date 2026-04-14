'use strict';

const slides = [
  {
    type: 'cover',
    tag: 'BESCHEIBEN',
    headline: 'Toda empresa começa com uma **ideia**.',
    headlineHighlight: 'ideia.',
    sub: 'Crescer é uma outra história.',
    showCta: true,
    cta: 'Deslize para ver',
    brand: 'BESCHEIBEN',
  },
  {
    type: 'content',
    step: 'CONTEXTO',
    headline: 'Muitas empresas têm produtos *incríveis*.',
    headlineHighlight: 'incríveis.',
    body: 'O mercado simplesmente não sabe que elas existem.',
    brand: 'BESCHEIBEN',
  },
  {
    type: 'quote',
    quoteTag: 'DIAGNÓSTICO',
    quote: 'O problema nunca foi a qualidade do produto.',
    author: 'Foi a falta de **posicionamento**.',
    quoteHighlight: 'posicionamento.',
  },
  {
    type: 'cta',
    eyebrow: 'MISSÃO',
    headline: 'Transformar marketing em **crescimento real**.',
    headlineHighlight: 'crescimento real.',
    body: 'Diagnóstico gratuito\nSem compromisso\nResposta em 24h',
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
// TEMPLATES — 12 estratégias, todas dark roxo/branco
// ─────────────────────────────────────────────────────────────────────────────
const TEMPLATES = [

  // 1 ── GANCHO DIRETO / educativo
  {
    name: 'Educativo',
    icon: '📚',
    desc: '5 erros · autoridade · hook forte',
    color: '#7c5cfc',
    slides: [
      {
        type: 'cover',
        tag: 'ESTRATÉGIA DIGITAL',
        headline: '5 erros que estão **destruindo** sua presença digital.',
        headlineHighlight: 'destruindo',
        sub: 'Se você comete qualquer um deles, está perdendo clientes todos os dias.',
        showCta: true, cta: 'Deslize e descubra', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ERRO 01',
        headline: 'Postar **sem estratégia**',
        headlineHighlight: 'sem estratégia',
        body: 'Conteúdo sem planejamento editorial não gera resultado. Cada post precisa de objetivo, público e CTA definidos antes de ser criado.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ERRO 02',
        headline: 'Ignorar os **dados**',
        headlineHighlight: 'dados',
        body: 'Métricas de vaidade não pagam boletos. Acompanhe alcance, cliques e conversões reais para saber o que está funcionando.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ERRO 03',
        headline: 'Identidade visual **inconsistente**',
        headlineHighlight: 'inconsistente',
        body: 'Sua marca precisa ser reconhecida em 2 segundos. Cor, fonte e tom de voz desalinhados fazem você parecer amador.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'REFLEXÃO',
        quote: 'Marca forte não é sobre parecer bonito.',
        author: 'É sobre ser **lembrado** na hora certa.',
        quoteHighlight: 'lembrado',
      },
      {
        type: 'cta', eyebrow: 'CHEGA DE ERRAR',
        headline: 'A gente **corrige** isso por você.',
        headlineHighlight: 'corrige',
        body: 'Auditoria gratuita\nSem compromisso\nResposta em 24h',
        cta: 'Quero minha auditoria',
      },
    ],
  },

  // 2 ── PROVOCATIVO / dor → solução
  {
    name: 'Provocativo',
    icon: '🔥',
    desc: 'Dor real · urgência · transformação',
    color: '#ff5566',
    slides: [
      {
        type: 'cover',
        tag: 'REALIDADE',
        headline: 'Seu concorrente está crescendo. **E você?**',
        headlineHighlight: 'E você?',
        sub: 'Enquanto você espera o momento certo, outros estão capturando os seus clientes.',
        showCta: true, cta: 'Veja o que está acontecendo', brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'CONTEXTO',
        quote: 'Muitas empresas têm produtos incríveis.',
        author: 'O mercado simplesmente não sabe que elas **existem**.',
        quoteHighlight: 'existem',
      },
      {
        type: 'quote', quoteTag: 'DIAGNÓSTICO',
        quote: 'O problema nunca foi a qualidade do produto.',
        author: 'Foi a falta de **posicionamento**.',
        quoteHighlight: 'posicionamento',
      },
      {
        type: 'content', step: 'A SOLUÇÃO',
        headline: 'Estratégia, design e **execução**.',
        headlineHighlight: 'execução',
        body: 'Não é sobre estar em todo lugar. É sobre estar no lugar certo, com a mensagem certa, para o cliente certo.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'O MOMENTO É AGORA',
        headline: 'Pare de **perder** espaço no mercado.',
        headlineHighlight: 'perder',
        body: 'Diagnóstico gratuito\nSem compromisso\nResposta em 24h',
        cta: 'Quero sair na frente',
      },
    ],
  },

  // 3 ── SERVIÇOS / apresentação de método
  {
    name: 'Serviços',
    icon: '⚙️',
    desc: 'O que fazemos · método · CTA',
    color: '#c4f542',
    slides: [
      {
        type: 'cover',
        tag: 'SERVIÇOS',
        headline: 'O que fazemos por **você**.',
        headlineHighlight: 'você',
        sub: 'Construímos sistemas completos de crescimento digital para empresas que querem resultados consistentes.',
        showCta: true, cta: 'Deslize para ver', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'SERVIÇO 01',
        headline: 'A marca que as pessoas **lembram**.',
        headlineHighlight: 'lembram',
        body: 'Definimos o posicionamento estratégico da sua marca para que ela gere autoridade, desperte confiança e seja a escolha natural.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'SERVIÇO 02',
        headline: 'Conteúdo que atrai o cliente **certo**.',
        headlineHighlight: 'certo',
        body: 'Cada publicação constrói percepção de valor. Copy que converte. Design consistente. SEO que gera tráfego qualificado.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'SERVIÇO 03',
        headline: 'Leads que viram **clientes**.',
        headlineHighlight: 'clientes',
        body: 'Criamos sistemas de tráfego e funis de conversão que geram oportunidades de negócio com consistência.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'O SISTEMA COMPLETO',
        headline: 'Tudo conectado. Tudo **funcionando**.',
        headlineHighlight: 'funcionando',
        body: 'Diagnóstico gratuito\nSem compromisso\nResposta em 24h',
        cta: 'Quero conhecer a Bescheiben',
      },
    ],
  },

  // 4 ── LISTA / curiosidade + retenção
  {
    name: 'Lista Rápida',
    icon: '⚡',
    desc: 'Hook de lista · retenção · saves',
    color: '#a688fd',
    slides: [
      {
        type: 'cover',
        tag: 'MARKETING B2B',
        headline: '3 perguntas que todo dono de negócio precisa **responder**.',
        headlineHighlight: 'responder',
        sub: 'Se você não sabe as respostas, está operando no escuro.',
        showCta: true, cta: 'Salve esse post', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 01',
        headline: 'Quem é o seu cliente dos **sonhos**?',
        headlineHighlight: 'sonhos',
        body: 'Não "empresas do setor X". Uma pessoa real, com cargo, dor específica e orçamento definido. Sem isso, sua comunicação atinge todo mundo e não converte ninguém.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 02',
        headline: 'Por que alguém te **escolhe** e não o concorrente?',
        headlineHighlight: 'escolhe',
        body: '"Qualidade e atendimento" não é diferencial — é o mínimo. Seu diferencial real precisa ser claro em 1 frase e visível em todo ponto de contato.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 03',
        headline: 'Qual é o **próximo passo** que você quer que ele dê?',
        headlineHighlight: 'próximo passo',
        body: 'Todo post, todo e-mail, toda conversa precisa de um CTA claro. Se você não conduz, o cliente some. É simples assim.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'CONCLUSÃO',
        quote: 'Clareza não é opcional no marketing B2B.',
        author: 'É o **produto** em si.',
        quoteHighlight: 'produto',
      },
      {
        type: 'cta', eyebrow: 'PRÓXIMO PASSO',
        headline: 'Respondeu as 3? Hora de **agir**.',
        headlineHighlight: 'agir',
        body: 'Diagnóstico gratuito\nAnálise do seu posicionamento\nPlano de ação em 24h',
        cta: 'Quero meu diagnóstico',
      },
    ],
  },

  // 5 ── ANTES E DEPOIS / transformação
  {
    name: 'Antes/Depois',
    icon: '🔄',
    desc: 'Transformação · resultado · prova',
    color: '#22d3ee',
    slides: [
      {
        type: 'cover',
        tag: 'TRANSFORMAÇÃO',
        headline: 'Como uma empresa saiu do **invisible** para referência no digital.',
        headlineHighlight: 'invisible',
        sub: 'Em 90 dias. Com método. Sem milagre.',
        showCta: true, cta: 'Ver o processo completo', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ANTES',
        headline: 'Presença digital **sem resultado**.',
        headlineHighlight: 'sem resultado',
        body: 'Perfil ativo, conteúdo saindo, mas zero leads. Seguidores aumentando, faturamento estagnado. Som familiar?',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'DIAGNÓSTICO',
        headline: 'O problema estava no **posicionamento**.',
        headlineHighlight: 'posicionamento',
        body: 'Não na frequência de posts. Não no design. O conteúdo certo para o público errado — ou o público certo com a mensagem errada.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PROCESSO',
        headline: 'Reposicionamento em **3 fases**.',
        headlineHighlight: '3 fases',
        body: 'Diagnóstico de marca → Estratégia de conteúdo → Execução com métricas. Cada fase conectada. Cada ação mensurável.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'RESULTADO',
        quote: '90 dias depois do reposicionamento:',
        author: 'Primeiro contrato B2B fechado pelo **Instagram**.',
        quoteHighlight: 'Instagram',
      },
      {
        type: 'cta', eyebrow: 'ESSA PODE SER SUA HISTÓRIA',
        headline: 'Quer esse **resultado**?',
        headlineHighlight: 'resultado',
        body: 'Diagnóstico gratuito\nSem compromisso\nIniciamos em 7 dias',
        cta: 'Quero começar agora',
      },
    ],
  },

  // 6 ── AUTORIDADE / posicionamento de especialista
  {
    name: 'Autoridade',
    icon: '🏆',
    desc: 'Expertise · confiança · liderança',
    color: '#f59e0b',
    slides: [
      {
        type: 'cover',
        tag: 'POSICIONAMENTO',
        headline: 'A diferença entre ser encontrado e ser **escolhido**.',
        headlineHighlight: 'escolhido',
        sub: 'Empresas que dominam o digital não postam mais. Postam melhor.',
        showCta: true, cta: 'Descubra como', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'REALIDADE 01',
        headline: 'Visibilidade **sem autoridade** não converte.',
        headlineHighlight: 'sem autoridade',
        body: 'Você pode ter mil seguidores novos por mês e continuar sem fechar contratos. O problema não é alcance — é autoridade percebida.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'REALIDADE 02',
        headline: 'Autoridade se constrói com **consistência**.',
        headlineHighlight: 'consistência',
        body: 'Não com um viral. Um posicionamento claro, reforçado semana a semana, cria o ativo mais valioso do digital: confiança antes do primeiro contato.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'PRINCÍPIO',
        quote: 'Quando o cliente pensa no seu nicho,',
        author: 'ele precisa pensar em você **primeiro**.',
        quoteHighlight: 'primeiro',
      },
      {
        type: 'content', step: 'O CAMINHO',
        headline: 'Posicionamento → Conteúdo → **Conversão**.',
        headlineHighlight: 'Conversão',
        body: 'Esse é o sistema. Funciona para agências, consultorias, escritórios e qualquer negócio B2B que quer crescer com previsibilidade.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'CONSTRUA SUA AUTORIDADE',
        headline: 'Comece pelo **diagnóstico**.',
        headlineHighlight: 'diagnóstico',
        body: 'Diagnóstico gratuito\nPlano personalizado\nIniciamos em 7 dias',
        cta: 'Agendar agora',
      },
    ],
  },

  // 7 ── MINIMALISTA / Foco em tipografia pura
  {
    name: 'Minimalista',
    icon: '◼️',
    desc: 'Tipografia pura · contraste · elegância',
    color: '#ffffff',
    slides: [
      {
        type: 'cover',
        tag: 'ESSÊNCIA',
        headline: '**Menos** é mais.',
        headlineHighlight: 'Menos',
        sub: 'A complexidade afasta. A clareza converte.',
        showCta: true, cta: 'Descubra', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: '01',
        headline: 'Remova o **desnecessário**.',
        headlineHighlight: 'desnecessário',
        body: 'Cada elemento na tela deve ter um propósito claro. Se não contribui para a mensagem, elimine.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'VERDADE',
        quote: 'Design não é sobre como **parece**.',
        author: 'É sobre como **funciona**.',
        quoteHighlight: 'funciona',
      },
      {
        type: 'cta', eyebrow: 'SIMPLIFIQUE',
        headline: 'Vamos **limpar** sua comunicação?',
        headlineHighlight: 'limpar',
        body: 'Auditoria visual gratuita\nAnálise em 48h',
        cta: 'Quero simplificar',
      },
    ],
  },

  // 8 ── CHECKLIST VISUAL / Checkboxes grandes
  {
    name: 'Checklist',
    icon: '☑️',
    desc: 'Checkboxes · ação · produtividade',
    color: '#a855f7',
    slides: [
      {
        type: 'cover',
        tag: 'CHECKLIST',
        headline: 'Você está fazendo isso **errado**.',
        headlineHighlight: 'errado',
        sub: '7 sinais de que sua estratégia digital precisa mudar agora.',
        showCta: true, cta: 'Veja a lista', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'CHECK 01',
        headline: '☐ Posta sem **estratégia**',
        headlineHighlight: 'estratégia',
        body: 'Publicar "quando dá" não funciona. Você precisa de um calendário editorial e objetivos claros.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'CHECK 02',
        headline: '☐ Ignora os **números**',
        headlineHighlight: 'números',
        body: 'Se você não mede, não gerencia. Métricas são o GPS do seu crescimento.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'CHECK 03',
        headline: '☐ Copia a **concorrência**',
        headlineHighlight: 'concorrência',
        body: 'O que funciona para outros pode não funcionar para você. Sua marca é única — sua estratégia também deve ser.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'SOLUÇÃO',
        headline: 'Marque todos como **FEITO**.',
        headlineHighlight: 'FEITO',
        body: 'Diagnóstico completo\nPlano de correção\nAcompanhamento',
        cta: 'Quero acertar',
      },
    ],
  },

  // 9 ── COMPARATIVO / Antes vs Depois lado a lado
  {
    name: 'Comparativo',
    icon: '⚖️',
    desc: 'Comparação · contraste · escolha',
    color: '#ec4899',
    slides: [
      {
        type: 'cover',
        tag: 'DILEMA',
        headline: '**Antes** vs **Depois**.',
        headlineHighlight: 'Antes,Depois',
        sub: 'A diferença entre stagnar e crescer.',
        showCta: true, cta: 'Veja a diferença', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'ANTES',
        headline: 'Sem **estratégia**',
        headlineHighlight: 'estratégia',
        body: '• Posts aleatórios\n• Pouco engajamento\n• Zero conversões\n• Incerteza constante',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'DEPOIS',
        headline: 'Com **método**',
        headlineHighlight: 'método',
        body: '• Conteúdo planejado\n• Audiência qualificada\n• Leads recorrentes\n• Crescimento previsível',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'ESCOLHA',
        quote: 'Você não precisa de mais **tempo**.',
        author: 'Precisa de mais **direção**.',
        quoteHighlight: 'direção',
      },
      {
        type: 'cta', eyebrow: 'TRANSFORMAÇÃO',
        headline: 'Mude para o **lado certo**.',
        headlineHighlight: 'lado certo',
        body: 'Análise gratuita\nProposta em 24h',
        cta: 'Quero transformar',
      },
    ],
  },

  // 10 ── ESTATÍSTICAS / Números grandes
  {
    name: 'Números',
    icon: '🔢',
    desc: 'Dados · prova social · autoridade',
    color: '#3b82f6',
    slides: [
      {
        type: 'cover',
        tag: 'DADOS',
        headline: '**73%** das empresas B2B falham no digital.',
        headlineHighlight: '73%',
        sub: 'Não por falta de esforço. Por falta de método.',
        showCta: true, cta: 'Veja por quê', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'DADO 01',
        headline: 'Só **15%** têm estratégia documentada.',
        headlineHighlight: '15%',
        body: 'O resto improvisa. E os resultados mostram exatamente isso: inconsistência e desperdício de recursos.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'DADO 02',
        headline: '**3x** mais leads com posicionamento claro.',
        headlineHighlight: '3x',
        body: 'Empresas com marca bem posicionada geram 3 vezes mais oportunidades de negócio nas redes sociais.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'FATO',
        quote: 'Não é sobre ter mais **seguidores**.',
        author: 'É ter seguidores **certos**.',
        quoteHighlight: 'certos',
      },
      {
        type: 'cta', eyebrow: 'FAÇA PARTE DOS 27%',
        headline: 'Seja uma empresa que **cresce**.',
        headlineHighlight: 'cresce',
        body: 'Diagnóstico estatístico\nBenchmarking incluído',
        cta: 'Quero dados reais',
      },
    ],
  },

  // 11 ── PERGUNTAS / FAQ Style
  {
    name: 'Perguntas',
    icon: '❓',
    desc: 'FAQ · curiosidade · engajamento',
    color: '#14b8a6',
    slides: [
      {
        type: 'cover',
        tag: 'DÚVIDAS',
        headline: 'As **5 perguntas** que todo mundo faz.',
        headlineHighlight: '5 perguntas',
        sub: 'E as respostas que vão mudar seu negócio.',
        showCta: true, cta: 'Descubra', brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 1',
        headline: '"Preciso postar **todo dia**?"',
        headlineHighlight: 'todo dia',
        body: 'Não. Precisa postar com consistência. Qualidade > Quantidade. 3 posts excelentes por semana vencem 7 posts medíocres.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 2',
        headline: '"Quanto tempo para **resultados**?"',
        headlineHighlight: 'resultados',
        body: '90 dias para posicionamento. 6 meses para fluxo constante de leads. Marketing é investimento, não mágica.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'content', step: 'PERGUNTA 3',
        headline: '"Preciso investir em **ads**?"',
        headlineHighlight: 'ads',
        body: 'Orgânico constrói autoridade. Paid media acelera resultados. Os dois juntos são imbatíveis.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'cta', eyebrow: 'TEM MAIS DÚVIDAS?',
        headline: 'Temos as **respostas**.',
        headlineHighlight: 'respostas',
        body: 'Consulta gratuita\nTire todas suas dúvidas',
        cta: 'Quero conversar',
      },
    ],
  },

  // 12 ── DEPOIMENTO / Review
  {
    name: 'Depoimento',
    icon: '💬',
    desc: 'Social proof · resultado real · confiança',
    color: '#f97316',
    slides: [
      {
        type: 'cover',
        tag: 'CASE',
        headline: '"Aumentamos nossos leads em **300%**"',
        headlineHighlight: '300%',
        sub: 'Como a TechFlow transformou sua presença digital em 60 dias.',
        showCta: true, cta: 'Leia o case', brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'O PROBLEMA',
        quote: '"Tínhamos um produto excelente, mas ninguém nos conhecia.',
        author: 'Estávamos **invisíveis** no digital."',
        quoteHighlight: 'invisíveis',
      },
      {
        type: 'content', step: 'A SOLUÇÃO',
        headline: 'Reposicionamento **estratégico**.',
        headlineHighlight: 'estratégico',
        body: 'A Bescheiben重构了 nossa comunicação. Novo posicionamento, novo visual, novo tom de voz. Tudo alinhado para atrair o cliente ideal.',
        brand: 'BESCHEIBEN',
      },
      {
        type: 'quote', quoteTag: 'O RESULTADO',
        quote: 'Em 60 dias:',
        author: '**300%** mais leads qualificados.',
        quoteHighlight: '300%',
      },
      {
        type: 'cta', eyebrow: 'SEU CASE PODE SER O PRÓXIMO',
        headline: 'Pronto para **crescer**?',
        headlineHighlight: 'crescer',
        body: 'Diagnóstico gratuito\nMetodologia comprovada',
        cta: 'Quero resultados assim',
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