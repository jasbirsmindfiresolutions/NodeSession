var fs = require('fs');
var archiver = require('archiver');


var output = fs.createWriteStream('output.zip');

var archive = archiver('zip');

archive.directory('directory/', false);

archive.pipe(output);

archive.finalize();