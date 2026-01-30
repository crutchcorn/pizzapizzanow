import {createServer} from "node:http";
import { WebSocketServer } from 'ws';
import express from "express";

const app = express();
const server = createServer(app);
const port = process.env.PORT || 10000

const wss = new WebSocketServer({ server, path: '/ws' });

// HTTP routes
app.get('/', (req, res) => {
  res.send('Hello over HTTP!')
})

// WebSocket connections
wss.on('connection', (ws) => {
  console.log('WebSocket client connected')

  ws.on('message', (message) => {
    console.log('Received:', message.toString())
    ws.send(`Hello over WebSocket!`)
  })
})

server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
