const { createProxyMiddleware } = require("http-proxy-middleware");
const express = require("express");
const router = express.Router();

const QUERY_HOST = process.env.QUERY_HOST;
const QUERY_PORT = process.env.QUERY_PORT;

// Query service proxy
const queryServiceProxy = createProxyMiddleware({
  target: `http://${QUERY_HOST}:${QUERY_PORT}`,
  changeOrigin: true,
  pathRewrite: {
    "^/query": "/", // strip "/query" from the path when forwarding to the query service
  },
});

// Route requests to the query service
router.use("/", queryServiceProxy);

module.exports = router;
