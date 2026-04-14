'use strict';

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '') {
    console.error('[api/chat] GEMINI_API_KEY não configurada.');
    return res.status(500).json({
      error: 'Chave da API não configurada. Adicione GEMINI_API_KEY no Vercel.',
    });
  }

  const body = req.body || {};
  const { system, messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Campo "messages" é obrigatório.' });
  }

  // Tenta modelos em ordem: primeiro o estável, depois o novo
  const models = ['gemini-1.5-flash', 'gemini-2.5-flash'];
  let lastError = null;

  for (const modelName of models) {
    try {
      const contents = messages.map(function (m) {
        return {
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.content || '') }],
        };
      });

      const payload = {
        contents,
        generationConfig: {
          maxOutputTokens: 1500,
          temperature: 0.85,
        },
      };

      if (system && typeof system === 'string' && system.trim() !== '') {
        payload.systemInstruction = { parts: [{ text: system.trim() }] };
      }

      const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + apiKey.trim();

      console.log('[api/chat] Tentando modelo:', modelName);
      
      const geminiRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // Se deu 429 (high demand), tenta próximo modelo
      if (geminiRes.status === 429) {
        console.log('[api/chat] Modelo', modelName, 'sobrecarregado (429), tentando próximo...');
        lastError = 'high-demand';
        continue;
      }

      // Se deu erro 400/404 (modelo não existe), tenta próximo
      if (geminiRes.status === 400 || geminiRes.status === 404) {
        console.log('[api/chat] Modelo', modelName, 'indisponível, tentando próximo...');
        lastError = 'not-found';
        continue;
      }

      let data;
      try { data = await geminiRes.json(); } 
      catch (e) { 
        console.error('[api/chat] JSON inválido do modelo', modelName);
        continue; 
      }

      if (!geminiRes.ok) {
        const msg = (data.error && data.error.message) || 'Erro desconhecido';
        console.error('[api/chat] Erro do modelo', modelName, ':', msg);
        lastError = msg;
        continue;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        console.error('[api/chat] Resposta vazia do modelo', modelName);
        lastError = 'empty';
        continue;
      }

      console.log('[api/chat] Sucesso com modelo:', modelName);
      return res.status(200).json({ content: [{ type: 'text', text }] });

    } catch (err) {
      console.error('[api/chat] Exceção com modelo', modelName, ':', err.message);
      lastError = err.message;
      continue;
    }
  }

  // Se chegou aqui, todos os modelos falharam
  console.error('[api/chat] Todos os modelos falharam. Último erro:', lastError);
  
  if (lastError === 'high-demand') {
    return res.status(503).json({
      error: '⚠️ IA sobrecarregada. A API do Gemini está com alta demanda. Tente novamente em 30 segundos ou use um template pronto.',
      retryable: true
    });
  }
  
  return res.status(500).json({
    error: 'Não foi possível gerar resposta. Erro: ' + lastError,
  });
};
