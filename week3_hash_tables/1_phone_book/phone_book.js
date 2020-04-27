/* eslint-disable consistent-return */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

class HashMap {
  constructor() {
    this.map = {};
  }

  add(num, name) {
    this.map[num] = { num, name };
  }

  del(num) {
    delete this.map[`${num}`];
  }

  find(num) {
    if (this.map[`${num}`]) {
      return this.map[`${num}`].name;
    }
    return 'not found';
  }
}

const handleQueries = (lines) => {
  const map = new HashMap();

  for (let i = 0; i < lines.length; i += 1) {
    const [cmd, number, name] = lines[i].split(' ');

    const r = map[cmd](number, name);
    if (r) {
      console.log(r);
    }
  }
};


rl.on('line', (line) => {
  const n = Number(line);
  const queries = [];

  rl.on('line', (args) => {
    queries.push(args.toString());

    if (queries.length === n) {
      handleQueries(queries);
      process.exit();
    }
  });
});
