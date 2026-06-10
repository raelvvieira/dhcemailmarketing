const base = require('./base');

function infoRow(label, value) {
  if (!value) return '';
  return `
    <table width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0;">
      <tr>
        <td style="background:#f8f8f8;border-radius:6px;padding:12px 16px;">
          <span style="color:#888888;font-size:12px;text-transform:uppercase;letter-spacing:0.5px;">${label}</span><br>
          <span style="color:#111111;font-size:15px;font-weight:600;">${value}</span>
        </td>
      </tr>
    </table>`;
}

function ctaButton(text, url = '#') {
  return `
    <table cellpadding="0" cellspacing="0" style="margin:28px 0 0;">
      <tr>
        <td style="background:#111111;border-radius:6px;padding:14px 32px;">
          <a href="${url}" style="color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;display:block;">${text}</a>
        </td>
      </tr>
    </table>`;
}

module.exports = {
  order_approved: ({ name, product, orderId, amount }) => ({
    subject: `✅ Compra confirmada — ${product}`,
    html: base({
      accentColor: '#22c55e',
      title: 'Compra Confirmada! 🎉',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>!</p>
        <p style="margin:0 0 24px;">Sua compra foi <strong>aprovada com sucesso</strong>. Obrigado pela confiança! Em breve você receberá o acesso ao produto.</p>
        ${infoRow('Produto', product)}
        ${infoRow('Pedido', orderId)}
        ${infoRow('Valor', amount)}
        <p style="margin:24px 0 0;color:#666666;font-size:14px;">Qualquer dúvida, basta responder este email. 💙</p>
      `,
    }),
  }),

  order_billet: ({ name, product, orderId, amount }) => ({
    subject: `📄 Boleto gerado — ${product}`,
    html: base({
      accentColor: '#f59e0b',
      title: 'Boleto Gerado',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>!</p>
        <p style="margin:0 0 24px;">Seu boleto foi gerado. Após o pagamento, a confirmação pode levar até <strong>3 dias úteis</strong> e o acesso será liberado automaticamente.</p>
        ${infoRow('Produto', product)}
        ${infoRow('Pedido', orderId)}
        ${infoRow('Valor', amount)}
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
          <tr>
            <td style="background:#fffbeb;border-left:3px solid #f59e0b;border-radius:0 6px 6px 0;padding:14px 16px;">
              <span style="color:#92400e;font-size:13px;">⚠️ O boleto vence em <strong>3 dias úteis</strong>. Não pague após o vencimento.</span>
            </td>
          </tr>
        </table>
      `,
    }),
  }),

  order_pix: ({ name, product, orderId, amount }) => ({
    subject: `💠 Pix gerado — ${product}`,
    html: base({
      accentColor: '#06b6d4',
      title: 'Pix Aguardando Pagamento',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>!</p>
        <p style="margin:0 0 24px;">Seu código Pix foi gerado. Após o pagamento, o acesso é <strong>liberado instantaneamente</strong>.</p>
        ${infoRow('Produto', product)}
        ${infoRow('Pedido', orderId)}
        ${infoRow('Valor', amount)}
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
          <tr>
            <td style="background:#ecfeff;border-left:3px solid #06b6d4;border-radius:0 6px 6px 0;padding:14px 16px;">
              <span style="color:#164e63;font-size:13px;">⏱ O código Pix expira em <strong>30 minutos</strong>.</span>
            </td>
          </tr>
        </table>
      `,
    }),
  }),

  order_refunded: ({ name, product, orderId, amount }) => ({
    subject: `💰 Reembolso processado — ${product}`,
    html: base({
      accentColor: '#8b5cf6',
      title: 'Reembolso Processado',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>,</p>
        <p style="margin:0 0 24px;">Seu reembolso foi <strong>processado com sucesso</strong>. O valor pode levar de <strong>5 a 10 dias úteis</strong> para aparecer na sua fatura ou conta, dependendo do banco.</p>
        ${infoRow('Produto', product)}
        ${infoRow('Pedido', orderId)}
        ${infoRow('Valor estornado', amount)}
        <p style="margin:24px 0 0;color:#666666;font-size:14px;">Se tiver qualquer dúvida, responda este email.</p>
      `,
    }),
  }),

  order_chargeback: ({ name, product, orderId }) => ({
    subject: `⚠️ Contestação recebida — ${product}`,
    html: base({
      accentColor: '#ef4444',
      title: 'Contestação Recebida',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>,</p>
        <p style="margin:0 0 24px;">Recebemos uma <strong>contestação (chargeback)</strong> referente à sua compra. Se você não reconhece essa transação ou teve algum problema com o produto, entre em contato conosco o quanto antes.</p>
        ${infoRow('Produto', product)}
        ${infoRow('Pedido', orderId)}
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
          <tr>
            <td style="background:#fef2f2;border-left:3px solid #ef4444;border-radius:0 6px 6px 0;padding:14px 16px;">
              <span style="color:#991b1b;font-size:13px;">Se foi um engano, <strong>responda este email imediatamente</strong> para resolvermos.</span>
            </td>
          </tr>
        </table>
      `,
    }),
  }),

  subscription_canceled: ({ name, product }) => ({
    subject: `❌ Assinatura cancelada — ${product}`,
    html: base({
      accentColor: '#6b7280',
      title: 'Assinatura Cancelada',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>,</p>
        <p style="margin:0 0 24px;">Sua assinatura de <strong>${product}</strong> foi cancelada. Seu acesso permanece disponível até o final do período já pago.</p>
        ${infoRow('Produto', product)}
        <p style="margin:24px 0 8px;color:#444444;">Se cancelou por engano ou mudou de ideia, responda este email e reativamos sua assinatura. 💙</p>
        <p style="margin:0;color:#666666;font-size:14px;">Foi um prazer ter você com a gente!</p>
      `,
    }),
  }),

  subscription_renewal: ({ name, product, amount }) => ({
    subject: `🔄 Assinatura renovada — ${product}`,
    html: base({
      accentColor: '#22c55e',
      title: 'Assinatura Renovada! 🚀',
      body: `
        <p style="margin:0 0 20px;">Olá, <strong>${name}</strong>!</p>
        <p style="margin:0 0 24px;">Sua assinatura foi <strong>renovada com sucesso</strong>. Continue aproveitando tudo que preparamos para você!</p>
        ${infoRow('Produto', product)}
        ${infoRow('Valor cobrado', amount)}
        <p style="margin:24px 0 0;color:#666666;font-size:14px;">Qualquer dúvida, responda este email. 💙</p>
      `,
    }),
  }),
};
