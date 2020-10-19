const jwt = require('jsonwebtoken')

module.exports = function (customerName, domain) {
  const token = jwt.sign({ name: customerName, domain: domain }, process.env.TOKEN_KEY)
  const url = `${process.env.DASHBOARD}${token}`

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Monitoramento Clinic</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  </head>
  <body style="margin: 0; padding: 0;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
          <tr>
            <td 
              align="center"
              bgcolor="#0080ff"
              style="padding: 50px 0 0 0;"
            >
            </td>
          </tr>
          <tr>
            <td 
              align="center"
              bgcolor="#fff"
              style="padding: 40px 0 30px 0;"
            >
              <img 
                src="cid:logoClinicUniqueValue" 
                alt="Logo Clinic" width="300" 
                style="display: block;"
                href="https://www.clinic.com.br/"
              >
            </td>
          </tr>
          <tr>
            <td
              align="left"
              bgcolor="#b0f4ff"
              style="
                font-family: Arial, sans-serif;
                font-size: 15px;
                font-weight: normal;
                padding: 40px 50px 30px 50px;
              "
            >
              Prezado Cliente ${customerName}.
              <br><br> 
              Nosso sistema de monitoramento detectou que a plataforma de integração do 
              serviço MeuClinic encontra-se offline em seu servidor.
              <br><br>
              Para verificar o status atual do mesmo clique no botão abaixo.
              <table 
                align="center" 
                border="0" 
                cellpadding="0" 
                cellspacing="0" 
                width="200"
                style="
                  border-collapse: collapse;
                  margin: 15px auto 10px auto;
                  border-radius: 50px;
                  -moz-border-radius: 5px !important;"
              >
                <tr>
                  <td 
                    align="center"
                    style="
                      padding: 6px 5px 6px 5px;
                      border-radius: 20px;
                      font-size: 15px;
                      font-weight: normal;
                    "
                    bgcolor="#fff71c"
                  >
                    <a style="color: #000; text-decoration: none;" href="${url}">
                      Acessar Página de Status
                    </a>
                  </td>
                </tr>
              </table>
              Ou se preferir acesse o link: <a href="${url}">Clique Aqui</a>
              <tr>
                  <td 
                    align="left"
                    style="
                      padding: 5px 10px 5px 10px;
                      font-size: 13px;
                      font-weight: normal;
                    "
                    bgcolor="#3b9dff"
                  >
                    Horário da verificação: ${new Date()}
                  </td>
                </tr>
              <br><br>
            </td>
          </tr>
          <tr>
            <td 
              align="center"
              bgcolor="#0080ff"
              style="color: #fff; padding: 20px 10px 5px 10px; font-size: 14px;"
            >
            <a style="color: #fff;" href="https://www.clinic.med.br">www.clinic.med.br</a><br>
            <a style="color: #fff;" href="mailto:suporte@clinic.med.br">suporte@clinic.med.br</a><br>
            <a style="color: #fff;" href="tel:4130221459">(41) 3022-1459</a><br><br>
            &copy; ${new Date().getFullYear()} Clinic sistemas em saúde.
            </td>
          </tr>
        </table>
      </td>
    </tr>
    </table>
  </body>
  </html>`
}