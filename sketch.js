


//next step is solving and making sure feedbak works
//figure out vidoe
//film short tutorial videos teaching how to play
var maleness = 255;
var femaleness = 0;
var intersex = 0;
var womanliness = 0;
var manliness = 0;
var nonbinaryID = 0;
var masculinity = 0;
var femininity = 0;
var nonbinaryExp = 0;
var name = "YOUR MODEL";
var pronouns = "they/them";

var rList;
var testVid;

var feedbackTimer; //basically is going to countdown and serve feedback when the player gets stuck, wish i could implement, this is for ondemand stuff



//Game flow
//init tutorial tool 2
//first three puzzles
//tutorial for tools 3+4
//complex puzzles
//yay you did it video, tutorial for tools 5
//free puzzle mode


//3.25
//fix grpahics
  //message box is fucked up for nonbinary mode
//evertime I want to include more people I have to rewrite my program. This means acceptance is a labor. It isn't passive...

//3.26

var gDisp;

function setup(){
  createCanvas(windowWidth, windowHeight);
  //nameList = ["1","2","3"];
  //nsole.log(rList);
  rList = new Names();
  gDisp = new GenDisplay(rList.nameList);
  gDisp.initiate();
  //var tutSample = gDisp.tutorialSet[1];
  //console.log(tutSample[1]);





}

function draw(){
  //gDisp.gameState = "DEBUG";
  noStroke();
  gDisp.display();
  gDisp.update([maleness,femaleness,
                manliness,womanliness,
                masculinity,femininity,
                intersex,nonbinaryID,nonbinaryExp,
                name,pronouns]);
  console.log(gDisp.wrongAnswerTimer);
;
   //image(testVid,width/2-testVid.width/2,height/2-testVid.height/2,0.5*width,0.5*height);
  

//console.log(maleness);

}


function keyPressed(){
  if(gDisp.gameState == gDisp.gameStateArray[1]){
  gDisp.keyInterfaceGuessLoop(keyCode);
} else {
  gDisp.keyInterfaceTutorial(keyCode);
}
  //console.log(keyCode);
  //1-toggle model display, 2 - m/f sliders,3-man/woman, 4-masc/fem, 5-nonbinary, 6-metaBox
}

function mouseDragged(){
   if(gDisp.gameState == gDisp.gameStateArray[1]){
      gDisp.dragMouseFunctLoop();
    }else{
     gDisp.dragMouseFunctTutorial();
    }
}





