// <h2>Article title</h2>
// <p>It was a <span class="dropzone adjective" score=1>dark</span> 
// and <span class="dropzone adjective" score=2>stormy</span> night. 
// The <span class="dropzone nounplural" score=2>windows</span> 
// rattled <span class="dropzone adverb" score=2>loudly.</span> 
// I feared for my very <span class="dropzone noun" score="1">life</span>. 
// The storm was <span class="dropzone adverb" score="4">incredibly</span> 
// <span class="dropzone adjective" score="2">noisy</span>.
// </p>

var getStoryTitle = function getStoryTitle( proseName ) {
  return storiesData[proseName].title;
};

/**
 * @return HTMLElement that can be inserted in the game area
 */
var generateProse = function generateProse( proseName ) {
  var text = storiesData[proseName].text;
  var listOfRequirements = Object.keys(storiesData[proseName].requirements);
  var wordsForMeetingReqs = {
    adjective: [],
    noun: [],
    nounplural: [],
    adverb: []
  };

  listOfRequirements.forEach( function (requirementName) {
    var countWordTypeNeeded = storiesData[proseName].requirements[requirementName];
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

var storiesData = {
  darkAndStormy: {
    title: "A Dark and Stormy Night",
    author: "Some rando",
    text: "It was a <adjective> and <adjective> night. The rain <verb> "+
    "<adverb>, except when it was checked by a <adjective> gust of <noun>. I feared for my very life. The <noun> was " +
    "<adverb> <adjective>. It <verb> along the housetops, <adverb> " +
    "agitating the <adjective> flame of the lamps that <verb> in the darkness.",
    requirements: {
      adjective: 5,
      nounplural: 0,
      noun: 2,
      adverb: 3,
      verb: 3
    }
  },
  taleOfTooBorings: {
    title: "A Tale of Too Borings",
    author: "Lord Rando",
    text: ""+
    "It was the <span class=\"dropzone adjective\" score=\"1\">best</span> "+
    "of times, it was the <span class=\"dropzone adjective\" score=\"1\">worst</span>"+
    "of times, it was the <noun> of <span class=\"dropzone noun\" score=\"2\">wisdom</span>, "+
    "it was the age of <span class=\"dropzone noun\" score=\"3\">foolishness</span>, "+
    "it was the <noun> of <span class=\"dropzone noun\" score=\"1\">belief</span>, "+
    "it was the epoch of <span class=\"dropzone noun\" score=\"1\">incredulity</span>, "+
    "it was the season of <span class=\"dropzone noun\" score=\"1\">Light</span>, "+
    "it was the <noun> of <span class=\"dropzone noun\" score=\"1\">Darkness</span>, "+
    "it was the spring of <noun>, it was the winter of <noun>, it was "+
    "<span class=\"dropzone adverb\" score=\"1\">so</span> <adverb> boring.",
    requirements: {
      adjective: 0,
      nounplural: 0,
      noun: 5,
      adverb: 2,
      verb: 0
    }
  },
  travelBlog1: {
    title: "Travel Blog Entry: SomewhereIsStan",
    author: "Chad The Rad Travelin' Dad",
    text: "" +
"Picture this: <span class=\"dropzone adjective\" score=\"3\">amazing</span> mountains for miles, "+
"<span class=\"dropzone adjective\" score=\"2\">fragrant</span> <span class=\"dropzone nounplural\" score=\"3\">wildflowers</span> on the air, "+
"a <span class=\"dropzone adjective\" score=\"1\">warm</span> breeze, and <adjective> cottages ranging as far as the eye can see."+
"<br><br>"+
"I <span class=\"dropzone adverb\" score=\"3\">hesitantly</span>decided to go to SomewhereIsStan after a <adjective> friend "+
"came up and <span class=\"dropzone verb\" score=\"3\">slapped</span> me in the face. "+
"At first I was <adverb> hesitant, but I decided I <adverb> needed to search my "+
"<span class=\"dropzone nounplural\" score=\"2\">feelings</span> and "+
"check my <span class=\"dropzone nounplural\" score=\"1\">doubts</span>."+
"<br><br>"+
"After checking in with the <span class=\"dropzone nounplural\" score=\"3\">universe</span> "+
"I <span class=\"dropzone verb\" score=\"2\">glamped</span> through the "+
"<span class=\"dropzone adjective\" score=\"2\">slushy</span> "+
"highlands of SomewhereIsStan, free as a <span class=\"dropzone noun\" score=\"1\">wage</span> "+
"<span class=\"dropzone noun\" score=\"1\">slave</span>.",
    requirements: {
      adjective: 6,
      nounplural: 3,
      noun: 0,
      adverb: 2,
      verb: 1
    }
  }
};


export { generateProse, getStoryTitle };
