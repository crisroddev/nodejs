const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (connError, connection) => {
    if(connError) {
        throw connError;
    }
    // Create Channel
    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }
        // Check Queue
        const QUEUE = 'codingtest';
        channel.assertQueue(QUEUE);
        // Recieve Messages
        channel.consume(QUEUE, (message) => {
            console.log(`Message recieved ${message.content}`);
        })
    });
});