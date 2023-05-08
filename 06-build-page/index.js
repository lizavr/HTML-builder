const path = require('path');
const fs = require('fs');
const finalIndex = path.join(__dirname, 'project-dist', 'index.html');
const arrComp = [];
const obj = {};
const folder = 'styles';
const wayStyle = path.join(__dirname, 'project-dist', 'style.css');

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) throw err;
});

fs.writeFile(finalIndex, '', (err) => {
  if (err) throw err;
});

fs.writeFile(wayStyle, '', (err) => {
  if (err) throw err;
});

const readStreamInd = fs.createReadStream(
  path.join(__dirname, 'template.html'),
  'utf-8'
);

let indexHtml = '';
readStreamInd.on('data', (chunk) => (indexHtml += chunk));
readStreamInd.on('end', () => {
  fs.readdir(path.join(__dirname, 'components'), (err, files) => {
    files.forEach((file) => {
      if (err) {
        console.error(err);
      }
      fs.stat(path.join(__dirname, 'components', file), (err, stats) => {
        if (err) {
          console.log(err);
        }
        if (stats.isDirectory()) {
          return;
        }
        const arr = path.basename(file, '').split('.');

        const readStream = fs.createReadStream(
          path.join(__dirname, 'components', file),
          'utf-8'
        );

        let value = '';

        readStream.on('data', (chunk) => {
          value += chunk;
        });

        readStream.on('end', () => {
          arrComp.push(arr[0]);
          obj[arr[0]] = value;
          if (arrComp.length === files.length) {
            arrComp.forEach(
              (item) =>
                (indexHtml = indexHtml.replace(`{{${item}}}`, obj[item]))
            );
            fs.writeFile(finalIndex, indexHtml, (err) => {
              if (err) throw err;
            });
          }
        });
      });
    });
  });
});

const addStyles = (arr) => {
  fs.appendFile(wayStyle, arr.toString(), (err) => {
    if (err) throw err;
  });
};

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

const copyFrom = path.join(__dirname, 'assets');
const copyTo = path.join(__dirname, 'project-dist', 'assets');

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
copyDirectory(copyFrom, copyTo);
