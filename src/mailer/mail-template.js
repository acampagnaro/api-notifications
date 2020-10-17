const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
module.exports = {
  text (cliente, domain) {
    const token = jwt.sign({ name: cliente, domain: domain }, process.env.TOKEN_KEY)
    let string = `Prezado(a) ${cliente || 'Cliente'},<br><br>Nosso monitoramento do serviço MEUCLINIC (acesso às agendas por celular) verificou que seu serviço está OFFLINE, por favor acesse o link abaixo para reativação, seguindo as instruções fornecidas.<br><br>
    ${process.env.DASHBOARD}${token}<br><br>
    Equipe newCLINIC<br><br>
    suporte@clinic.med.br<br><br>
    www.clinic.com.br
    `
    return string
  }
}