const express = require("express");
const commandRoutes = require("./routes/commandRoutes");
const queryRoutes = require("./routes/queryRoutes");

const app = express();

// Use the routes
app.use("/command", commandRoutes);
app.use("/query", queryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
