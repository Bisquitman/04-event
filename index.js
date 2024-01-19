import { EventEmitter } from 'node:events';

class Timer extends EventEmitter {
  constructor({ name, age }) {
    super();
    this.name = name;
    this.age = age;
  }

  sleep(ms) {
    const emit = this.emit;
    this.emit = () => {};
    setTimeout(() => {
      this.emit = emit;
    }, ms);
  }

  emit(name, ...args) {
    super.emit(name, args);
    // console.log('logger', name, ...args);
  }
}

const timer = new Timer({ name: 'Marv', age: 33 });

timer.on('tick', x => {
  for (let i = 1; i <= x; i++) {
    console.log('Tick -', i);
  }
});

timer.emit('tick', 8);
