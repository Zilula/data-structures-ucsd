/* eslint-disable consistent-return */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

const prime = 1000000007;
const multiplier = 263;

class HashMap {
  constructor(size = 0) {
    this.map = new Array(size);
  }

  // eslint-disable-next-line class-methods-use-this
  cash(str) {
    let total = 0;
    for (let i = 0; i < str.length; i += 1) {
      total += (total + multiplier + str.charAt(i)) % prime;
    }
    return total;
  }

  add(val) {
    const hash = this.cash(val);

    if (!this.map[`${hash}`]) {
      this.map[`${hash}`] = [];
    }
    this.map[`${hash}`].push([hash, val]);
  }

  del(val) {
    const hash = this.cash(val);

    delete this.map[`${hash}`];
  }

  find(val) {
    const hash = this.cash(val);
    return this.map[`${hash}`] ? 'yes' : 'no';
  }

  check(val) {
    const hash = this.cash(val);
    if (this.map[`${hash}`]) {
      const res = [];
      for (let i = 0; i < this.map[`${hash}`].length; i += 1) {
        const [key, v] = this.map[`${hash}`][i];
        res.push(v);
      }
      return res;
    }
    return ' ';
  }
}

const handleQueries = (lines) => {
  const map = new HashMap(lines.length);

  for (let i = 0; i < lines.length; i += 1) {
    const [cmd, number] = lines[i].split(' ');
    const r = map[cmd](number);
    if (r) {
      console.log(r);
    }
  }
};


rl.on('line', () => {
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
});
