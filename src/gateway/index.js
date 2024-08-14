const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Command service proxy
const commandServiceProxy = createProxyMiddleware({
  target: "http://command-service:3000",
  changeOrigin: true,
  pathRewrite: {
    "^/command": "/", // strip "/command" from the path when forwarding to the command service
  },
});

// Query service proxy
const queryServiceProxy = createProxyMiddleware({
  target: "http://query-service:3000",
  changeOrigin: true,
  pathRewrite: {
    "^/query": "/", // strip "/query" from the path when forwarding to the query service
  },
});

// Route requests to the appropriate service based on the URL path
app.use("/command", commandServiceProxy);
app.use("/query", queryServiceProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
