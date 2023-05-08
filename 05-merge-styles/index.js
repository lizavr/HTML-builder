const path = require('path');
const fs = require('fs');
const folder = 'styles';
const wayBundle = path.join(__dirname, 'project-dist', 'bundle.css');

const addStyles = (arr) => {
  fs.appendFile(wayBundle, arr.toString(), (err) => {
    if (err) throw err;
  });
};

fs.writeFile(wayBundle, '', (err) => {
  if (err) throw err;
});

fs.readdir(path.join(__dirname, folder), (err, files) => {
  files.forEach((file) => {
    if (err) {
      console.error(err);
    }
    const arr = path.basename(file, '').split('.');
    if (arr[1] === 'css') {
      const readStream = fs.createReadStream(
        path.join(__dirname, folder, file),
        'utf-8'
      );
      const arr = [];
      readStream.on('data', (chunk) => arr.push(chunk));
      readStream.on('end', () => addStyles(arr));
    }
  });
});
