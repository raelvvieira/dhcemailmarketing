const GRADIENT = 'linear-gradient(135deg, #8100FF 0%, #FF1E40 100%)';

module.exports = function base({ title, body, useGradientAccent = false }) {
  const topBar = useGradientAccent
    ? `<td style="background:${GRADIENT};height:4px;font-size:0;line-height:0;">&nbsp;</td>`
    : `<td style="background:#ffffff;height:4px;font-size:0;line-height:0;">&nbsp;</td>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- LOGO -->
          <tr>
            <td align="center" style="padding:0 0 24px 0;">
              <img src="https://i.ibb.co/R424CQrC/Design-sem-nome.png"
                   alt="Deni Haut"
                   width="160"
                   style="display:block;max-width:160px;height:auto;" />
            </td>
          </tr>

          <!-- CARD -->
          <tr>
            <td style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

              <!-- Barra superior -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>${topBar}</tr>
              </table>

              <!-- Conteúdo -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:44px 48px 40px;">

                    <!-- Título -->
                    <h1 style="margin:0 0 28px;color:#111111;font-size:22px;font-weight:700;line-height:1.3;letter-spacing:-0.3px;">${title}</h1>

                    <!-- Divider -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                      <tr>
                        <td style="border-top:1px solid #eeeeee;font-size:0;line-height:0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- Body -->
                    <div style="color:#444444;font-size:15px;line-height:1.75;">
                      ${body}
                    </div>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding:28px 0 0;">
              <p style="margin:0 0 6px;color:#aaaaaa;font-size:12px;line-height:1.6;">
                Você está recebendo este email porque realizou uma compra conosco.
              </p>
              <p style="margin:0;color:#aaaaaa;font-size:12px;">
                Em caso de dúvidas, responda este email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
