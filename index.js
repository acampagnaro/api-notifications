const express = require('express')
const CronJob = require('cron').CronJob
const dotenv = require('dotenv')
const login = require('./src/monitor/pseudo-login')
const monitor = require('./src/monitor/monitor')
const mailer = require('./src/mailer/mailer')
dotenv.config()

const PORT = process.env.PORT || 8001

const app = express()

app.get('/', (req, res) => {
  res.status(200)
  res.send('API em funcionamento')
  res.end()
})

app.listen(PORT, () => console.log(`Everything okay, Running at port: ${PORT}`))

let token
let res1 = []
let res2 = []
let res3 = []

function job() {
  login.login().then((res) => {
    token = res
    monitor.monitor(token).then(val => { res1 = val })
    setTimeout(() => { monitor.monitor(token).then(val => { res2 = val }) }, 15000)
    setTimeout(() => { monitor.monitor(token).then(val => { res3 = val })
      .then(() => {
        const intersect1 = res1.filter(entry => {
          let flag = 0
          res2.map((innerEntry) => {
            if (JSON.stringify(entry) === JSON.stringify(innerEntry)) {
              flag = 1
            }
          })
          if (flag === 1) {
            return entry
          }
        })
        const intersect2 = intersect1.filter(entry => {
          let flag = 0
          res3.map((innerEntry) => {
            if (JSON.stringify(entry) === JSON.stringify(innerEntry)) {
              flag = 1
            }
          })
          if (flag === 1) {
            return entry
          }
        })
        if (intersect2.length) {
          intersect2.map((cliente) => {
            mailer.sendEmail(cliente.name, cliente.mail, cliente.domain)
          })
        }
      })}, 30000)
  })
}

let auth = new CronJob('0 8 */1 * *', () => {
  job()
})

auth.start()
