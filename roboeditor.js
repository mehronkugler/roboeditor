window.onload = function () {
//   window.console.log("loadedwooo");
//   // GET ALL THE PLAYERS - DRAGGABLE AND DROP ZONES
  var draggable = document.querySelectorAll(".draggable"),
      dropzones = document.querySelectorAll(".dropzone");

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
        // stop: function( event, ui ) {
        //   window.console.log(event);
        //   window.console.log(ui);
        //   ui.helper.draggable("disable");
        // }
      });

      $( ".dropzone.nounplural" ).droppable({
        accept: ".nounplural",
        classes: {
          "ui-droppable-active": "ui-state-highlight"
        },
      });

      $( ".dropzone.adjective" ).droppable(
        {
          accept: ".adjective",
          classes: {
            "ui-droppable-active": "ui-state-highlight"
          },
          drop: function( event, ui ) {
            $( this )
              .addClass( "ui-state-default" );
              // .find( "p" )
                // .html( "Dropped!" );

            ui.draggable.draggable("disable");
            window.console.log("Dropped a word");
          }
        }
      );

      $('#calculatefix').click(function (event) {
        $('.calculatescore').text("haha sooo funny");
      });
     
}
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

