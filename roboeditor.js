window.onload = function () {
//   window.console.log("loadedwooo");
//   // GET ALL THE PLAYERS - DRAGGABLE AND DROP ZONES
  var draggable = document.querySelectorAll(".draggable"),
      dropzones = document.querySelectorAll(".dropzone"),
      worddrop   = document.getElementById("worddrop");

      addDraggableWords( worddrop );

      $( ".draggable" ).draggable({revert: "invalid"});
      // draggable.forEach( function (grabit) {
      //   $(grabit).draggable({revert: "invalid"});
      // });

      // dropzones.forEach( function (dropit) {
      //   $(dropit).droppable();
      // });
      $('#wordpick').droppable();

      $( ".dropzone.noun" ).droppable({
        accept: ".noun",
        drop: function( event, ui ) {
          basicDropCallback( event, ui, this);
        }
      });

      $( ".dropzone.nounplural" ).droppable({
        accept: ".nounplural",
        classes: {
          "ui-droppable-active": "ui-state-highlight"
        },
        drop: function( event, ui ) {
          basicDropCallback( event, ui, this);
        }
      });

      $( ".dropzone.adjective" ).droppable(
        {
          accept: ".adjective",
          classes: {
            "ui-droppable-active": "ui-state-highlight"
          },
          drop: function( event, ui ) {
            basicDropCallback( event, ui, this);
          }
        }
      );

      $('#calculatefix').click(function (event) {
        $('.calculatescore').text("haha sooo funny");
        var newScore = calculateScore();
        $('.calculatescore').text(
          "Through fine use of wordsmithery and keyboard mashing, " +
          "your efforts have earned you " + String( newScore ) + " points."
         );
      });
     
}

var basicDropCallback = function basicDropCallback( event, ui, dropObject ) {
  $( dropObject )
      .addClass( "ui-state-default" );
    ui.draggable.draggable("disable");
    fillInDropWithTarget( ui.draggable, $(dropObject) );
    window.console.log("Dropped a word");
}

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

var addDraggableWords = function addDraggableWords( dropzoneElement ) {
  
  var adjectives = createManyWords( "adjective", 5);
  var nouns = createManyWords( "noun", 2);
  adjectives.forEach( function (draggableWord) {
    dropzoneElement.appendChild(draggableWord);
  });
}

/**
  return list of DIV-ed up words
*/
var createManyWords = function createManyWords( wordType, numWords ) {
  var wordList = [];
  for (var i = 0; i < numWords; i++) {
    wordList.push( createDraggableWord( wordType ) );
  }
  return wordList;
}

var createDraggableWord = function createDraggableWord( wordType ) {
  // word types: noun, adjective
  let wordList = Object.keys(wordReference[wordType]);
  var randomWordText = wordList[
    Math.floor(Math.random()*wordList.length)
  ];
  var wordScore = wordReference[wordType][randomWordText];
  var draggableWord = document.createElement('DIV');
  draggableWord.classList.add("draggable", wordType);
  draggableWord.setAttribute("score", wordScore);
  draggableWord.textContent = randomWordText;
  return draggableWord;
}

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
}

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
    "diametrically": 5
  }
};


//   // DRAG START - HIGHLIGHT DROP ZONES WITH CSS CLASS
//   for (dragitem in draggable) {
//     dragitem.addEventListener("dragstart", function () {
//       for (let i = 0; i < dropzones.length; i++) {
//         dropzones[i].classList.add("active");
//         window.console.log("Added drag listener");
//       }
//     });

//     // DRAG END - REMOVE ALL ADDED ACTIVE & OVER CSS CLASS
//     dragitem.addEventListener("dragend", function () {
//       for (let i = 0; i < dropzones.length; i++) {
//         dropzones[i].classList.remove("active");
//         dropzones[i].classList.remove("over");
//       }
//     });

//     // DRAG - AS YOU ARE DRAGGING
//     dragitem.addEventListener("drag", function () {
//       // DO SOMETHING... IF YOU WANT
//     });
//   }
 

//   for (let i = 0; i < dropzones.length; i++) {
//     // DRAG ENTER - HIGHLIGHT THIS ZONE
//     dropzones[i].addEventListener("dragenter", function () {
//       dropzones[i].classList.add("over");
//     });

//     // DRAG LEAVE - REMOVE HIGHLIGHT ON THIS ZONE
//     dropzones[i].addEventListener("dragleave", function () {
//       dropzones[i].classList.remove("over");
//     });

//     // DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
//     dropzones[i].addEventListener("dragover", function (evt) {
//       evt.preventDefault();
//     });

//     // ON DROP - MOVE THE DRAGGABLE ELEMENT
//     dropzones[i].addEventListener("drop", function (evt) {
//       evt.preventDefault();
//       // Will move the draggable element only if dropped into a different box
//       if (evt.target != draggable.parentNode && evt.target != draggable) {
//         draggable.parentNode.removeChild(draggable);
//         evt.target.appendChild(draggable);
//       }
//     });
//   }
// };

