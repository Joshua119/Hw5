/*    HW Assignment 5
        File: scrabble.html
        Joshua Sullivan, Joshua_Sullivan1@student.uml.edu
        12/10/2021   
        This javascript file creates the letter tiles and makes sure they are placed in the correct spots. It also 
        has the code to restart the game and display score information.
*/

var totalPieces = 0;
var score = 0;
var totalScore = 0;
var highScore = 0;
var rackCount = 0;
var new_set;

$( function() {
    $( ".basic" ).droppable({
      drop: handleCardDrop
    });
    $( ".special" ).droppable({
        drop: handleCardDrop
    });
} );

$(restart);

//Starts a new round
function restart() {
    score = 0;
    totalScore = 0;
    rackCount = 0;
    totalPieces = 100;

    $('#drag').draggable();

    $('#rack').html( '' );                                      //empties the rack
    $(".filled").removeClass("filled");                         //Reset board to be filled again

    var current_score = document.getElementById("score");
    current_score.innerHTML = score;                            //Display Score

    var display_high = document.getElementById("high_score");
    display_high.innerHTML = highScore;                         //Display High Score

    var remain = document.getElementById("remaining");
    remaining_pieces = totalPieces + rackCount;
    remain.innerHTML = remaining_pieces;                        //Display Remaining Pieces

    var ScrabbleTiles = [] ; // ScrabbleTiles made by Jesse M. Heines
    ScrabbleTiles.push({ letter : "A", value : 1,  originalDistribution : 9,  numberRemaining : 9  }) ;
    ScrabbleTiles.push({ letter : "B", value : 3,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "C", value : 3,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "D", value : 2,  originalDistribution : 4,  numberRemaining : 4  }) ;
    ScrabbleTiles.push({ letter : "E", value : 1,  originalDistribution : 12, numberRemaining : 12 }) ;
    ScrabbleTiles.push({ letter : "F", value : 4,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "G", value : 2,  originalDistribution : 3,  numberRemaining : 3  }) ;
    ScrabbleTiles.push({ letter : "H", value : 4,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "I", value : 1,  originalDistribution : 9,  numberRemaining : 9  }) ;
    ScrabbleTiles.push({ letter : "J", value : 8,  originalDistribution : 1,  numberRemaining : 1  }) ;
    ScrabbleTiles.push({ letter : "K", value : 5,  originalDistribution : 1,  numberRemaining : 1  }) ;
    ScrabbleTiles.push({ letter : "L", value : 1,  originalDistribution : 4,  numberRemaining : 4  }) ;
    ScrabbleTiles.push({ letter : "M", value : 3,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "N", value : 1,  originalDistribution : 6,  numberRemaining : 6  }) ;
    ScrabbleTiles.push({ letter : "O", value : 1,  originalDistribution : 8,  numberRemaining : 8  }) ;
    ScrabbleTiles.push({ letter : "P", value : 3,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "Q", value : 10, originalDistribution : 1,  numberRemaining : 1  }) ;
    ScrabbleTiles.push({ letter : "R", value : 1,  originalDistribution : 6,  numberRemaining : 6  }) ;
    ScrabbleTiles.push({ letter : "S", value : 1,  originalDistribution : 4,  numberRemaining : 4  }) ;
    ScrabbleTiles.push({ letter : "T", value : 1,  originalDistribution : 6,  numberRemaining : 6  }) ;
    ScrabbleTiles.push({ letter : "U", value : 1,  originalDistribution : 4,  numberRemaining : 4  }) ;
    ScrabbleTiles.push({ letter : "V", value : 4,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "W", value : 4,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "X", value : 8,  originalDistribution : 1,  numberRemaining : 1  }) ;
    ScrabbleTiles.push({ letter : "Y", value : 4,  originalDistribution : 2,  numberRemaining : 2  }) ;
    ScrabbleTiles.push({ letter : "Z", value : 10, originalDistribution : 1,  numberRemaining : 1  }) ;
    ScrabbleTiles.push({ letter : "_", value : 0,  originalDistribution : 2,  numberRemaining : 2  }) ;

    new_set = [...ScrabbleTiles];                               //Copy Scrabble tile set

    $(new_pieces);
}

