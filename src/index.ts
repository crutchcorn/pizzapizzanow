import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import { WebSocketServer } from 'ws';
import {Server, createServer} from "node:https";

let server: Server;
const certPath = path.join(import.meta.dirname, "../localhost.pem")
const keyPath = path.join(import.meta.dirname, "../localhost-key.pem")
if (
  existsSync(certPath) && existsSync(keyPath)
) {
  const cert = await fs.readFile(certPath, 'utf-8');
  const key = await fs.readFile(keyPath, 'utf-8');
  server = createServer({
    cert: cert,
    key: key
  });
} else {
  server = createServer();
}

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
