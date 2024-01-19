import { EventEmitter } from 'node:events';

class User extends EventEmitter {
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
    console.log('logger', name, ...args);
  }
}

const user = new User({ name: 'Marv', age: 33 });

user.on('foo', x => {
  console.log('on foo', x);
});

user.on('bar', x => {
  for (let i = 1; i <= x; i++) {
    console.log('on bar', i);
  }
});

user.emit('bar', 8);
user.emit('foo', { b: 2 });

user.sleep(1000);

setTimeout(() => {
  user.emit('bar', { c: 3 });
  user.emit('foo', { d: 4 });
}, 500);

setTimeout(() => {
  user.emit('bar', { e: 5 });
  user.emit('foo', { f: 6 });
}, 1500);

// ee.setMaxListeners(1);

// const logger = (...args) => {
//   console.log('logger: ', args);
// };
// on = addListener
// off = removeListener

//ee.removeAllListeners('foo'); // Удаляет ВСЕ слушатели foo
//ee.off('foo', logger); // Удаляет только foo для logger

// ee.emit('error', new Error('Ошибка'));
