var addDraggableWords = function addDraggableWords( 
  dropzoneElement, sourceDictionary = wordReference ) {
  
  var adjectives = createManyWords( 
    "adjective", Math.floor(Math.random()*5) +1, sourceDictionary);
  var nouns = createManyWords( 
    "noun", Math.floor(Math.random()*5) +1, sourceDictionary );
  var adverbs = createManyWords( 
    "adverb", Math.floor(Math.random()*5) + 1, sourceDictionary);
  var verbs = createManyWords( 
    "verb", Math.floor(Math.random()*5)+1, sourceDictionary);
  var nounplural = createManyWords( 
    "nounplural", Math.floor(Math.random()*2)+1, sourceDictionary);

  adjectives.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  nouns.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  adverbs.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  verbs.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
  nounplural.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
};

/**
  return list of DIV-ed up words
*/
var createManyWords = function createManyWords( 
  wordType, numWords, sourceDictionary
  ) {
  var wordList = [];
  for (var i = 0; i < numWords; i++) {
    wordList.push( createDraggableWord( wordType, sourceDictionary ) );
  }
  return wordList;
};

var createDraggableWord = function createDraggableWord( 
  wordType, sourceDictionary ) {
  // word types: noun, adjective
  let wordList = Object.keys(sourceDictionary[wordType]);
  var randomWordText = wordList[
    Math.floor(Math.random()*wordList.length)
  ];
  var wordScore = sourceDictionary[wordType][randomWordText];
  var draggableWord = document.createElement('DIV');
  draggableWord.classList.add("draggable", wordType);
  draggableWord.setAttribute("score", wordScore);
  draggableWord.textContent = randomWordText;
  return draggableWord;
};

export { addDraggableWords };
