const http = require('../services/httpHelper')

module.exports = {
  monitor (token) {
    const config = {
      headers: {
        Authorization: process.env.AUTHORIZATION,
        'x-access-token': token,
      }
    }

    return http.get('/customers/verif-status', config)
      .then((res) => {
        const offlineCustomers = res.data.result.off

        if (!offlineCustomers.length) { return }
        
        return http.get('/customers', config)
          .then((res) => {
            console.log('Request success!')
            const customers = res.data.result
            const bindCustomers = []
            
            customers.map((entry) => {
              offlineCustomers.map((mapEntry) => {
                if (entry.name === mapEntry){
                  bindCustomers.push(entry)
                }
              })
            })
            return bindCustomers
          })
          .then((customers) => {
            const mailList = []
            
            customers.map((entry) => {
              if (!entry.contacts.length) { return }
              for (let i in entry.contacts) {
                if (entry.contacts[i].email && entry.contacts[i].email !== '') {
                  mailList.push({
                    name: entry.name,
                    mail: entry.contacts[i].email,
                    contact: entry.contacts[i].name,
                    domain: entry.domain
                  })
                }
              }
            })

            return mailList
          })
      })
      .catch((err) => {
        console.log('Could not get customer list.\n', err)
      })
  }
}