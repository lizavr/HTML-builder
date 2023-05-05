const path = require('path');
const fs = require('fs');

const way = path.join(__dirname, 'text.txt');

const readSteam = fs.createReadStream(way, 'utf-8');
let data = '';
readSteam.on('data', (chunk) => (data += chunk));
readSteam.on('end', () => console.log(data));
readSteam.on('error', (error) => console.log('Error', error.message));