const nodemailer = require('nodemailer')
const mailTemplate = require('./email-template.js')
const path = require('path')

module.exports = {
  sendEmail (cliente, destination, domain) {
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
      subject: 'Monitoramento MeuClinic',
      html: mailTemplate(cliente, domain),
      attachments: [{
        filename: 'clinic-logo.jpg',
        path: path.join(__dirname, 'resources/clinic-logo.jpg'),
        cid: 'logoClinicUniqueValue'
      }]
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