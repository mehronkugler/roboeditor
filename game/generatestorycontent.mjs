// <h2>Article title</h2>
// <p>It was a <span class="dropzone adjective" score=1>dark</span> 
// and <span class="dropzone adjective" score=2>stormy</span> night. 
// The <span class="dropzone nounplural" score=2>windows</span> 
// rattled <span class="dropzone adverb" score=2>loudly.</span> 
// I feared for my very <span class="dropzone noun" score="1">life</span>. 
// The storm was <span class="dropzone adverb" score="4">incredibly</span> 
// <span class="dropzone adjective" score="2">noisy</span>.
// </p>

var generateProseFromJson = function generateProseFromJson( storyJson ) {
  var text = storyJson.text;
  var listOfRequirements = Object.keys(storyJson.requirements);
  var wordsForMeetingReqs = {
    adjective: [],
    noun: [],
    nounplural: [],
    adverb: []
  };

  listOfRequirements.forEach( function (requirementName) {
    var countWordTypeNeeded = storyJson.requirements[requirementName];
      wordsForMeetingReqs[requirementName] = 
        createManyStoryWords(requirementName, countWordTypeNeeded);
  });

  while (wordsForMeetingReqs.adjective.length) {
    var nextAdj = wordsForMeetingReqs.adjective.pop();
    text = text.replace('<adjective>', nextAdj.outerHTML);
  }
  while (wordsForMeetingReqs.noun.length) {
    var nextNoun = wordsForMeetingReqs.noun.pop();
    text = text.replace('<noun>', nextNoun.outerHTML);
  }
  while (wordsForMeetingReqs.nounplural.length) {
    var nextPlNoun = wordsForMeetingReqs.nounplural.pop();
    text = text.replace('<nounplural>', nextPlNoun.outerHTML);
  }
  while (wordsForMeetingReqs.adverb.length) {
    var nextAdverb = wordsForMeetingReqs.adverb.pop();
    text = text.replace('<adverb>', nextAdverb.outerHTML);
  }
  while (wordsForMeetingReqs.verb.length) {
    var nextVerb = wordsForMeetingReqs.verb.pop();
    text = text.replace('<verb>', nextVerb.outerHTML);
  }
  var textElement = document.createElement('DIV');
  textElement.innerHTML = text;

  return textElement;
};

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
  draggableWord.classList.add("dropzone", wordType);
  draggableWord.setAttribute("score", wordScore);
  draggableWord.textContent = randomWordText;
  return draggableWord;
};

var createManyStoryWords = function createManyWords( wordType, numWords ) {
  var wordList = [];
  for (var i = 0; i < numWords; i++) {
    wordList.push( createStoryWord( wordType ) );
  }
  return wordList;
};

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
    "thunder": 2,
    "life": 1,
    "rain": 1,
    "summer": 2,
    "winter": 2,
    "spring": 1,
    "autumn": 2
  },
  nounplural: {
    "windows": 2
  },
  adverb: {
    "incredibly": 4,
    "loudly": 2,
    "really": 2,
    "dangerously": 4
  },
  verb: {
    "fell": 1,
    "bounced": 1,
    "flopped": 1,
    "wiggled": 2,
    "agitated": 4,
    "glamped": 1
  }
};

export { generateProseFromJson };
