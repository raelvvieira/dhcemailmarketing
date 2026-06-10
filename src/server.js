require('dotenv').config();
const express = require('express');
const crypto = require('crypto');
const { handleWebhook } = require('./webhook');

const app = express();

// Precisa capturar o body raw antes do JSON.parse para verificar a assinatura
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  },
}));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/webhook/kiwify', async (req, res) => {
  // 1. Verifica o token simples na URL
  const token = req.query.token;
  if (token !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  // 2. Verifica assinatura HMAC-SHA1 da Kiwify (se o token estiver configurado)
  if (process.env.KIWIFY_TOKEN) {
    const signature = req.headers['x-webhook-token'] || req.headers['x-kiwify-signature'] || '';
    const expected = crypto
      .createHmac('sha1', process.env.KIWIFY_TOKEN)
      .update(req.rawBody)
      .digest('hex');

    const sigBuf = Buffer.from(signature.padEnd(expected.length, ' '));
    const expBuf = Buffer.from(expected);
    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      console.warn('Assinatura Kiwify inválida — requisição rejeitada');
      return res.status(401).json({ error: 'Assinatura inválida' });
    }
  }

  try {
    await handleWebhook(req.body);
    res.json({ received: true });
  } catch (err) {
    console.error('Erro no webhook:', err.message);
    res.status(500).json({ error: 'Erro interno' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
