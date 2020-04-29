const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  terminal: false,
});

process.stdin.setEncoding('utf8');

class Queue {
  constructor() {
    this.list = [];
    this.time = 0;
  }

  // Adds items to the end of the queue
  push(ele) {
    return this.list.push(ele);
  }

  // Removes first item in queue
  shift(t) {
    const packet = this.list.shift();
    this.time = t + packet.processingTime;
  }

  // Simply returns the queue
  print() {
    return this.list;
  }
}


const processPackets = (packetData, bufferSize) => {
  const Q = new Queue();

  for (let i = 0; i < packetData.length; i += 1) {
    const packet = packetData[i];

    // If the processing time is 0 it can be instantly removed
    // from the queue because it requires no time/effort/thread/worker etc...
    if (Q.list.length === bufferSize) {
    // Check if the queue is at max capacity
      console.log(-1);
    } else {
    // Push item to the queue
      Q.push(packet);
    }
  }

  // While there are items in the queue,
  // continue to process the first element of the queue
  while (Q.list.length !== 0) {
    console.log(Q.time === 0 ? packetData[0].arrivalTime : Q.time);
    Q.shift(Q.time === 0 ? packetData[0].arrivalTime : Q.time);
  }
};

rl.once('line', (line) => {
  const [bufferSize, packets] = line.split(' ');

  // Accounts for 0 packets
  if (Number(packets) === 0) {
    process.exit();
  }

  const tank = [];


  rl.on('line', (l) => {
    const [arrivalTime, processingTime] = l.split(' ');
    tank.push({ arrivalTime: Number(arrivalTime), processingTime: Number(processingTime) });
    if (tank.length === Number(packets)) {
      processPackets(tank, Number(bufferSize), Number(packets));
      process.exit();
    }
  });
});


module.exports = Queue;
