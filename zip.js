let fs = require('fs');
let archiver = require('archiver');

let output = fs.createWriteStream('output.zip');

let archive = archiver('zip');

const getFiles = dir => {
    let directory = fs.readdirSync(dir);

    directory.forEach(file => {

    	let filePath = dir + '/' + file;

    	let stats = fs.statSync(filePath);

        if (stats.isFile()) {

            archive.file(filePath, { name: file });
        } else {

            getFiles(filePath);
        }
    });
}


getFiles('./directory');

archive.pipe(output);

archive.finalize();

console.log('Zip named output.zip has been created!');
