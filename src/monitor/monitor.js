
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const instance = axios.create({
  baseURL: process.env.AXIOS_DOMAIN
})

module.exports = {
  monitor (token) {
    const config = {
      headers: {
        Authorization: process.env.AUTHORIZATION,
        'x-access-token': token,
      }
    }
    let offlineCustomers = []
    let mailList = []
    return instance.get('/customers/verif-status', config)
      .then((res) => {
        offlineCustomers = res.data.result.off
        if (offlineCustomers.length) {
          let mailCustomers = []
          return instance.get('/customers', config)
            .then((res) => {
              console.log('Request success!')
              res.data.result.map((entry) => {
                offlineCustomers.map((mapEntry) => {
                  if (entry.name === mapEntry){
                    mailCustomers.push(entry)
                  }
                })
              })
            })
            .then(() => mailCustomers.map((entry) => {
              if (entry.contacts.length) {
                let i
                for (i in entry.contacts) {
                  if (entry.contacts[i].email && entry.contacts[i].email !== '') {
                    const obj = { name: entry.name, mail: entry.contacts[i].email, contact: entry.contacts[i].name, domain: entry.domain}
                    mailList.push(obj)
                  }
                }
              }
            }))
            .then(() => {
              return mailList
            })
            .catch((err) => {
              console.log(`Erro! ${err}`)
            })
        }
      })
      .catch((err) => {
        console.log('Could not get customer list.\n', err.message)
      })
  }
}