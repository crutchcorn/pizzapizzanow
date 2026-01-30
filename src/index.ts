import { WebSocketServer } from 'ws';
import {createServer} from "node:http";

const server = createServer();

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

server.listen(process.env.PORT || 8080);

server.on('error', console.error);
