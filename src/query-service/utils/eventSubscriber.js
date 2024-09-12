const amqp = require("amqplib");
const userEventHandlers = require("../handlers/userEventHandlers");

let connection;
let channel;
const exchange = "commands"; // Exchange name

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

      await channel.assertExchange(exchange, "fanout", { durable: true });
    } catch (error) {
      console.error("Error connecting to RabbitMQ:", error);
    }
  }
}

// Subscribe to events with a specific routing key pattern
async function subscribe() {
  if (!channel) {
    await connect();
  }

  try {
    // Create a temporary queue for this subscriber
    const q = await channel.assertQueue("", { exclusive: true });

    // Bind the queue to the exchange with the routing key pattern
    await channel.bindQueue(q.queue, exchange, "");

    // Consume messages from the queue
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.content) {
          const event = JSON.parse(msg.content.toString());
          try {
            userEventHandlers.handleEvent(event); // Process the message using event type
            channel.ack(msg);
          } catch (error) {
            console.error("Error processing message:", error);
          }
        }
      },
      {
        noAck: false, // Ensure manual acknowledgment is enabled
      }
    );
  } catch (error) {
    console.error("Error subscribing to exchange:", error);
  }
}

// Link handlers to subscribers
async function init() {
  await connect();

  // Subscribe to all events broadcasted by the fanout exchange
  await subscribe();

  console.log("Event subscriber initialized and waiting for events...");
}

module.exports = { init };
