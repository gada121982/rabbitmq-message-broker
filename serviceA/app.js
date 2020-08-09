const amqp = require('amqplib/callback_api')
const QUEUE = 'test'

amqp.connect('amqp://localhost', (error, connection) => {
  if (error) throw error

  connection.createChannel((errorChanel, chanel) => {
    if (errorChanel) throw errorChanel
    chanel.assertQueue(QUEUE)

    // send message to queue
    setInterval(() => {
      chanel.sendToQueue(QUEUE, Buffer.from('hello world' + Date.now()))
      console.log('Message was sent ...')
    }, 2000)
  })
})