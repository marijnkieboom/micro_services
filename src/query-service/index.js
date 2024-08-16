const app = require("./app");
const eventSubscriber = require("./utils/eventSubscriber");

const PORT = process.env.PORT || 3000;

eventSubscriber.init(); // Initialize the event subscriber

app.listen(PORT, () => {
  console.log(`Query service running on port ${PORT}`);
});
