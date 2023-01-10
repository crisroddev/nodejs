const nats = require('node-nats-streaming');
const { randomBytes } = require('crypto');
const TicketCreatedListener = require('./events/ticket-created-listener');

console.clear();

const randomString = randomBytes(4).toString('hex');

const client = nats.connect('ticketing', randomString, {
    url: 'http://localhost:4222'
});

client.on('connect', () => {
    console.log('Listener connected to NATS');

    client.on('close', () => {
        console.log('NATS connection close');
        process.exit();
    });

    // const options = client
    //     .subscriptionOptions()
    //     .setAckWait(5*1000)
    //     .setManualAckMode(true)
    //     .setDeliverAllAvailable()
    //     .setDurableName('payments-service');

    // const subscription = client.subscribe(
    //     'ticket:created',
    //     'queue-group-name',
    //     options
    // );

    // subscription.on('message', (msg) => {
    //     const data = msg.getData();

    //     if (typeof data === 'string'){
    //         console.log(`Recieved Event # ${msg.getSequence()}, with data: ${data}`)
    //     }

    //     msg.ack();

    // });
    new TicketCreatedListener(client).listen();
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());