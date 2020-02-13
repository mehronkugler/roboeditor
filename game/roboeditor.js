import { generateProseFromJson } from '/game/generatestorycontent.mjs';
import { addDraggableWords } from '/game/_genDraggableWords.mjs';
import robotVocabularies from '/game/vocabularies.mjs';
import gameEndingTexts from '/game/gameendings.mjs';
import populateCharacterList from '/game/_charselection.mjs';

window.onload = function () {
//   window.console.log("loadedwooo");
//   // GET ALL THE PLAYERS - DRAGGABLE AND DROP ZONES
  var draggable = document.querySelectorAll(".draggable"),
      dropzones = document.querySelectorAll(".dropzone"),
      worddrop   = document.getElementById("worddrop"),
      storyDrop = document.getElementById('storydrop'),
      storyTitleElement = document.querySelector('.fakeeditor > span.title'),
      listOfStories = [],
      playerPoints = 0,
      selectedBotProfile = {},
      calculateFix = document.getElementById('calculatefix'),
      characterList = [];

  var readCharactersFromApi = function readCharactersFromApi() {

    $.ajax({
      type: "GET",
      url: "/api/characters",
      success: function(result) {
        populateCharacterList( result );
        characterList = result;
        letPlayerPickCharacters();
      }
    });

  };

  var readStoriesFromApi = function readStoriesFromApi() {

    $.ajax({
      type: "GET",
      url: "/api/stories",
      success: function(result) {
        setListOfStories(result);
      }
    });

  };

  var getListOfStories = function getListOfStories() {
    return listOfStories;
  };

  var setListOfStories = function setListOfStories( storyList ) {
    listOfStories = storyList;
  };

  var letPlayerPickCharacters = function letPlayerPickCharacters() {

    var charSelectBtn = document.querySelectorAll(".button.charpick");

    charSelectBtn.forEach( function( selectBtn ) {
      selectBtn.addEventListener("click", function (event) {

        var selectedBotIndex = parseInt( $(this).attr("charchoice") );
        var botProfile = characterList[ selectedBotIndex ];

        selectedBotProfile = botProfile;
        
        let profileImage = document.getElementById('playerprofileimage');
        profileImage.setAttribute("src", "/img/"+botProfile.portrait);

        updatePlayerName( botProfile );
        let dropNameLabel = document.getElementById('dropnamelabel');
        dropNameLabel.textContent = botProfile.name;

        hide('#charselect');
        startBoard( getListOfStories() );
      }, false);
    });

  };

  var setPoints = function setPoints( newScore ) {
    playerPoints = newScore;
  };

  var getPoints = function getPoints() {
    return playerPoints;
  };

  var updatePlayerName = function updatePlayerName( botProfile ) {
    let botName = document.querySelectorAll('.playerbotname');
    botName.forEach( function (nameElement) {
      nameElement.textContent = botProfile.name;
    });
  };

  /**
   * Generate story, add droppables, put on screen
   * @param  {[type]}
   * @return {[type]}
   */
  var generateStoryPageElements = function( currentStoryJson ) {

    var currentStory = generateProseFromJson( currentStoryJson );
    var scoreCard = document.querySelector('.scorecard');

    storyDrop.innerHTML = currentStory.innerHTML;
    storyTitleElement.innerText = currentStoryJson.title;

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
    let endingTextElement = document.querySelector('.scoretext');
    var endingText = "";
    if (score < 11) {
      endingText = gameEndingTexts.lowScore;
    } else if (score > 10) {
      endingText = gameEndingTexts.mediumScore;
    } else if (score > 25) {
      endingText = gameEndingTexts.highScore;
    }
    // } else if (score > 100) {
    //   show('.highscore');
    // }
    endingTextElement.innerText = endingText;
  };

  var showFinalScreen = function showFinalScreen() {
    var ratingWord = getFinalRatingWord( getPoints() );
    showEndGameAchievementText( getPoints() );

    let admiredWord = document.getElementById('admiredword');
    admiredWord.firstChild.nodeValue = ratingWord;
    let thankYou = document.getElementById('thankyou');
    thankYou.style.display = "inherit";
  };

  var updateScore = function updateScore( scoreToAdd ) {
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
    startBoard( getListOfStories() );
  }, false);

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

  var startBoard = function startBoard() {
    var sourceDictionary = selectedBotProfile.vocabulary;
    var currentStoryJson = listOfStories.pop();
    if (currentStoryJson) {
      addDraggableWords( worddrop, sourceDictionary );
      generateStoryPageElements( currentStoryJson );
    } else {
      showFinalScreen();
    }
  };

  function show( docQuery ) {
    var elem = document.querySelector( docQuery );
    elem.style.display = "inherit";
  }

  function hide( docQuery ) {
    var elem = document.querySelector( docQuery );
    elem.style.display = "none";
  }

  readCharactersFromApi();
  readStoriesFromApi();

};
