const path = require('path');
const fs = require('fs');
const copyFrom = path.join(__dirname, 'files');
const copyTo = path.join(__dirname, 'files-copy');

const copyFiles = (copyTo) => {
  fs.rm(copyTo, { recursive: true }, () => {
    copyDirectory(copyFrom, copyTo);
  });
};

const copyDirectory = (copyFrom, copyTo) => {
  fs.mkdir(copyTo, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(copyFrom, (err, files) => {
    files.forEach((file) => {
      if (err) {
        console.error(err);
      }
      fs.stat(path.join(copyFrom, file), (err, stats) => {
        if (err) {
          console.log(err);
        }
        if (stats.isDirectory()) {
          copyDirectory(path.join(copyFrom, file), path.join(copyTo, file));
          return;
        }
        fs.copyFile(
          path.join(copyFrom, file),
          path.join(copyTo, file),
          (err, stats) => {
            if (err) {
              console.log(err);
            }
          }
        );
      });
    });
  });
};
copyFiles(copyTo);
