const { sendEmail } = require('./mailer');
const templates = require('./templates');

async function handleWebhook(body) {
  const event = body?.webhook_event_type;
  const order = body?.order || {};
  const customer = body?.customer || body?.Customer || {};

  const data = {
    name: customer.full_name || customer.name || 'Cliente',
    email: customer.email,
    product: order.product_name || body?.product?.name || 'Produto',
    orderId: order.order_id || body?.order_id || '',
    amount: formatAmount(order.product_price || body?.amount),
    // email é passado explicitamente para o template poder exibir no corpo
  };

  if (!data.email) {
    console.log(`Evento ${event} sem email de cliente, ignorando.`);
    return;
  }

  console.log(`Evento recebido: ${event} | Cliente: ${data.email}`);

  const template = templates[event];
  if (!template) {
    console.log(`Evento "${event}" sem template configurado.`);
    return;
  }

  const { subject, html } = template(data);
  console.log(`Tentando enviar email para ${data.email} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} (secure=${process.env.SMTP_SECURE})`);
  try {
    await sendEmail({ to: data.email, subject, html });
    console.log(`Email enviado para ${data.email} (${event})`);
  } catch (smtpErr) {
    console.error(`Erro SMTP: ${smtpErr.message}`);
    console.error(`Código: ${smtpErr.code} | Resposta: ${smtpErr.response || 'sem resposta'}`);
    throw smtpErr;
  }
}

function formatAmount(val) {
  if (!val) return '';
  const num = parseFloat(val) / 100;
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

module.exports = { handleWebhook };
