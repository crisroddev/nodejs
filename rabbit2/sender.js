const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (connError, connection) => {
    if(connError) {
        throw connError;
    }
    // Create Channel
    connection.createChannel((channelError, channel) => {
        if(channelError){
            throw channelError;
        }
        // Create Queue
        const QUEUE = 'codingtest';
        channel.assertQueue(QUEUE);
        // Send message to queue
        channel.sendToQueue(QUEUE, Buffer.from('hello from coding'));
        console.log(`Message Send ${QUEUE}`)
    });
});