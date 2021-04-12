const MAX_NUMBER_OF_RETRIES = 15;
const TIMEOUT = 5000;

self.addEventListener('install', event => {
  console.log('Installed');
});

self.addEventListener('activate', function(event) {
  console.log('Activated');
});

let socket;
let connRetriesCount = 0;

function createSocket() {
  socket = new WebSocket('ws://localhost:8080');

  socket.onopen = () => {
    console.debug('Socket created');
    socket.send('Hello');
  };

  socket.onclose = () => {
    console.debug('Socket closed');
    createSocketAgain();
  };

  socket.onmessage = event => {
    const message = getMessageText(event.data);
    if (!message) {
      return;
    }
    postMessage(message);
  };
}

function getMessageText(message) {
  let data;
  try {
    data = JSON.parse(message);
  } catch {
    console.log('Invalid message');
    return;
  }
  if (data.type === 'message') {
    return data.text;
  }
}

function postMessage(message) {
  self.clients.matchAll().then(clients => {
    if (!clients.length) {
      return;
    }
    const client = clients[0];
    client.postMessage(message);
  });
}

function createSocketAgain() {
  if (!socket || socket.readyState === WebSocket.CLOSED) {
    if (connRetriesCount === MAX_NUMBER_OF_RETRIES) {
      console.debug('Server is dead :(');
      return;
    }
    setTimeout(createSocket, TIMEOUT);
    connRetriesCount += 1;
  }
}

createSocket();
