const express = require('express')
const CronJob = require('cron').CronJob
const dotenv = require('dotenv')
dotenv.config()

const login = require('./src/monitor/pseudo-login')
const monitor = require('./src/monitor/monitor')
const mailer = require('./src/mailer/mailer')

const PORT = process.env.PORT || 8001

const app = express()

app.get('/', (req, res) => {
  res.status(200)
  res.send('API em funcionamento')
  res.end()
})

app.listen(PORT, () => console.log(`Everything okay, Running at port: ${PORT}`))

async function job() {
  console.log('Starting check.')
  function timeout(callback, ms) {
    return new Promise(resolve => setTimeout(resolve, ms)).then(() => callback)
  }

  const token = await login.login()

  const res1 = await monitor.monitor(token)
  const res2 = await timeout(monitor.monitor(token), 10000)
  const res3 = await timeout(monitor.monitor(token), 10000)

  const intersect1 = res1.filter(entry => !res2.includes(entry))
  const intersect2 = intersect1.filter(entry => !res3.includes(entry))

  if (!intersect2.length) { 
    console.log('No customers offline.')
    return
  }
  console.log(`Mailing ${intersect2.length} customer(s).`)

  intersect2.map((customer) => {
    mailer.sendEmail(customer.name, customer.mail, customer.domain)
  })
}

function checkEnvs() {
  const missingEnv = []

  process.env.EMAIL && process.env.EMAIL !== '' ? null : missingEnv.push('EMAIL')
  process.env.PASSWORD && process.env.PASSWORD !== '' ? null : missingEnv.push('PASSWORD')
  process.env.HOST && process.env.HOST !== '' ? null : missingEnv.push('HOST')
  process.env.AXIOS_DOMAIN && process.env.AXIOS_DOMAIN !== '' ? null : missingEnv.push('AXIOS_DOMAIN')
  process.env.USER_NAME && process.env.USER_NAME !== '' ? null : missingEnv.push('USER_NAME')
  process.env.AUTH_PASSWORD && process.env.AUTH_PASSWORD !== '' ? null : missingEnv.push('AUTH_PASSWORD')
  process.env.AUTHORIZATION && process.env.AUTHORIZATION !== '' ? null : missingEnv.push('AUTHORIZATION')
  process.env.TOKEN_KEY && process.env.TOKEN_KEY !== '' ? null : missingEnv.push('TOKEN_KEY')
  process.env.DASHBOARD && process.env.DASHBOARD !== '' ? null : missingEnv.push('DASHBOARD')

  if(!missingEnv.length){
    console.log('Enviroment variables loaded sucessfully.')
    return
  }
  else {
    console.log('Error loading env(s): ', missingEnv)
    console.log('Exiting.')
    process.exit(0)
  }
}
checkEnvs()

const cronTime = process.env.CRON || '0 8 * * 1-5'
console.log(`Checks will be executed at Cron: "${cronTime}"`)
let cron = new CronJob(cronTime, () => {
  job()
})

cron.start()
