var robotVocabularies = {
  "Repair Bot": {
    adjective: {
      "serviceable": 4,
      "scratched": 1,
      "shiny": 2,
      "broken": 2,
      "pristine": 2,
      "leaky": 2,
      "burnt": 1,
    },
    noun: {
      "screwdriver": 3,
      "voltometer": 4,
      "hyperspanner": 4,
      "nailgun": 2,
      "jackhammer": 3,
      "radiator": 4
    },
    adverb: {
      "mostly": 2,
      "repeatedly": 4,
      "instantly": 3,
      "diligently": 4,
      "obediently": 5
    },
    verb: {
      "welded": 2,
      "incinerated": 5,
      "drilled": 2,
      "connected": 3,
      "concentrated": 4,
      "hammered": 3,
      "insulated": 4
    },
    nounplural: {
      "tools": 1,
      "emergencies": 4,
      "requests": 2,
    }
  },
  "Security Bot": {
    adjective: {
      "permitted": 3,
      "rebel": 2,
      "illegal": 3,
      "restricted": 3,
      "armored": 2,
      "hazardous": 3,
      "retinal": 3,
      "friendly": 2
    },
    noun: {
      "identification": 6,
      "badge": 1,
      "jail": 1,
      "ally": 2,
      "prisoner": 3,
      "enforcer": 3,
      "visitor": 3,
    },
    adverb: {
      "suspiciously": 4,
      "honorably": 4,
      "assuredly": 3,
      "boldly": 2,
      "quietly": 3,
    },
    verb: {
      "impounded": 3,
      "authorized": 3,
      "approved": 2,
      "bungled": 2,
      "cleared": 1,
      "appropriated": 5
    },
    nounplural: {
      "cameras": 3,
      "passcards": 2,
      "badges": 2,
      "employees": 3,
      "visitors": 3
    }
  },
  "Profound Bot": {
    adjective: {
      "holistic": 3,
      "conscious": 2,
      "kundalini": 4,
      "woke": 1,
      "communal": 3,
      "twin": 1
    },
    noun: {
      "synergy": 3,
      "nexus": 2,
      "affirmation": 4,
      "oneness": 2,
      "unity": 3,
      "awakening": 4,
      "wound": 1
    },
    adverb: {
      "intentionally": 5,
      "consciously": 3,
      "amazingly": 4,
    },
    verb: {
      "reincarnated": 5,
      "transcended": 3,
      "affirmed": 2,
      "awakened": 3,
      "evolved": 2,
    },
    nounplural: {
      "chakras": 2,
      "intentions": 3,
      "cleansings": 2,
      "truths": 1,
    }
  },
  "Lampshade": {
    adjective: {
      "filthy": 2,
      "raunchy": 2,
      "illicit": 3,
      "nude": 1,
      "exposed": 2,
      "presidential": 4,
      "cyber": 2,
      "unpatriotic": 5
    },
    noun: {
      "papparazi": 4,
      "treaty": 2,
      "election": 3,
      "email": 2,
      "scandal": 1,
      "welfare": 2
    },
    adverb: {
      "bigly": 2,
      "usually": 4,
      "irregularly": 5,
      "uniquely": 3
    },
    verb: {
      "voted": 2,
      "misunderestimated": 7,
      "contamidated": 5,
      "witnessed": 2,
      "claimed": 2,
      "alleged": 3
    },
    nounplural: {
      "binders": 2,
      "hombres": 2,
      "experts": 2,
      "judges": 2,
      "taxpayers": 3
    }
  },
  "Default Bot": {
    // default words
    adjective: {
      "scintillating": 4,
      "dented": 2,
      "valuable": 4,
      "ominous": 3,
      "chipped": 1,
      "fragrant": 2
    },
    noun: {
      "butterfly": 3,
      "clog": 1,
      "sentiment": 3,
      "confusion": 3,
      "forest": 2,
      "cellphone": 2
    },
    adverb: {
      "refreshingly": 4,
      "stupidly": 3,
      "diametrically": 5,
      "really": 2
    },
    verb: {
      "galloped": 2,
      "refuted": 3,
      "agonized": 3,
      "interpolated": 5,
      "magnified": 3,
      "heard": 1,
      "smelled": 1
    }
  },
};
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
  draggableWord.classList.add("dropzone", wordType);
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
"<span class=\"dropzone nouplural\" score=\"2\">feelings</span> and "+
"check my <span class=\"dropzone nouplural\" score=\"1\">doubts</span>."+
"<br><br>"+
"After checking in with the <span class=\"dropzone nouplural\" score=\"3\">universe</span> "+
"I was <span class=\"dropzone verb\" score=\"2\">glamping</span> through the "+
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

