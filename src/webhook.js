const { sendEmail } = require('./mailer');
const templates = require('./templates');

// Mapeamento dos nomes de eventos reais da Kiwify para os templates
const EVENT_MAP = {
  'order_approved':        'order_approved',
  'order_billet':          'order_billet',
  'billet_created':        'order_billet',
  'order_pix':             'order_pix',
  'pix_created':           'order_pix',
  'order_refunded':        'order_refunded',
  'refund_requested':      'order_refunded',
  'order_chargeback':      'order_chargeback',
  'chargeback_created':    'order_chargeback',
  'subscription_canceled': 'subscription_canceled',
  'subscription_renewal':  'subscription_renewal',
};

async function handleWebhook(body) {
  const rawEvent = body?.webhook_event_type;
  const event = EVENT_MAP[rawEvent];
  const order = body?.order || {};
  const customer = body?.customer || body?.Customer || {};

  const data = {
    name: customer.full_name || customer.name || 'Cliente',
    email: customer.email,
    product: order.product_name || body?.product?.name || 'Produto',
    orderId: order.order_id || body?.order_id || '',
    amount: formatAmount(order.product_price || body?.amount),
  };

  if (!data.email) {
    console.log(`Evento ${rawEvent} sem email de cliente, ignorando.`);
    return;
  }

  console.log(`Evento recebido: ${rawEvent} | Cliente: ${data.email}`);

  if (!event) {
    console.log(`Evento "${rawEvent}" sem template configurado.`);
    return;
  }

  const template = templates[event];
  const { subject, html } = template(data);

  try {
    await sendEmail({ to: data.email, subject, html });
    console.log(`Email enviado para ${data.email} (${rawEvent})`);
  } catch (err) {
    console.error(`Erro ao enviar email: ${err.message}`);
    throw err;
  }
}

function formatAmount(val) {
  if (!val) return '';
  const num = parseFloat(val) / 100;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

module.exports = { handleWebhook };
