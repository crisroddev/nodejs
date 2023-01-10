class Listener extends Event {
  constructor(client) {
      this.client = client;
  }

  subscriptionOptions() {
      return this.client
          .subscriptionOptions()
          .setDeliverAllAvailable()
          .setManualAckMode(true)
          .setAckWait(5 * 1000)
          .setDurableName()
  }

  listen() {
      const subscription = this.client.subscribe(
          this.subject,
          this.queueGroupName,
          this.subscriptionOptions()
      );

      subscription.on('message', (msg) => {
          console.log(
              `Message Recieved ${this.subject} / ${this.queueGroupName}`
          );
          const parsedData = this.parseMessage(msg);
          this.onMessage(parsedData, msg);
      });
  }
  parseMessage(msg) {
      const data = msg.getData();
      return typeof data === 'string'
          ? JSON.parse(data)
          : JSON.parse(data.toString('utf8'));
  }
}

module.exports = Listener;