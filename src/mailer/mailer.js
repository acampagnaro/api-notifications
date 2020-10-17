const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const mailTemplate = require('./mail-template')
dotenv.config()


module.exports = {
  async sendEmail (cliente, destination, domain) {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 465,
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      },
    })
    let mailOptions = {
      from: process.env.EMAIL,
      to: destination,
      subject: 'MeuClinic Offline',
      text: `Prezado Cliente, nosso monitoramento verificou que seu serviço está offline, por favor acesse o link ${process.env.DASHBOARD}static-monitor para reativação ou nosso suporte para mais detalhes.`,
      html: mailTemplate.text(cliente, domain),
    }
  
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(`Erro! ${err}`)
      } else {
        console.log(`Sucesso! E-mail de ${cliente} enviado para ${destination}`)
      }
    })
  }
}