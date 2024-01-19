import { EventEmitter } from 'node:events';

class Chat extends EventEmitter {
  constructor() {
    super();
    this.receiveMessage();
  }

  sendMessage(username, message) {
    this.emit('message', {
      username: username,
      message: message,
    });
  }

  receiveMessage() {
    this.addListener('message', data => {
      console.log(`${data.username}: ${data.message}`);
    });
  }
}

const chat = new Chat();

chat.sendMessage('Chatlanin', 'Hello, World!');
chat.sendMessage('Chatlanin', 'Hello, World!');
chat.sendMessage('Chatlanin', 'Hello, World!');
chat.sendMessage('Chatlanin', 'Hello, World!');
