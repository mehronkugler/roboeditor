var path = require('path');
var fs = require('fs');

var readPlayerCharacters = function readPlayerCharacters() {
  var directoryPath = path.join(__dirname, 'characters');
  var characterData = [];

  console.time("Read character files");

  var files = fs.readdirSync(directoryPath, 'utf8');
  files.forEach(function (file) {
    var obj = JSON.parse(fs.readFileSync(path.join(directoryPath, file), 'utf8'));
    characterData.push(obj);
    console.log("Loaded character: " + obj.name);
  });
  console.timeEnd("Read character files");

  return characterData;

};

module.exports = readPlayerCharacters;