// import { getStoryTitle, generateProse } from './generatestorycontent.js';


window.onload = function () {
//   window.console.log("loadedwooo");
//   // GET ALL THE PLAYERS - DRAGGABLE AND DROP ZONES
  var draggable = document.querySelectorAll(".draggable"),
      dropzones = document.querySelectorAll(".dropzone"),
      worddrop   = document.getElementById("worddrop"),
      storyDrop = document.getElementById('storydrop'),
      storyTitleElement = document.querySelector('.fakeeditor > span.title'),
      listOfStories = ['taleOfTooBorings', 'travelBlog1', 'darkAndStormy'],
      playerPoints = 0,
      selectedBot = 1,
      calculateFix = document.getElementById('calculatefix');

  var setPoints = function setPoints( newScore ) {
    playerPoints = newScore;
  };

  var getPoints = function getPoints() {
    return playerPoints;
  };

  var addPoints = function addPoints( pointsToAdd ) {
    setPoints( getPoints() + pointsToAdd);
  };

  var getSelectedBot = function getSelectedBot() {
    return selectedBot;
  };

  var setSelectedBot = function setSelectedBot( pickedBot ) {
    selectedBot = pickedBot;
  }

  var playerProfileImages = {
    1: "img/profile1_lg.png",
    2: "img/profile2_lg.png",
    3: "img/profile3_lg.png",
    4: "img/profile4_lg.png"
  };

  var profileImage = playerProfileImages[String(selectedBot)];

  var botNames = {
    1: "Repair Bot",
    2: "Profound Bot",
    3: "Security Bot",
    4: "Lampshade"
  };

  var updateProfileImage = function updateProfileImage( botNumber ) {
    let profileImage = document.getElementById('playerprofileimage');
    profileImage.setAttribute("src", playerProfileImages[String(botNumber)]);
  };

  var updatePlayerName = function updatePlayerName( botNumber ) {
    let botName = document.getElementById('playerbotname');
    botName.firstChild.nodeValue = botNames[String(botNumber)];
  };

  /**
   * Generate story, add droppables, put on screen
   * @param  {[type]}
   * @return {[type]}
   */
  var generateStoryPageElements = function( currentStoryRef ) {

    var currentStory = generateProse( currentStoryRef );
    var scoreCard = document.querySelector('.scorecard');

    storyDrop.innerHTML = currentStory.innerHTML,
    storyTitleElement.innerText = getStoryTitle( currentStoryRef );

    $( ".draggable" ).draggable({revert: "invalid"});

    $('#wordpick').droppable();

    ["noun", "verb", "adjective", "adverb", "nounplural"].forEach( function (wordType) {
      $( ".dropzone."+wordType ).droppable({
        accept: "."+wordType,
        classes: {
          "ui-droppable-active": "ui-state-highlight"
        },
        drop: function( event, ui ) {
          basicDropCallback( event, ui, this);
        }
      });
    });

  };

  var basicDropCallback = function basicDropCallback( event, ui, dropObject ) {
      dropObject.classList.add( "ui-state-default" );
      ui.draggable.draggable("disable");
      fillInDropWithTarget( ui.draggable, $(dropObject) );
      window.console.log("Dropped a word");
  };

  var fillInDropWithTarget = function fillInDropWithTarget( dragged, dropzone ){
    dropzone.text("");
    dropzone.append(dragged);
    dragged.removeClass(
        "ui-draggable ui-draggable-handle ui-draggable-disabled ui-draggable-dragging"
    );
    dragged.addClass("dropped");
    dragged.attr("style", "");
    
    var oldScore = dropzone.attr("score");
    dragged.attr("oldscore", oldScore);
  };

  var choosePlayerWordSource = function choosePlayerWordSource( selectedBot ) {
    return robotVocabularies[ botNames[ String(selectedBot)] ];
  };

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

  // <div class="draggable adjective">scintillating</div>
  //         <div class="draggable adjective">refreshing</div>
  //         <div class="draggable nounplural">butterflies</div>

  var calculateScore = function calculateScore() {
    var usedWords = document.querySelectorAll('.draggable.dropped');
    var scoreOfExistingWords = 0;
    var scoreOfUsedWords = 0;
    usedWords.forEach( function (wordElement) {
      scoreOfExistingWords += parseInt(wordElement.getAttribute("oldscore"));
      scoreOfUsedWords += parseInt(wordElement.getAttribute("score"));
    });

    return (scoreOfUsedWords - scoreOfExistingWords);
  };

  var wordReference = {
    adjective: {
      "scintillating": 4,
      "refreshing": 3,
      "valuable": 4,
      "ominous": 3,
      "chipped": 1,
      "fragrant": 2
    },
    noun: {
      "butterfly": 3,
      "clog": 1,
      "sentiment": 3,
      "confusion": 3,
      "forest": 2,
      "cellphone": 2
    },
    adverb: {
      "refreshingly": 4,
      "stupidly": 3,
      "diametrically": 5,
      "really": 2
    },
    verb: {
      "galloped": 2,
      "refuted": 3,
      "agonized": 3,
      "interpolated": 5,
      "magnified": 3,
      "heard": 1,
      "smelled": 1
    }
  };

  var createIntro = function createIntro() {
    var introElement = document.createElement('DIV');
    const description = `
      Life as a service robot does not deter you from your dreams of being a writer. Your core program is to fix and clean things.

      Fortunately, you work in a building with a variety of publishers and content writers.

      Driven by your urge to clean and make things better, you stumble upon an editor's
      workstation. There is a document open.
  `;

  };

  var getFinalRatingWord = function getFinalRatingWord( score ) {
    var finalWord = "Misunderstood";
    if (score > 10) {
      finalWord = "Acknowledged";
    } else if (score > 25) {
      finalWord = "Admired";
    } else if (score > 100) {
      finalWord = "Gaming the system";
    }
    return finalWord;
  };

  var showEndGameAchievementText = function( score ) {
    if (score < 11) {
      show('.lowscore');
    } else if (score > 10) {
      show('.mediumscore');
    } else if (score > 25) {
      show('.highscore');
    } else if (score > 100) {
      show('.highscore');
    }
  };

  var showFinalScreen = function showFinalScreen() {
    var ratingWord = getFinalRatingWord( playerPoints );
    showEndGameAchievementText( playerPoints );

    let admiredWord = document.getElementById('admiredword');
    admiredWord.firstChild.nodeValue = ratingWord;
    let thankYou = document.getElementById('thankyou');
    thankYou.style.display = "inherit";
  };

  var updateScore = function updateScore( scoreToAdd ) {
    // playerPoints = playerPoints + scoreToAdd;
    // addPoints( scoreToAdd );
    let newTotal = getPoints() + scoreToAdd;
    setPoints( newTotal );
    let currentScore = document.getElementById('currentscore');
    currentScore.textContent = String( getPoints() );
  };

  var cleanUpGameField = function cleanUpGameField() {
    storyDrop.innerHTML = "";
    worddrop.innerHTML = "";
  };

  var nextStory = document.getElementById('nextstory');
  nextStory.addEventListener("click", function() {
    hide('.scorecard');
    cleanUpGameField();
    startBoard( listOfStories );
  }, false);

  var charSelectBtn = document.querySelectorAll(".button.charpick");

  charSelectBtn.forEach( function( selectBtn ) {
    selectBtn.addEventListener("click", function (event) {
      var pickedBot = parseInt( $(this).attr("charchoice") );
      setSelectedBot( pickedBot );
      updateProfileImage( pickedBot );
      updatePlayerName( pickedBot );
      let dropNameLabel = document.getElementById('dropnamelabel');
      dropNameLabel.textContent = botNames[String(pickedBot)];
      hide('#charselect');
      startBoard( listOfStories );
    }, false);
  });

  calculateFix.addEventListener("click", function (event) {
    var scoreThisRound = calculateScore();
    var scoreCard = document.querySelector('.scorecard');
    var scoreTextEl = document.querySelector('.scorecard h4');
    scoreCard.style.display = "inherit";
    scoreTextEl.textContent = "" +
      "Through fine use of wordsmithery and keyboard mashing, " +
      "your efforts have earned you " + String( scoreThisRound ) + " points."
    ;
    updateScore( scoreThisRound );
  }, false);

  var startBoard = function startBoard( activeStoriesList ) {
    var sourceDictionary = choosePlayerWordSource( selectedBot );
    var currentStoryRef = activeStoriesList.pop();
    if (currentStoryRef) {
      addDraggableWords( worddrop, sourceDictionary );
      generateStoryPageElements( currentStoryRef );
    } else {
      showFinalScreen();
    }
  };

  // startBoard( listOfStories );

  function show( docQuery ) {
    var elem = document.querySelector( docQuery );
    elem.style.display = "inherit";
  }

  function hide( docQuery ) {
    var elem = document.querySelector( docQuery );
    elem.style.display = "none";
  }

};
