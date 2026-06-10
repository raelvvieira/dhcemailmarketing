require('dotenv').config();
const express = require('express');
const { handleWebhook } = require('./webhook');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/webhook/kiwify', async (req, res) => {
  const token = req.query.token;
  if (token !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Token inválido' });
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
