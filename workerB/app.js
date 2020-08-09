const amqp = require('amqplib/callback_api')
const QUEUE = 'test'

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) throw error

  connection.createChannel((errorChanel, chanel) => {
    if (errorChanel) throw errorChanel
    chanel.assertQueue(QUEUE)

    // consume message 
    chanel.consume(QUEUE, (message) => {
      console.log('Worker get message', message.content.toString())
    }, {
      noAck: true
    })
  })
})