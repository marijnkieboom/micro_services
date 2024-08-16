const amqp = require("amqplib");
const userEventHandlers = require("../handlers/userEventHandlers");

let connection;
let channel;
const exchange = "commands";

// Connect to RabbitMQ and create a channel
async function connect() {
  if (!connection) {
    const user = process.env.RABBITMQ_USER || "guest";
    const pass = process.env.RABBITMQ_PASSWORD || "guest";
    const host = process.env.RABBITMQ_HOST || "rabbitmq";

    const connectionString = `amqp://${user}:${pass}@${host}`;

    try {
      connection = await amqp.connect(connectionString);
      channel = await connection.createChannel();
      await channel.assertExchange(exchange, "topic", { durable: true });
    } catch (error) {
      console.log(error);
    }
  }
}

// Subscribe to events with a specific routing key pattern
async function subscribe(routingKeyPattern, handleMessage) {
  if (!channel) {
    await connect();
  }

  // Create a temporary queue for this subscriber
  const q = await channel.assertQueue("", { exclusive: true });

  // Bind the queue to the exchange with the routing key pattern
  await channel.bindQueue(q.queue, exchange, routingKeyPattern);

  // Consume messages from the queue
  channel.consume(
    q.queue,
    (msg) => {
      if (msg.content) {
        const event = JSON.parse(msg.content.toString());
        handleMessage(event);
      }
    },
    {
      noAck: true,
    }
  );
}

// Link handlers to subscribers
async function init() {
  await connect();

  await subscribe("user.created", userEventHandlers.handleUserCreated);
  await subscribe("user.updated", userEventHandlers.handleUserUpdated);
  await subscribe("user.deleted", userEventHandlers.handleUserDeleted);

  console.log("Event subscriber initialized and waiting for events...");
}

module.exports = { init };
