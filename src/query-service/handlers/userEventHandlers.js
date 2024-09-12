const userModel = require("../models/userModel");

const userEventHandlers = {
  handleUserCreated: async (event) => {
    console.log("Handling user.created event", event);
    const { id, name, email } = event;
    await userModel.createUser(id, name, email);
  },
  handleUserUpdated: async (event) => {
    console.log("Handling user.updated event", event);
    const { id, name, email } = event;
    await userModel.updateUser(id, name, email);
  },
  handleUserDeleted: async (event) => {
    console.log("Handling user.deleted event", event);
    const { id } = event;
    await userModel.deleteUser(id);
  },
};

// Map event types to their corresponding handler functions
const eventHandlerMap = {
  "user.created": userEventHandlers.handleUserCreated,
  "user.updated": userEventHandlers.handleUserUpdated,
  "user.deleted": userEventHandlers.handleUserDeleted,
};

function handleEvent(event) {
  const handler = eventHandlerMap[event.eventType]; // Route to correct handler
  if (handler) {
    handler(event.data); // Pass the event data to the appropriate handler
  } else {
    console.log(`No handler found for event type: ${event.eventType}`);
  }
}

module.exports = { handleEvent };
