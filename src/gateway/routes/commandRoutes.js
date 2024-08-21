const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const router = express.Router();

const COMMAND_HOST = process.env.COMMAND_HOST;
const COMMAND_PORT = process.env.COMMAND_PORT;

// Command service proxy
const commandServiceProxy = createProxyMiddleware({
  target: `http://${COMMAND_HOST}:${COMMAND_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    "^/command": "/", // strip "/command" from the path when forwarding to the command service
  },
});

// Route requests to the command service
router.use("/", commandServiceProxy);

module.exports = router;
