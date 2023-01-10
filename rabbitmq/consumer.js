const amqp = require('amqplib');

const msg = {number: 19}

var channel, connection;

async function connect() {
    try {
        const amqpServer = "amqp://localhost:5672";
        connection = await amqp.connect(amqpServer);
        channel = await connection.createChannel();
        await channel.assertQueue("jobs");

    } catch(err) {
        console.log(err)
    }
}
connect().then(() => {
    channel.consume("jobs", (data) => {
        console.log("Consuming....");
        const input = JSON.parse(data.content.toString());
        channel.ack(data);
        console.log(input)
    });
    console.log("Consuuuumiiing", input.number)
});