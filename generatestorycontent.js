// <h2>Article title</h2>
// <p>It was a <span class="dropzone adjective" score=1>dark</span> 
// and <span class="dropzone adjective" score=2>stormy</span> night. 
// The <span class="dropzone nounplural" score=2>windows</span> 
// rattled <span class="dropzone adverb" score=2>loudly.</span> 
// I feared for my very <span class="dropzone noun" score="1">life</span>. 
// The storm was <span class="dropzone adverb" score="4">incredibly</span> 
// <span class="dropzone adjective" score="2">noisy</span>.
// </p>

/**
 * @return HTMLElement that can be inserted in the game area
 */
var generateProse = function generateProse( proseName ) {
  var text = storiesData[proseName].text;
  var listOfRequirements = Object.keys(storiesData[proseName].requirements);
  var wordsForMeetingReqs = {
    adjective: [],
    noun: [],
    pluralnoun: [],
    adverb: []
  };

  listOfRequirements.forEach( function (requirementName) {
    var countWordTypeNeeded = storiesData[proseName].requirements[requirementName];
      wordsForMeetingReqs[requirementName] = 
        createManyStoryWords(requirementName, countWordTypeNeeded);
  });

  while (wordsForMeetingReqs.adjective.length) {
    var nextAdj = wordsForMeetingReqs.adjective.pop();
    text.replace('<adjective>', nextAdj);
  }
  while (wordsForMeetingReqs.noun.length) {
    var nextAdj = wordsForMeetingReqs.noun.pop();
    text.replace('<noun>', nextAdj);
  }
  while (wordsForMeetingReqs.pluralnoun.length) {
    var nextAdj = wordsForMeetingReqs.pluralnoun.pop();
    text.replace('<pluralnoun>', nextAdj);
  }
  while (wordsForMeetingReqs.adverb.length) {
    var nextAdj = wordsForMeetingReqs.adverb.pop();
    text.replace('<adverb>', nextAdj);
  }
}

/**
 * Create a span that has classes, for dropzones in prose
 * @param  {string}
 * @return {HTMLElement}
 */
var createStoryWord = function createDraggableWord( wordType ) {
  // word types: noun, adjective
  let wordList = Object.keys(storyWordReference[wordType]);
  var randomWordText = wordList[
    Math.floor(Math.random()*wordList.length)
  ];
  var wordScore = storyWordReference[wordType][randomWordText];
  var draggableWord = document.createElement('DIV');
  draggableWord.classList.add("draggable", wordType);
  draggableWord.setAttribute("score", wordScore);
  draggableWord.textContent = randomWordText;
  return draggableWord;
}

var createManyStoryWords = function createManyWords( wordType, numWords ) {
  var wordList = [];
  for (var i = 0; i < numWords; i++) {
    wordList.push( createStoryWord( wordType ) );
  }
  return wordList;
}

var storyWordReference = {
  adjective: {
    "dark": 1,
    "stormy": 2,
    "serious": 3,
    "intense": 2,
    "tired": 2
  },
  noun: {
    "night": 1,
    "storm": 1,
    "thunder": 2
  },
  pluralnoun: {
    "windows": 2
  },
  adverb: {
    "incredibly": 4,
    "loudly": 2
  }
};

var storiesData = {
  darkAndStormy: {
    title: "A Dark and Stormy Night",
    author: "Some rando",
    text: "It was a <adjective> and <adjective> night. The <nounplural>"+
    "rattled <adverb>. I feared for my very <noun>. The <noun> was " +
    "<adverb> <adjective>.",
    requirements: {
      adjective: 3,
      pluralnoun: 1,
      noun: 2,
      adverb: 2
    }
  }
}
