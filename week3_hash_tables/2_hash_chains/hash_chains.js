/* eslint-disable consistent-return */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');


class HashMap {
  constructor(size, multiplier, prime) {
    this.map = new Array(size);
    this.multiplier = multiplier;
    this.prime = prime;
    this.size = size;
  }

  // eslint-disable-next-line class-methods-use-this
  cash(str) {
    let res = 0;
    const len = str.length;

    for (let i = len; i--;) {
      res = (res * this.multiplier + str[i].charCodeAt(0)) % this.prime;
    }
    return res % this.size;
  }

  add(val) {
    const hash = this.cash(val);
    if (!this.map[`${hash}`]) {
      this.map[`${hash}`] = [];
    }
    this.map[`${hash}`].unshift([hash, val]);
  }

  del(val) {
    const hash = this.cash(val);

    if (this.map[`${hash}`]) {
      let index = null;
      for (let i = 0; i < this.map[`${hash}`].length; i += 1) {
        const [key, v] = this.map[`${hash}`][i];
        if (v === val) {
          index = i;
        }
      }
      this.map[`${hash}`].splice(index, 1);
    }
  }

  find(val) {
    const hash = this.cash(val);
    let x = false;
    if (this.map[`${hash}`]) {
      for (let i = 0; i < this.map[`${hash}`].length; i += 1) {
        const [key, v] = this.map[`${hash}`][i];
        if (v === val) {
          x = true;
        }
      }
      return this.map[`${hash}`] ? (x ? 'yes' : 'no') : 'no';
    }
    return 'no'
  }

  check(hash) {
    if (this.map[`${hash}`]) {
      const res = [];
      for (let i = 0; i < this.map[`${hash}`].length; i += 1) {
        const [key, v] = this.map[`${hash}`][i];
        res.push(v);
      }
      return res.join(' ');
    }
    return ' ';
  }
}

const handleQueries = (lines) => {
  const map = new HashMap(5, 263, 1000000007);

  for (let i = 0; i < lines.length; i += 1) {
    const [cmd, str] = lines[i].split(' ');
    const r = map[cmd](str);
    if (r) {
      console.log(r);
    }
  }
};

rl.once('line', (line) => {
  const nOutput = Number(line);
  const queries = [];
  rl.once('line', (input) => {
    const nInput = Number(input);
    rl.on('line', (args) => {
      queries.push(args.toString());

      if (queries.length === nInput) {
        handleQueries(queries, nOutput);
        process.exit();
      }
    });
  });
});
