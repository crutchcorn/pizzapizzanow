import { promises as fs } from 'fs';
import path from 'path';
import { createServer } from 'https';
import { WebSocketServer } from 'ws';

const cert = await fs.readFile(path.join(import.meta.dirname, "../localhost.pem"), 'utf-8');
const key = await fs.readFile(path.join(import.meta.dirname, "../localhost-key.pem"), 'utf-8');

const server = createServer({
  cert: cert,
  key: key
});

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});

server.listen(8080);

server.on('error', console.error);
