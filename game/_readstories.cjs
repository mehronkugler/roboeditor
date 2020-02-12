var path = require('path');
var fs = require('fs');

var readStoriesFiles = function readStoriesFiles() {
  var directoryPath = path.join(__dirname, 'stories');
  var storiesData = [];

  console.time("Read story files");

  var files = fs.readdirSync(directoryPath, 'utf8');
  files.forEach(function (file) {
    var obj = JSON.parse(fs.readFileSync(path.join(directoryPath, file), 'utf8'));
    storiesData.push(obj);
    console.log("Loaded story: " + obj.title);
  });
  console.timeEnd("Read story files");

  return storiesData;

};

module.exports = readStoriesFiles;
