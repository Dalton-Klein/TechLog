const express = require('express');
const router = require('./router');
require('dotenv').config();

//Config
const app = express();
const PORT = process.env.PORT || 3002;
const HOST = process.env.HOST || `A different host`;

//Middleware
app.use(
  express.json(),
  router
);

//Start server
app.listen(PORT, ()=> {
  console.log(`Server running on ${HOST}:${PORT} 🚀🚀🚀`);
});