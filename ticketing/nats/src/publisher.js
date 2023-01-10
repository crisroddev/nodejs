const nats = require('node-nats-streaming');

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '12223',
        title: 'Concert',
        price: 20
    });

    stan.publish('ticket:created', data, () => {
        console.log('event Published');
    });
});