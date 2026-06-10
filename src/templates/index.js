const base = require('./base');

module.exports = {
  // Compra aprovada (cartão)
  order_approved: ({ name, product, orderId, amount }) => ({
    subject: `✅ Compra confirmada — ${product}`,
    html: base({
      title: 'Compra Confirmada!',
      body: `
        <p>Olá, <strong>${name}</strong>! 🎉</p>
        <p>Sua compra de <strong>${product}</strong> foi <strong>aprovada</strong> com sucesso.</p>
        ${amount ? `<p>Valor: <strong>${amount}</strong></p>` : ''}
        ${orderId ? `<p>Pedido: <code>${orderId}</code></p>` : ''}
        <p>Em breve você receberá o acesso ao produto. Qualquer dúvida, responda este email.</p>
        <p>Seja bem-vindo(a)! 🚀</p>
      `,
    }),
  }),

  // Compra via boleto (aguardando pagamento)
  order_billet: ({ name, product, orderId, amount }) => ({
    subject: `📄 Boleto gerado — ${product}`,
    html: base({
      title: 'Boleto Gerado',
      body: `
        <p>Olá, <strong>${name}</strong>!</p>
        <p>Seu boleto para <strong>${product}</strong> foi gerado.</p>
        ${amount ? `<p>Valor: <strong>${amount}</strong></p>` : ''}
        ${orderId ? `<p>Pedido: <code>${orderId}</code></p>` : ''}
        <p>O boleto vence em <strong>3 dias úteis</strong>. Após o pagamento, a confirmação pode levar até 3 dias úteis.</p>
        <p>Assim que o pagamento for confirmado, você receberá o acesso ao produto.</p>
      `,
    }),
  }),

  // Compra via Pix (aguardando pagamento)
  order_pix: ({ name, product, orderId, amount }) => ({
    subject: `💠 Pix gerado — ${product}`,
    html: base({
      title: 'Pix Aguardando Pagamento',
      body: `
        <p>Olá, <strong>${name}</strong>!</p>
        <p>Seu Pix para <strong>${product}</strong> foi gerado.</p>
        ${amount ? `<p>Valor: <strong>${amount}</strong></p>` : ''}
        ${orderId ? `<p>Pedido: <code>${orderId}</code></p>` : ''}
        <p>O código Pix expira em <strong>30 minutos</strong>. Após o pagamento, o acesso é liberado automaticamente.</p>
      `,
    }),
  }),

  // Reembolso aprovado
  order_refunded: ({ name, product, orderId, amount }) => ({
    subject: `💰 Reembolso processado — ${product}`,
    html: base({
      title: 'Reembolso Processado',
      body: `
        <p>Olá, <strong>${name}</strong>,</p>
        <p>Seu reembolso referente a <strong>${product}</strong> foi processado.</p>
        ${amount ? `<p>Valor estornado: <strong>${amount}</strong></p>` : ''}
        ${orderId ? `<p>Pedido: <code>${orderId}</code></p>` : ''}
        <p>O valor pode levar de 5 a 10 dias úteis para aparecer na sua fatura/conta, dependendo do banco.</p>
        <p>Se tiver dúvidas, responda este email.</p>
      `,
    }),
  }),

  // Chargeback (contestação)
  order_chargeback: ({ name, product, orderId }) => ({
    subject: `⚠️ Contestação recebida — ${product}`,
    html: base({
      title: 'Contestação Recebida',
      body: `
        <p>Olá, <strong>${name}</strong>,</p>
        <p>Recebemos uma contestação (chargeback) referente à compra de <strong>${product}</strong>.</p>
        ${orderId ? `<p>Pedido: <code>${orderId}</code></p>` : ''}
        <p>Se você não reconhece essa compra ou teve algum problema, responda este email para resolvermos.</p>
        <p>Caso tenha sido um engano, entre em contato conosco o quanto antes.</p>
      `,
    }),
  }),

  // Assinatura cancelada
  subscription_canceled: ({ name, product }) => ({
    subject: `❌ Assinatura cancelada — ${product}`,
    html: base({
      title: 'Assinatura Cancelada',
      body: `
        <p>Olá, <strong>${name}</strong>,</p>
        <p>Sua assinatura de <strong>${product}</strong> foi cancelada.</p>
        <p>Seu acesso ficará disponível até o final do período já pago.</p>
        <p>Se mudou de ideia ou cancelou por engano, responda este email e podemos reativar sua assinatura.</p>
        <p>Foi um prazer ter você com a gente! 💙</p>
      `,
    }),
  }),

  // Renovação de assinatura aprovada
  subscription_renewal: ({ name, product, amount }) => ({
    subject: `🔄 Assinatura renovada — ${product}`,
    html: base({
      title: 'Assinatura Renovada',
      body: `
        <p>Olá, <strong>${name}</strong>!</p>
        <p>Sua assinatura de <strong>${product}</strong> foi renovada com sucesso.</p>
        ${amount ? `<p>Valor cobrado: <strong>${amount}</strong></p>` : ''}
        <p>Continue aproveitando tudo que preparamos para você! 🚀</p>
      `,
    }),
  }),
};
