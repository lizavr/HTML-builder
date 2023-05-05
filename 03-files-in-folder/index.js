const path = require('path');
const fs = require('fs');
const folder = 'secret-folder';

fs.readdir(path.join(__dirname, folder), (err, files) => {
  files.forEach((file) => {
    if (err) {
      console.error(err);
    }
    fs.stat(path.join(__dirname, folder, file), (err, stats) => {
      if (err) {
        console.log(err);
      }
      if (stats.isDirectory()) {
        return;
      }
      const arr = path.basename(file, '').split('.');
      console.log(`${arr[0]} - ${arr[1]} - ${stats.size / 1024} kb`);
    });
  });
});
