if ('serviceWorker' in navigator) {
  window.addEventListener('load', registerServiceWorker);
  navigator.serviceWorker.addEventListener('message', event => {
    showNotifiaction(event.data);
  });
}

async function registerServiceWorker() {
  try {
    await navigator.serviceWorker.register('/sw.js');
    requestNotifiactionPermission();
  } catch (error) {
    console.log(`ServiceWorker registration failed: ${error}`);
  }
}

async function requestNotifiactionPermission() {
  if ('Notification' in window && window.Notification.permission != 'granted') {
    await Notification.requestPermission();
  }
}

async function showNotifiaction(text, options = { title: 'Title', livetime: 3000 }) {
  const notificationIsAvailable = 'Notification' in window && window.Notification.permission == 'granted';
  if (!notificationIsAvailable) {
    return;
  }
  const { title, livetime } = options;
  const notification = new Notification(title, {
    body: text,
    tag: 'soManyNotification',
  });
  notification.onclick = () => {
    parent.focus();
    window.focus();
    this.close();
  };
  setTimeout(notification.close.bind(notification), livetime);
}
