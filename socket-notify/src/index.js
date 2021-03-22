const express = require('express');
const { v4: uuidv4 } = require('uuid');
const http = require('http');
const WebSocket = require('ws');

const NOTIFICATION = 'Some Notification!';
const NOTIFY_TIMEOUT = 10000;
const THIN_OUT_TYMEOUT = 30000;

const app = express();
app.use(express.static('public'));

const server = http.createServer(app);

const wss = new WebSocket.Server({ server, port: 8080 });

wss.on('connection', onNewConnection);

function onNewConnection(ws) {
  ws.id = uuidv4();
  console.log(`New client: ${ws.id}`);

  ws.isAlive = true;
  ws.on('pong', () => (ws.isAlive = true));

  ws.on('message', message => {
    console.log(`Message from ${ws.id}: ${message}`);
  });

  ws.send(JSON.stringify({ type: 'info', text: 'Connected' }));
}

const thinOut = () => {
  wss.clients.forEach(ws => {
    if (!ws.isAlive) {
      ws.terminate();
      return;
    }

    ws.isAlive = false;
    ws.ping(null, false, true);
  });
};

setInterval(thinOut, THIN_OUT_TYMEOUT);

const notify = () => {
  wss.clients.forEach(ws => {
    ws.send(JSON.stringify({ type: 'message', text: NOTIFICATION }));
  });
};

setInterval(notify, NOTIFY_TIMEOUT);

server.listen(8000, () => {
  console.log(`Server started on port ${server.address().port}`);
});
