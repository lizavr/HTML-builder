const { stdin, stdout } = process;
const path = require('path');
const fs = require('fs');
const way = path.join(__dirname, 'text.txt');

fs.writeFile(way, '', (err) => {
  if (err) throw err;
});
stdout.write('please, enter your text\n');
stdin.on('data', (data) => {
  if (data.toString().slice(0,-2) !== 'exit') {
    const a = data.toString();
    fs.appendFile(way, a, (err) => {
      if (err) throw err;
    });
  } else {
    process.exit();
  }
});
process.on('exit', () => {
  stdout.write(`buy`);
});
