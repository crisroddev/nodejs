const amqp = require('amqplib');

const msg = {number: 10000}

var channel, connection;

async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
        console.log(`Jobs sent ${msg.number}`);
        await channel.close();
        await connection.close();

    } catch(err) {
        console.log(err)
    }
}
connect();