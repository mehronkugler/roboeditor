const express = require('express');
const game = express();
const path = require('path');
const port = 3000;

const readPlayerCharacters = require('./game/_readplayercharacters.cjs');
const readStoriesFiles = require('./game/_readstories.cjs');

express.static.mime.define({'application/javascript': ['js']});

game.use('/css', express.static('css'));
game.use('/fonts', express.static('fonts'));
game.use('/img', express.static('img'));
game.use('/audio', express.static('audio'));
game.use('/lib', express.static('lib'));
game.use('/html', express.static('html'));
game.use('/game', express.static('game'));

game.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/html/index.html'));
});

game.get('/api/characters', function(req, res) {
  var playerCharacters = readPlayerCharacters();
  res.json(playerCharacters);
});

game.get('/api/stories', function(req, res) {
  var stories = readStoriesFiles();
  res.json(stories);
});


game.listen(port, () => console.log(`Robo Editor game listening on port ${port}!`));
