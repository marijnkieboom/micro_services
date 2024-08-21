const amqp = require("amqplib");

class EventPublisher {
  constructor() {
    this.connection = null;
    this.channel = null;
    this.exchange = "commands";
  }

  // Connect to RabbitMQ and create a channel
  async connect() {
    if (!this.connection) {
      const USER = process.env.RABBITMQ_USER;
      const PASSWORD = process.env.RABBITMQ_PASSWORD;
      const HOST = process.env.RABBITMQ_HOST;

      const connectionString = `amqp://${USER}:${PASSWORD}@${HOST}`;

      this.connection = await amqp.connect(connectionString);
      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.exchange, "topic", {
        durable: true,
      });
    }
  }

  // Publish an event to the RabbitMQ exchange
  async publishEvent(routingKey, event) {
    if (!this.channel) {
      await this.connect();
    }
    this.channel.publish(
      this.exchange,
      routingKey,
      Buffer.from(JSON.stringify(event)),
      {
        persistent: true,
      }
    );
  }

  // Close the connection (if needed)
  async close() {
    if (this.connection) {
      await this.channel.close();
      await this.connection.close();
    }
  }
}

module.exports = new EventPublisher();