/*var sliderB; //the slider box the player uses throughout the game

var state = 0; //indicates in which state the game is in init as 0
var playerChar; //character object that tracks the player's model
var currSample; //current example in the top right of the screen
var currPuzzleSet;
var currPuzzleAddress = 0; //init as zero

var currBackground;

//puzzle vars, need to make these objects called "puzzle"
//male,female,man,woman,masc,fem,elemSex,elemID,elemExp, name
var simplePuzzlesText = [
[255, 0, 0, 0, 0, 0, 0, 0, 0, "MAN 578"],
[0, 255, 0, 0, 0, 0, 0, 0, 0, "WOMAN 098"],
[35, 175, 0, 0, 0, 0, 0, 0, 0, "ERROR_UNKNOWN"]
];
var simplePuzzles = [3];

var complexPuzzlesText = [ //there should be an nbi extention
  [245, 0, 225, 0, 200, 25, 0, 0, 0, "CIS MAN"], //cis man
  [20, 213, 15, 180, 30, 150, 0, 0, 0, "CIS WOMAN"], //cis woman
  [25, 130, 0, 180, 50, 160, 0, 0, 0, "TRANS WOMAN"] //transwoman
  ];
  var complexPuzzles = [3];

  var nBPuzzlesText = [ 
  [0,0,0,0,0,0,125,35,20,"n"],
  [0,0,0,0,0,0,0,10,225,"n"],
  [0,0,0,0,0,0,0,0,0,"n"],
  [255,255,255,255,255,255,255,255,255,"n"]
  ];
  var nBPuzzlesTut = [4];

  var NRAND = 10;
  var randomPuzzles = [NRAND];
  var NB = 10;
  var nBPuzzles = [NB];


//PUZZLE VARS IN HERE

//emumerated names for arrays
var MALE = 0;
var FEMALE = 1;
var MAN = 2;
var WOMAN = 3;
var MASC = 4;
var FEM = 5;
var SEX = 6;
var ID = 7;
var EXP = 8;
var name = 9
  //ENUMERATED NAMES

  var GUESSBOUND = 20;



  var playerX;
  var playerY;


  function setup() {
    state = 0;
    createCanvas(600, 400);
  //background(255);

  makePuzzles();

  sliderB = new SliderBox(0, 0, 200, 300);
  sliderB.addLabel("YOUR MODEL"); //updates the slider values to inlcude the player name
  sliderB.makeSliders();

  playerX = 5*width/8;
  playerY = height/2;

  playerChar = new Character([0, 0, 0, 0, 0, 0, 0, 0, 0, "YOUR MODEL"], [playerX, playerY], 1); //initialize player character
  playerChar.onlyBio = true;

  currBackground = color(0, 0, 0); //initialize this var

  frameRate(12); //so that interaction works

  state = -1;

  textFont("Helvetica");
}

function draw() {
  //console.log(frameRate());
  var message = "";
  var fColor = 125; //defualt font color is grey

  background(currBackground); //draw a fresh background in case no other graphics are running

  //graphics switch
  switch (state) {
    case -1: //click to start
    currBackground = color(0, 0, 0);
    break;
    case 0: //short overview of what player can do, test if player can slide the slider, show them they have the first answer
    currBackground = color(0, 0, 0);
    sliderB.display();
    playerChar.display();
    break;
    case 1: //ez mode loop
    currBackground = calculateBackground();
    sliderB.display();
    playerChar.display();
    playerExampleBox();
    break;
    case 2: //loop for player to interact and indicate they want to know more
    currBackground = color(0, 0, 0);
    break;
    case 3: //video plays explaning gender framework
    currBackground = color(0, 0, 0);
    break;
    case 4: //setup coomplexPuzzle and explain, player must interact to move on
    currBackground = color(0, 0, 0);
    sliderB.display();
    playerChar.display();
    break;
    case 5: //complex Puzzle set
    currBackground = calculateBackground();
    sliderB.display();
    playerChar.display();
    playerExampleBox();
      ////console.log(currPuzzleSet[currPuzzleAddress].values);
      break;
    case 6: //set up random mode
    currBackground = color(0, 0, 0);
    sliderB.display();
    playerChar.display();
    break;
    case 7: //random puzzle sets
    currBackground = calculateBackground();
    sliderB.display();
    playerChar.display();
    playerExampleBox();
    break;
    case 8: //set up nonbinary mode and explain it to player
    currBackground = color(0, 0, 0);
    sliderB.display();
    playerChar.display();
    break;
    case 9: //nonbinary tutorial loop
    currBackground = calculateBackground();
    sliderB.display();
    playerChar.display();
    playerExampleBox();
    break;
    case 10: //nonbinary random explation
    currBackground = color(0, 0, 0);
    sliderB.display();
    playerChar.display();
    break;
    case 11: //nonBinary mode
      currBackground = calculateBackground(); //change this so it relates to player char
      sliderB.display();
      playerChar.display();
      playerExampleBox();
      break;
    case 12: //prep for self-expression mode
    currBackground = color(0, 0, 0);
    sliderB.display();
    playerChar.display();
    break;
    case 13: //self-expression mode
    currBackground = calculateBackground();
    sliderB.display();
    playerChar.display();
    break;
    default:
    currBackground = color(0, 0, 0);
      //end of game 
      break;//eog
    }
  //logic and management stuff
  switch (state) {
    case -1:
    message = "CLICK TO START";
      break; //click to start
    case 0: //short overview of what player can do, test if player can slide the slider, show them they have the first anwer
    message = "CHECK THIS GAME OUT IT IS A GAME WITH FEATURES";
    sliderB.addBasicSliders();
    introLoop();
    currSample.hide = false;
    break;
    case 1: //ez mode loop
    message = "YOU ARE ON EZ MODE. PRESS S TO SUBMIT YOUR ANSWER";
    if (keyIsPressed) {
        // //console.log(keyCode);
        if (keyCode == '115') {
          var playerDone = playerGuessLoop(false); //with argumetn of false, checks if puzzles is complete and manges the puzzle index and returns true if all puzzles are complete
          if (playerDone === true) { //returns true if player is correct at at thend of the puzzles
            state++;
          } else {
            //playerFeedback
            //this is more freeform and about embracing the diversity and that it will take time, should be pleasant
          }
        }
        if (keyCode == '110') { //automatically skips to the next puzzle, for debugging
          var playerDone = playerGuessLoop(true); //same as above, but with a true argument treats every puzzle as solved and moves to next
          if (playerDone === true) {
            state++;
          }
        } else {

        } //try to submit the answer
      }

      sliderB.update();
      playerChar.update(sliderB.values);
      break;
    case 2: //loop for player to interact and indicate they want to know more
    playerChar.hide = true;
    currSample.hide = true;
    sliderB.hideSliders();
    message = "DO YOU WANNA KNOW MORE?";
    break;
    case 3: //video plays explaning gender framework
    background(0);
    message = "A VIDEO IS PLAYING";
      //when video is done playing, move to the next state
      break;
    case 4: //setup coomplexPuzzle and explain, player must interact to move on
    playerChar.hide = false;
    playerChar.onlyBio = false;

    message = "THIS IS THE TUTORIAL FOR THE MORE COMPLEX MODE";

    sliderB.addBasicSliders();
    sliderB.addComplexSliders();
      sliderB.changeMode(1); //1 = complex

      //change the puzzle set and reset the address
      currPuzzleSet = complexPuzzles;
      currPuzzleAddress = 0;
      currSample = currPuzzleSet[currPuzzleAddress];
      currSample.hide = false;
      break;
    case 5: //complex Puzzle set
    if (keyIsPressed) {
        // //console.log(keyCode);
        if (keyCode == '115') {
          var playerDone = playerGuessLoop(false); //with argumetn of false, checks if puzzles is complete and manges the puzzle index and returns true if all puzzles are complete
          if (playerDone == true) { //returns true if player is correct at at thend of the puzzles
            state++;
          } else {
            //playerFeedback
            //this is more freeform and about embracing the diversity and that it will take time, should be pleasant
          }
        }
        if (keyCode == '110') { //automatically skips to the next puzzle, for debugging
          var playerDone = playerGuessLoop(true); //same as above, but with a true argument treats every puzzle as solved and moves to next
          if (playerDone == true) {
            state++;
          }
        } else {

        } //answer submission loop
      }
      sliderB.update();
      playerChar.update(sliderB.values);
      ////console.log(currPuzzleSet[currPuzzleAddress].values);
      break;
    case 6: //set up random mode
      //introToRandom puzzles instructions
      message = "THIS IS RANDOM PUZZLES NOW. CLICK RIGHT TO GO ON";

      currPuzzleSet = randomPuzzles;
      currPuzzleAddress = 0;
      currSample = currPuzzleSet[currPuzzleAddress];
      currSample.hide = false;

      break;
    case 7: //random puzzle sets
      if (keyIsPressed) { //answerCheckThing
        // //console.log(keyCode);
        if (keyCode == '115') {
          var playerDone = playerGuessLoop(false); //with argumetn of false, checks if puzzles is complete and manges the puzzle index and returns true if all puzzles are complete
          if (playerDone == true) { //returns true if player is correct at at thend of the puzzles
            state++;
          } else {
            //playerFeedback
            //this is more freeform and about embracing the diversity and that it will take time, should be pleasant
          }
        }
        if (keyCode == '110') { //automatically skips to the next puzzle, for debugging
          var playerDone = playerGuessLoop(true); //same as above, but with a true argument treats every puzzle as solved and moves to next
          if (playerDone == true) {
            state++;
          }
        } else {

        }
      }
      sliderB.update();
      playerChar.update(sliderB.values);
      ////console.log(currPuzzleSet[currPuzzleAddress].values);
      break;
    case 8: //set up nonbinary mode and explain it to player
     sliderB.changeMode(2); //2= nonbinary
     sliderB.addNBSliders();
     message = "THIS IS NONBINARY PUZZLES NOW. CLICK RIGHT TO GO ON";
     currPuzzleSet = nBPuzzlesTut;
     currPuzzleAddress = 0;
     currSample = currPuzzleSet[currPuzzleAddress];
     console.log(currSample.values);
     currSample.hide = false;
     break;
    case 9: //nobniary tutorial loop
      if (keyIsPressed) { //answerCheckThing
        // //console.log(keyCode);
        if (keyCode == '115') {
          var playerDone = playerGuessLoop(false); //with argumetn of false, checks if puzzles is complete and manges the puzzle index and returns true if all puzzles are complete
          if (playerDone == true) { //returns true if player is correct at at thend of the puzzles
            state++;
          } else {
            //playerFeedback
            //this is more freeform and about embracing the diversity and that it will take time, should be pleasant
          }
        }
        if (keyCode == '110') { //automatically skips to the next puzzle, for debugging
          var playerDone = playerGuessLoop(true); //same as above, but with a true argument treats every puzzle as solved and moves to next
          if (playerDone == true) {
            state++;
          }
        } else {

        }
      }
      sliderB.update();
      playerChar.update(sliderB.values);
      ////console.log(currPuzzleSet[currPuzzleAddress].values);
      break;

      break;
    case 10: //explain nonbinary random
     sliderB.changeMode(2); //2= nonbinary
     sliderB.addNBSliders();
     message = "THIS IS NONBINARY RANDOM PUZZLES NOW. CLICK RIGHT TO GO ON";
     currPuzzleSet = nBPuzzles;
     currPuzzleAddress = 0;
     currSample = currPuzzleSet[currPuzzleAddress];
     currSample.hide = false;
     break;

    case 11: //nonBinary mode
      if (keyIsPressed) { //check if Done
        //console.log(keyCode);
        if (keyCode == '115') {
          if (playerGuessLoop(false) == true) { //returns true if player is done guessing
            state++;
          } else {
            //playerFeedback
            //this is more freeform and about embracing the diversity and that it will take time, should be pleasant
          }
        }
        if (keyCode == '110') {
          if (playerGuessLoop(true) == true) { //automatically skips to the next puzzle, for debugging
            state++;
          } else {

          }
        }
      }
      sliderB.update();
      playerChar.update(sliderB.values);
      break;
    case 12: // prep for end of game loop, player enters own data, instructions
    currSample.hide = true;
    message = "INSTRUCTIONS FOR LAST ROUND";
    sliderB.addLabel("YOU");
      break; //end of game loop player, enters their own data
    case 13: //self exp loop, player enters own data
    currSample.hide = true;
    sliderB.update();
    playerChar.update(sliderB.values);
      message = "Time to make... you! Press S when you are ready to submit" //gonna use the player loop but modified to submit
      break; //end of game loop player, enters their own data
      case 14:
      sliderB.hideSliders();
      state++; //eog
      default:
      //super cool reward screen
      break;
    }
    fColor = color(255 - red(currBackground), 255 - blue(currBackground), 255 - green(currBackground));
    messageBox(message, fColor);

  }


*//*
  function makePuzzles() {
  //convert puzzle sets to sets of objects
  for (var i = 0; i < simplePuzzlesText.length; i++) {
    var puzz = new Character(simplePuzzlesText[i], [525, 50], 1 / 4);
    puzz.onlyBio = true;
    simplePuzzles[i] = puzz;
  }


  for (var j = 0; j < complexPuzzlesText.length; j++) {
    puzz = new Character(complexPuzzlesText[j], [525, 50], 1 / 4);
    puzz.onlyBio = false;
    complexPuzzles[j] = puzz;
  }

  for (var o = 0; o < nBPuzzlesText.length; o++) {
    puzz = new Character(nBPuzzlesText[o], [525, 50], 1 / 4);
    puzz.onlyBio = false;
    nBPuzzlesTut[o] = puzz;
  }

  //randomly generate some complex puzzles
  for (var g = 0; g < 10; g++) {
    var fSet = [9];
    for (var k = 0; k < 6; k++) {
      fSet[k] = random(0, 255);
    }
    for (var x = 6; x < 9; x++) { //three blank spaces because these are not enby puazzles
      fSet[x] = 0;
    }
    fSet[9] = "name"; //,new RandomName();
    var puzz = new Character(fSet, [525, 50], 1 / 4);
    puzz.onlyBio = false;
    randomPuzzles[g] = puzz;
  }



  for (var m = 0; m < 10; m++) {
    var fSet = [9];
    for (var n = 0; n < 9; n++) {
      fSet[n] = random(0, 255);
    }
    fSet[9] = "nbname"; //,new RandomName();
    var puzz = new Character(fSet, [525, 50], 1 / 4);
    puzz.onlyBio = false;
    nBPuzzles[m] = puzz;
  }


  currPuzzleSet = simplePuzzles;
  currSample = currPuzzleSet[0]; //initialize first Sample
}

function introLoop() {
  playerChar.hide = false;
  currSample.hide = false;
}

function playerGuessLoop(skip) {
  var dne = false; //gets set to false when all puzzles done
  // console.log(currSample.values);
  //  console.log(sliderB.values);
  if (matches(currSample.values, sliderB.values) == true || skip == true) {
    currPuzzleAddress++;
    // console.log("RAN");
  }
  if (currPuzzleAddress > currPuzzleSet.length - 1) {
    dne = true;
  } else {
    currSample = currPuzzleSet[currPuzzleAddress];
    currSample.hide = false;
  }
  return dne; //returns whether or not to continue the loop
}

function matches(sample, pChar) {
  var isMatch = true;
  for (var i = 0; i < pChar.length - 1; i++) { //the last element is a string with a label that won't matc
    var samp = sample[i];
  var pC = pChar[i];
    //console.log("CHECKING" + samp + " AND " + pC + "at index" + i);
    //console.log("comparing" + samp + " and "+pC);
    if (isAround(samp, pC, GUESSBOUND) === false) {
      isMatch = false;
    } else {
      ////console.log("ITS A MATCH");
    }
  }
  ////console.log("RESULT IS "+isMatch);
  return isMatch;
}

function calculateBackground() {
  var male = playerChar.values[MALE];
  var female = playerChar.values[FEMALE];
  // //console.log(male+" "+female);
  var average = (male + female) / 2;
  //currSample = currPuzzleSet[currPuzzleAddress]; you need to make the currPuzzleSEt a set of objects dummy dumm dum
  var bgC = color(male, female, playerChar.values[SEX]);
  return bgC;
}

function playerExampleBox() {
  push(); //player example box, turn into function and put in the above if statements
  if (mouseX > 7 / 8 * width && mouseY < .25 * height) { //zoom mode
    translate(playerX - 150, playerY - 100);
    scale(2);


    noStroke();
    if (currSample.hide === false) {
      fill(currSample.values[MALE], currSample.values[FEMALE], currSample.values[SEX], 255);
    } else {
      fill(0, 0);
    }
    rect(0, 0, 150, 100);
    pop();
    currSample.displayAt(playerX, playerY, 1);
  } else { //display in top rigth corner
    translate(450, 0);
    noStroke();
    if (currSample.hide === false) {
      fill(currSample.values[MALE], currSample.values[FEMALE], currSample.values[SEX], 255);
    } else {
      fill(0, 0);
    }
    rect(0, 0, 150, 100);
    pop();
    currSample.display();
  }

}

function highlight(x, y, r, color) { //makes a spherical highlight at the target point x,y with rad r
  push();
  translate(x, y);
  fill(color, 125);

  ellipse(0, 0, r);

  pop();
}

function isAround(v1, v2, bounds) {
  var isArd;
  if (abs(v1 - v2) < bounds + 1) {
    isArd = true;
  } else {
    isArd = false;
  }
  return isArd;
}


function messageBox(mg, fColor) {
  if(mg != ""){ //only do this if there is a message
    var roughTextH = 30;
    var tempMg = mg;
    textSize(roughTextH);
    while(textWidth(mg) > width){
      textSize(roughTextH--);
    }
    var boxDown = roughTextH;

    var tLength = textWidth(mg);

    if(state > 7){ //messages change because the slider box changes, this is a mess!
      var mgFirst = split(tempMg," ");
     // console.log(mgFirst);
     mgFirst = subset(mgFirst,0,mgFirst.length/2);
     mgFirst.toString();

     tempMg = mg;

     var mgSecond = split(tempMg," ");
     mgSecond = subset(mg,mgSecond.length/2+1,mgSecond.length);
     mgSecond.toString();
     mg = mgFirst + "\n" + mgSecond;

     tLength = tLength/1.8;
     boxDown = boxDown*2.5;
     console.log(roughTextH);
   }


   push();
   translate(width, playerY + height / 3);
   fill(fColor);
   rect(-tLength-5,-roughTextH,tLength+5,boxDown);
   fill(currBackground);
   text(mg, -tLength, 0);
   pop();
 }
}

function keyPressed() {
  //s to submit answer


  //right arrow to go next

  //debugging and using key press to moe through state flow
  if (keyCode === DOWN_ARROW) {
    state++;
  }

  if (keyCode === LEFT_ARROW) {
    state--;
  }
}*/