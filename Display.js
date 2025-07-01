function GenDisplay(){
// gui params
 this.maleness = 0;
 this.femaleness = 0;
this.nonBinarySex = 0;
this.womanliness = 0;
    this.manliness = 0;
    this.nonbinaryID = 0;
    this.masculinity = 0;
    this.femininity = 0;
    this.nonbinaryExp = 0;
    this.name = "YOUR MODEL";

    this.complexMode = false;
    this.nonBinaryMode = false;
    this.customCategories = "";

//gui itself, there are several to represent the several models
    this.simple;
    this.complex;
    this.nonBinary;
    this.metaBox;

//
    this.gameStateArray = ["TUTORIAL","GUESSLOOP","PLAYVIDEO"];
    this.gameState = this.gameStateArray[1];

//array of gameStates [TUTORIAL,PUZZLES,FEEDBACK]
    this.metaGameStateSet; //[[learn to play,basicSliders],[original3,nothingadded],[complex,complexSliders],[random,nothingadded],[randomNB,nbSliders]];

//Tutorials[Tutorial[TutorialStep]]
//Tutorial Step Types: displayMessage[message,messageSteps], moveSlider[need to figure this out], playSound[sound], waitForInteraction[interactionType], animate
    this.tutorialSet=[];
    this.tsetIndex = 0;
    this.currTutorial=[];
    this.ctIndex = 0;
    this.currTutorialStep; //special object tutorialStep

//PuzzleSets[currPuzzleSet[CurrPuzzle[sampleModel]]]
this.puzzleSets=[];
this.psIndex = 0;
this.currPuzzleSet;
this.cpsIndex = 0;
this.currPuzzle// = currPuzzleSet[cpsIndex];
this.sampleModel;



//CurrFeedbackSet[currPuzzleFeedback[negativeFeedback[],positiveFeedback]]
this.currFeedbackSet=[[["SIMPLE","POS"],["SIMPLE","NEG"]],
                      [["COMPLEX","POS"],["COMPLEX","NEG"]],
                      [["RANDOM","POS"],["RANDOM","NEG"]],
                      [["nbTutorial","POS"],["nbTutorial","NEG"]],
                      [["nbRandom","POS"],["nbRandom","NEG"]],
                      ];
this.cfsIndex=0;
this.currPuzzleFeedback=[];
this.currNegativePF = ["That's not it!","Try again","Hmmm... Are you sure? Do you want to offend them?"];
this.cnpfIndex = 0;
this.currPositivePF = "Good job!";//should only be one of these and it is for the right answer
this.currFeedback = "";

this.playerChar;
this.charWinX;
this.charWinY;

this.sampleModel;

this.button;

this.stampedCharacters = [];
this.stampX=150; //keeps track of placemetn


this.solved = false;

this.nCorrect = 0;



this.initiate= function() {

  createCanvas(windowWidth, windowHeight);

  // Create the GUI
  sliderRange(0, 255, 1);
  this.simple = createGui('Binary Biological Sex Tool');
  this.simple.addGlobals('this.maleness','this.femaleness','this.name');
  this.simple.hide();

  this.complex = createGui('Binary Gender Identity Tool',40,40);
  this.complex.addGlobals('this.manliness','this.womanliness');
  this.complex.hide();

 this. complex2 = createGui('Binary Gender Expression Tool',60,60);
  this.complex2.addGlobals('this.masculinity','this.femininity');
  this.complex2.hide();

  this.nonBinary = createGui('NonBinary Tools',80,80);
  this.nonBinary.addGlobals('this.nonBinarySex','this.nonbinaryID','this.nonbinaryExp');
  this.nonBinary.hide();

  this.metaBox = createGui('customizationTool',120,120);
  this.metaBox.addGlobals('this.customCategories');
  this.metaBox.hide();

 this. playerChar = new Character([0, 0, 0, 0, 0, 0, 0, 0, 0, "NEW MODEL"], [windowWidth/2, windowHeight/2], 2);


  this.charWinX = windowWidth/2;
  this.charWinY= windowHeight/2;
  //submission button
 // button = createButton('I think this is your model');
  //button.position(3*windowWidth/4,7*windowHeight/8, 65);
 // button.mousePressed(draw); //run the draw loop to check answers etc

  this.currPuzzle = this.currPuzzleSet[this.cpsIndex];

  this.sampleModel = new Character(this.currPuzzle,[windowWidth-150,150],1);

  this.sampleModel.hidden = true;

  this.makePuzzles();

  
  //console.log(currPuzzle);
  background(125);
  // Only call draw when then gui is changed

}


this.display= function() {
  //background(125,98,12,89);
  background(225);
  if(this.gameState == "TUTORIAL"){
    background(0);
    //figure out which type of tutorial stage you are in
      //display appropraite tutorial stuff and allow for player interaction
      //move onto next state if player has met requiremetns or an animation has comleted
  }
  if(this.gameState == "GUESSLOOP"){

    //drawing stuffz for player character
    

    sampleModel.display();
    if(name == "") name = "YOUR NAME";
    this.playerChar.update([this.maleness,this.femaleness, //basic vars
    manliness,this.womanliness,masculinity,femininity, //complex vars
    this.nonBinarySex,this.nonbinaryID,this.nonbinaryExp,this.name]); //expert mode vars
   
   this.playerChar.display();

   this.stampX =100;
  for(var i=0; i<this.stampedCharacters.length;i++){
    var charac = this.stampedCharacters[i];
    console.log(charac.values);
    charac.displayAt(this.stampX,windowHeight-150,0.5);
    this.stampX+=120;
  }

    //draw the sample

    //if solved == true (changed by the submit button)
      //if the player's model matches the sample
        //positive feedback
        //move on to the next puzzle
      //else
        //negative feedback
        //move onto the next negative feedback
    //if the currPuzzleIndex > currPuzzleSet length
        //switch to the next game state using metaGameState
        //run the draw loop, you will only call this when you are leaving guess loop which will run tutorial or playvid
  }

 
  //var message = "You have " + nCorrect + "out of THIS MANY";
  //text(message,textWidth(message),windowHeight-50);

}

this.addPuzzleSet = function(puzzleSet){

  append(this.puzzleSets,puzzleSet());

}

this.nextPuzzle = function(){ //tries to move to the next puzzle, returns true if it cannot move to next puzzle and changes the set
  var setDone;

  this.cpsIndex++;
  if(this.cpsIndex > this.currPuzzleSet.length){
    setDone = true;
    this.psIndex++;
    this.currPuzzleSet = this.puzzleSets[this.psIndex];
    this.psIndex = 0;
    setDone = true;
  }else{
    this.cpsIndex++;
    setDone = false;
  }
  this.currPuzzle = currPuzzleSet[cpsIndex];
  return setDone;
}


// dynamically adjust the canvas to the window
this.windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
}

