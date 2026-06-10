# DHC Email Marketing — Automação Kiwify + Hostinger

Servidor de webhook que escuta eventos da Kiwify e envia emails automáticos via Hostinger SMTP.

## Eventos suportados

| Evento Kiwify | Email enviado |
|---|---|
| `order_approved` | Compra confirmada (cartão) |
| `order_billet` | Boleto gerado |
| `order_pix` | Pix aguardando pagamento |
| `order_refunded` | Reembolso processado |
| `order_chargeback` | Contestação recebida |
| `subscription_canceled` | Assinatura cancelada |
| `subscription_renewal` | Assinatura renovada |

## Deploy no Railway

1. Faça o push deste repositório para o GitHub
2. No [Railway](https://railway.app): **New Project → Deploy from GitHub**
3. Vá em **Variables** e adicione:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=seu-email@seudominio.com
SMTP_PASS=sua-senha
EMAIL_FROM_NAME=Deni Haut
EMAIL_FROM_ADDRESS=seu-email@seudominio.com
WEBHOOK_SECRET=uma-string-secreta-forte
```

4. Copie a URL pública gerada pelo Railway (ex: `https://xxx.railway.app`)
5. Na Kiwify, configure o webhook:
   ```
   https://xxx.railway.app/webhook/kiwify?token=SUA_WEBHOOK_SECRET
   ```

## Teste local

```bash
cp .env.example .env
# edite o .env com seus dados reais
npm install
npm run dev
```

Teste com curl:
```bash
curl -X POST "http://localhost:3000/webhook/kiwify?token=dhc_secret_2024" \
  -H "Content-Type: application/json" \
  -d '{
    "webhook_event_type": "order_approved",
    "customer": { "full_name": "João Silva", "email": "joao@teste.com" },
    "order": { "product_name": "Curso DHC", "order_id": "ORD-001", "product_price": 9700 }
  }'
```

## Verificar saúde do servidor

```
GET /health
```
