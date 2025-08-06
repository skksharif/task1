const { fork } = require('child_process');
const NUM_WORKERS = 4;

// Fork multiple worker processes
for (let i = 0; i < NUM_WORKERS; i++) {
  fork(__dirname + '/worker.js');
}