//Refills rack if it is missing tiles
function new_pieces() {
  var tile_num;
  var tile_count;

  $(".filled").removeClass("filled");                           //Reset board to be filled again

  for (var i =rackCount; i<7; i++ ) {                           //Refill missing tiles in rack. 
    
    tile_num = Math.floor((Math.random() * totalPieces )+1);    //Randomly select letter from 'the bag'
    tile_count = 0;

    for(var j = 0; j < (new_set.length-1); j++) {                   //searches out the piece selected
        tile_count = tile_count + new_set[j].numberRemaining;
        if (tile_count >= tile_num) {
            break;
        }
    }
    if(new_set.length == 0){                                        //If there are no pieces left return
        return;
    }

    $('<div val=' + new_set[j].value + ' id=' + new_set[j].letter + '><img id="tiles" src="graphics_data/Scrabble_Tiles/Scrabble_Tile_' + new_set[j].letter + '.jpg"></div>').appendTo('#rack').draggable( {
        cursor: 'move',
        revert: true,
        containment: '#wrapper',
    } );                                                        //create a div tile with that letter
    
    new_set[j].numberRemaining = new_set[j].numberRemaining - 1;//Mark the bag as no longer having that individual letter tile
    totalPieces = totalPieces - 1;                              

    if(new_set[j].numberRemaining <= 0) {                       //if the number of a letter tile runs out, remove the letter form the set
        new_set.splice(j, 1);
    }

    rackCount = rackCount + 1;
  }
}

function handleCardDrop( event, ui ) {
    var currentOrder = parseInt($(this).attr("order"));
    var hasFull = document.getElementsByClassName("filled")
        
    if( (!hasFull.length) || ($('div[order=' + (currentOrder+1) + ']').hasClass("filled") || $('div[order=' + (currentOrder-1) + ']').hasClass("filled") )) //if no filled tiles or this tile is next to a filled tile, place the letter
    {
        if( !($(this).hasClass("filled")))                          //if this space is empty
        { 
            ui.draggable.position( { of: $(this), my: 'left', at: 'left' } ); 
            ui.draggable.draggable( 'option', 'revert', false );    //Stop the tile from reverting to the rack
            ui.draggable.draggable( 'disable' );                    //Stop the player from moving the tile
            if($(this).hasClass('special')) {
                ui.draggable.addClass('specialPos');
            }

            $(this).addClass("filled");                             //mark the row tile as having a letter tile
    
            ui.draggable.attr("order", $(this).attr("order"));      //set the letter to have the same 'order' as row tile
            rackCount = rackCount - 1;
        }
    }
}

function next_word() {
    var specificLetter;
    var specificVal;
    var placedLetters;
    score = 0;
    var word = [];
    
    placedLetters = $('.ui-draggable-disabled');
    for(var k = 0; k < placedLetters.length; k++)
    {
        specificLetter = placedLetters[k].getAttribute("id");
        specificVal = parseInt(placedLetters[k].getAttribute("val"));

        word = word.concat(specificLetter);
        if(placedLetters[k].classList.contains('specialPos'))   //double letter value if its on a 'special' spot
        {
            placedLetters[k].setAttribute("val", (specificVal*2)); 
        }
        score = score + parseInt(placedLetters[k].getAttribute("val")); //add up score for each letter
    }

    if (placedLetters.length <= 1){                             //check that it is a valid length word
        score = 0;                                              //If not, then no points are awarded
    }

    totalScore = totalScore + score;                            //update score                       
    if(totalScore > highScore){
        highScore = totalScore;                                 //update high score
    }
    var current_score = document.getElementById("score");       //display updated score
    current_score.innerHTML = totalScore + " (+" + score + ")";
    var display_high = document.getElementById("high_score");   //display updated high score
    display_high.innerHTML = highScore;

    var remain = document.getElementById("remaining");          //display updated remaining pieces
    remaining_pieces = totalPieces + rackCount;
    remain.innerHTML = remaining_pieces;

    $( "div" ).remove( ".ui-draggable-disabled" );              //delete tiles on the board

    $(new_pieces);

}