this.keyPressed = function(){ //1=49,2=50,3=51,4=52
  console.log(keyCode)
  var key = keyCode;
  switch(key){ //1-6: Gender UI Hotkeys, Ctrl : RandomC Character, Tab: Submit answer
    //1
    case(49): //add simple sliders
      this.sampleModel.toggleDisplay();
      //console.log(sampleModel.values);
      //console.log("POP");
      break;
    //2
    case(50): //add simple sliders
      this.simple.show();
      break;
    //3
    case(51): //add complex
      this.complex.show();
      break;
    //4
    case(52): //add complex
      this.complex2.show();
      break;
    //5
    case(53): //add non binary
      this.nonBinary.show();
      break;
    //6
    case(54): //add metabox
      this.metaBox.show();
      break;

    //tab
    case(9):
      this.simple.hide();
      this.complex.hide();
      this.complex2.hide();
      this.nonBinary.hide();
      this.metaBox.hide();

      var copyArray = playerChar.values;
      var copy = new Character(copyArray,windowWidth/2,windowHeight/2,1);
      append(stampedCharacters,copy);

      this.maleness = 0;
      this.femaleness = 0;
      this.nonBinarySex = 0;
      this.womanliness = 0;
      this.manliness = 0;
      this.nonbinaryID = 0;
      this.masculinity = 0;
      this.femininity = 0;
      this.nonbinaryExp = 0;
      this.name = "";

      this.playerChar.update([0, 0, 0, 0, 0, 0, 0, 0, 0, "YOUR MODEL"]);
      break;
    //right arrow
    case(39):
      this.nextPuzzle();
      break;

    //ctrl
    case(17):
      this.maleness = random(0,255);
      this.femaleness = random(0,255);
      this.nonBinarySex = random(0,255);
      this.womanliness = random(0,255);
      this.manliness = random(0,255);
      this.nonbinaryID = random(0,255);
      this.masculinity =random(0,255);
      this.femininity = random(0,255);
      this.nonbinaryExp = random(0,255);
      this.name = randomName();
      break;

    //p 
    case(80):
     
      break;


  }


this.makePuzzles = function() {
  //convert puzzle sets to sets of objects
  var simplePuzzles;
  var simplePuzzlesText = [
    [255,0,0,0,0,0,0,0,0,"Gary Phillips"],
    [0,255,0,0,0,0,0,0,0,"Denise Halifax"],
    [35,155,0,0,0,0,0,0,0,"UNKNOWN"]];

  for (var i = 0; i < simplePuzzlesText.length; i++) {
    var puzz = new Character(simplePuzzlesText[i], [525, 50], 1 / 4);
    puzz.onlyBio = true;
    simplePuzzles[i] = puzz;
  }
  this.addPuzzleSet(simplePuzzles);

  var complexPuzzlesText = [ //there should be an nbi extention
  [245, 0, 225, 0, 200, 25, 0, 0, 0, "Trent Conners"], //cis man
  [20, 213, 15, 180, 30, 150, 0, 0, 0, "Lucie Ellison"], //cis woman
  [25, 130, 0, 180, 50, 160, 0, 0, 0, "Marie Hernandez"] //transwoman
  ];
  var complexPuzzles;

  for (var j = 0; j < complexPuzzlesText.length; j++) {
    puzz = new Character(complexPuzzlesText[j], [525, 50], 1 / 4);
    puzz.onlyBio = false;
    complexPuzzles[j] = puzz;
  }

  this.addPuzzleSet(complexPuzzles);

  //randomly generate some complex puzzles
  for (var g = 0; g < 10; g++) {
    var fSet = [9];
    for (var k = 0; k < 6; k++) {
      fSet[k] = random(0, 255);
    }
    for (var x = 6; x < 9; x++) { //three blank spaces because these are not enby puazzles
      fSet[x] = 0;
    }
    var rSet = ["a smiling stranger","your doctor","your sibling's partner",
                "a friend at church","a classmate","a friend of a friend",
                "the president","your teacher","your golf instructor",
                "a famous performer","your parent","a short order cook",
                "your boss","your mentor","your child"];
    fSet[9] = rSet[floor(random(0,16))]; //,new RandomName();
    var puzz = new Character(fSet, [525, 50], 1 / 4);
    puzz.onlyBio = false;
    randomPuzzles[g] = puzz;
  }
  this.addPuzzleSet(randomPuzzles);


  var nBPuzzlesText = [ 
  [0,0,0,0,0,0,125,35,20,"n"],
  [0,0,0,0,0,0,0,10,225,"n"],
  [0,0,0,0,0,0,0,0,0,"n"],
  [255,255,255,255,255,255,255,255,255,"n"]
  ];
  var nBPuzzlesTut;
  

  for (var o = 0; o < nBPuzzlesText.length; o++) {
    puzz = new Character(nBPuzzlesText[o], [525, 50], 1 / 4);
    puzz.onlyBio = false;
    nBPuzzlesTut[o] = puzz;
  }
  this.addPuzzleSet(nBPuzzlesTut);



  var nBPuzzles;
  for (var m = 0; m < 10; m++) {
    var fSet = [9];
    for (var n = 0; n < 9; n++) {
      fSet[n] = random(0, 255);
    }
    fSet[9] = randomName()+randomName(); //,new RandomName();
    var puzz = new Character(fSet, [525, 50], 1 / 4);
    puzz.onlyBio = false;
    nBPuzzles[m] = puzz;
  }
  this.addPuzzleSet(nBPuzzles);


  currPuzzleSet = this.puzzlesSets[psIndex];//set the current puzzle to the first set
  sampleModel = new Character(currPuzzle,[windowWidth-150,150],1);//initialize first Sample
}

this.randomName = function(){
  var vowels = ['A','E','I','O','U'];
  var cons = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
  var name = "";
  var sylL = floor(random(2,4));
  console.log(sylL);
  for(var i=0; i<sylL;i++){
    var threeSide = random(0,1);
    var vowel = floor(random(vowels.length));
    var con = floor(random(cons.length));
    if(threeSide<0.33){
      name = name + vowels[vowel]+cons[con];
    }else if(threeSide<0.66){
     name =  name+ cons[con]+vowels[vowel];
    }else if(isNotConsonant(name[name.length-1])==true){
      name = name+ cons[con];
    }
  }
  return name;
}

this.isNotConsonant = function(ch){
  var cons = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
  for(var j=0;j<cons.length;j++){
    if(cons[j]==ch) return false;
  }
  return true;
}


this.mouseDragged = function(){
  //console.log(winMouseY);
  var distance = dist(playerChar.loc[0],playerChar.loc[1],winMouseX,winMouseY);
  console.log(winMouseX+"xx "+playerChar.loc[0]+" __"+winMouseY+" yy"+playerChar.loc[1]);
  console.log(distance);
  if(distance<100){
    playerChar.loc[0] = winMouseX;
    playerChar.loc[1] = winMouseY;
  } else{

    distance = dist(sampleModel.loc[0],sampleModel.loc[1],winMouseX,winMouseY);
     if(distance<100){
      sampleModel.loc[0] = winMouseX;
      sampleModel.loc[1] = winMouseY;
  }
  } 
}

}


