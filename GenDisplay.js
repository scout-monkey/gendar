//make feedback work with while loop that ends when an alpha amount is 0 so the message appears and fades away
//makes tutorials work with a tutorial object that uses while loops to wait for player interaction
//make it so tutorial mode triggers when the puzzle set changes and cycles through tutorials just like the game loop

//tutorials i need (havent decided if they are messages or v/o, gonna use messages from now on)

  //simple mode
    //welcome player and explain a little bit(this might be v/o), at char, action click
    //show character, at char, action click on character and move
    //show sample , at sample, action press 1 to show sample
    //explain matching, between sample and char, action click
    //show sliders, at sliders, action click on sliders and move window
    //interact with male slider, at sliders, action make slider 255
    //interact with female slider, at sliders, action make slider 255
    //interact with name field, at name field, type something into the name field
    //use the grave key to submit, at chat, action click grave
  //complex mode
    //challenged the player AHA!, at char, wait for click
    //show evie on name plate, at name plate, wait for click
    //show female slider value, at slider, wait for value
    //show male slider, at slider, wait for value
    //but this isn't the whole story, at genderID box, wait for lick
    //show man slider, at slider, wait for value
    //show woman slider, at slider, wait for value
    //show genderEXP box, at genderEXP box, wait for click
    //show masculine slider, at slider, wait for value
    //show feminine slider, at slider, wait for value
  //random mode
    //people are super varied try these examples, at model, on click
  //nonbinary random mode
    //idea of binary vs non binary, at char, wait for click
    //show nonbinary elmements, at sliders, wait for click
    //explain intersex, at sliders, wait for click
    //explain nonbinary id, at sliders, wait for click
    //explain nonbniary exp, at sliders, wait for click


//OK so tutorial manager is all set up and responds to interactions with the interface, need to make all the prompts for the tutorials






function GenDisplay(nL) {
  this.nameList = nL; //used for random name generation
  // gui params
  this.maleness = 0;
  this.femaleness = 0;
  this.intersex = 0;
  this.womanliness = 0;
  this.manliness = 0;
  this.nonbinaryID = 0;
  this.masculinity = 0;
  this.femininity = 0;
  this.nonbinaryExp = 0;
  this.name = "YOUR MODEL";
  this.pronouns = "they/them";
  this.genArray = [this.maleness,this.femaleness,
                this.manliness,this.womanliness,
                this.masculinity,this.femininity,
                this.intersex,this.nonbinaryID,this.nonbinaryExp,this.pronouns];

  this.complexMode = false;
  this.nonBinaryMode = false;
  this.customCategories = "";

  //gui itself, there are several to represent the several models
  this.simple;
  this.complex;
  this.nonBinary;
  this.metaBox;

  //enumeration of vars for help
  this.genNames = ["maleness","femaleness","manliness","womanliness","masculinity","femininity","intersex","nonbinaryID","nonbinaryExp","pronouns"];
  this.genMessageX = width-410;
  this.genMessageY = height -250;

  //
  this.gameStateArray = ["TUTORIAL", "GUESSLOOP", "DEBUG"];
  this.gameState = this.gameStateArray[0]; //default game starts in 0 so welcome message is first thing

  //array of gameStates [TUTORIAL,PUZZLES,FEEDBACK]
  this.metaGameStateSet; //[[learn to play,basicSliders],[original3,nothingadded],[complex,complexSliders],[random,nothingadded],[randomNB,nbSliders]];

  //Tutorials[Tutorial[TutorialStep]]
  //Tutorial Step [message,x,y,eventTrigger]
  this.tutorialSet = [
                          [["Hi! I'm Evie. I made a little game to explain something about myself to you.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["While I was making it, I realized that there was a lot more to this game than just something about myself.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["It's a game about understanding how people are, how they can be, and how puzzling it can be to find a common language.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["It's actually a pretty silly game to be honest. But it has been life or death for me in the past.",this.genMessageX,this.genMessageY,"moveOn"],

                          ["You can click on your character model to move it around. Try moving that little me around!",this.genMessageX,this.genMessageY,"pDragged"],

                          ["Try to Press the 1 key.",this.genMessageX,this.genMessageY,"showModel"],

                          ["This here is a model of another human being using one particular model of gender.",520,50,"moveOn"],
                          ["Just like real people you can move them closer or further away from your model. Try it now. Move Gary Phillips around by clicking him.",525,50,"pDragged"],

                          ["The next thing you should know about are these slider things you can use. Press 2 to bring one up now.",40,40,"showSimple"],
                          ["Check it out! This one is for biological sex. It describes part of a model for Gary's Gender, biological sex.",240,40,"moveOn"],

                          ["People used to think biological sex is solely something we are born with like our DNA at birth...",240,40,"moveOn"],
                          ["...biological sex is also something that develops over time and depends on several environmental factors, like puberty, or other processes.",240,40,"moveOn"],
                          ["During recent human history, some cultures have associated the biological sex of a child...",240,40,"moveOn"],
                          ["...with expected behavior, psychology, and potential societal roles.",240,40,"moveOn"],

                          ["If you were born with genitalia that looked close enough to a penis, you were a man.",240,40,"moveOn"],
                          ["Try moving the maleness slider to 255.",240,40,"maleness slider 255"],

                          ["And in this framework in order to describe anyone else, we have to reduce the maleness slider back to 0.",240,40,"maleness slider 0"],
                          ["And in the past someone who was born with genitalia that looked close enough to a vagina was considered a woman.",240,40,"moveOn"],
                          ["Try sliding the femaleness slider to 255",240,40,"femaleness slider 255"],

                          ["Your goal is to match your character right here to the sample character using the Binary Biological Sex Tool.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Just press the ~ key to submit your answer. Weird key huh? It's above your tab key and next to the 1 key ; )",this.genMessageX,this.genMessageY,"stamp"],
                          ["Oh right! We are supposed to match that model. Why don't you reset the female slider?",this.genMessageX,this.genMessageY,"femaleness slider 0"],
                          ["Now let's find a match for good ol' Gary Phillips. This one looks like a softball.",this.genMessageX,this.genMessageY,"maleness slider 255"],
                          ["Alright try that ~ key again so we can get going. Who built this thing anyway????",this.genMessageX,this.genMessageY,"stamp"],
                          ["OH! Don't forget to note their name! That's important!",this.genMessageX,this.genMessageY,"stamp"],
                          ["One more thing! Ask their pronouns! Ok. Now press the ~ key.",this.genMessageX,this.genMessageY,"stamp"],
                          ["Good. Everything's looking good. How about you solve a few while I grab a drink? I'll be right back.",this.genMessageX,this.genMessageY,"moveOn"],
                          

                        ],

                          [["Oh it looks like you found someone the framework doesn't really work well for... That's not surprising. It's pretty brittle...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["It makes sense that this framework developed in the time period that it did given the sociological and biological data that was available.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["It does not make sense, however, that data that fell outside of this framework was simply considered 'strange' or 'aberrant'.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Moreover we have evidence of different frameworks in different time periods and different cultures for understanding gender in radically different ways.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["And yet this framework worked pretty well (and continues to) for a large portion of the population who are referred to as cisgender.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["They are called cisgender because their sex assignment at birth corresponds with common expectation of their social behavior and sense of self.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Cis means 'on the same side of' and refers to the fact the these individuals are on the same side of the dominant gender framework.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["This is not an insult but merely an indication of a relationship to an existing framework.",this.genMessageX,this.genMessageY,"moveOn"],

                          ["The term transgender, or trans*, means 'across gender' and refers to the individuals whose gender identities do not fit the dominant gender framework",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Trans* people typically fit many frameworks. But I have noticed that the unique thing the trans* people share in common...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["...is their self-knowledge that they don't fit within the dominant gender framework.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Because of this, we often experience mild discomfort at best in public places, from stares and muttered comments...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["...to outright discrimination and even violence.",this.genMessageX,this.genMessageY,"moveOn"],
                          
                          ["Regardless if you are cisgender or trans* you can still help to fight the negative effects faced by trans* people by learning more about us.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["It starts with playing a game like this. But hopefully by the end you will see that there is a larger goal at stake.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["One that relates to our basic freedom to express who we are within a culture that denies that many forms of expression at every turn overtly and implicitly.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["But we can talk about that another time. This is just a game right? And in this game you have a small goal.",this.genMessageX,this.genMessageY,"moveOn"],

                          ["Your goal now is to learn more about the tools, beyond biological sex, that help us to understand what gender is. See. I told you it was bigger than me.",240,40,"moveOn"],

                          //introduction to the tools and one exmaple of a trans person

                          //you are writing out the tutorial for complex mode and walking the player thought creating your character

                          //  [35, 140, 0, 255, 100, 150, 0, 0, 0, "Evie, your gracious guide"],
                          ["Before you start, I'll give you some help, we can work on an example together.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I'll tell you a little about me and teach you about these other tools but first something you know about...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["My biological sex alone is pretty complex...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I am AMAB (or assigned male at birth) which means I was born with male genitalia and ostensibly male DNA.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I've never had that tested? If you were about to ask... So go ahead and put 100 maleness on there...",this.genMessageX,this.genMessageY,"maleness slider 100"],
                          ["I also have undergone hormone replacement therapy to decrease my male hormone levels...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["So I get to slide that one down a little bit. And it feels so nice...Go ahead and slide to that maleness to 35",this.genMessageX,this.genMessageY,"maleness slider 35"],
                          ["And HRT has increased my female hormone levels. Try moving the female slider to match the color on the sample.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Which I maintain at a nice arbitrary that works for my body (and the scope of this game) and mind. set the level of 140.",this.genMessageX,this.genMessageY,"femaleness slider 140"],
                          ["But speaking of mind, there is so much more to gender than the chemicals in my body and my physical apperance.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Press 3 to check out the gender binary identity tool.",this.genMessageX,this.genMessageY,"showGenderID"],
                          ["I feel like, I know, I am a woman. This is my gender identity. Slide the womanliness slider to 255 please.",this.genMessageX,this.genMessageY,"womanliness slider 255"],
                          ["And despite being born a male, I do not identify as a man. Slide the manliness slider to 0. I never decided to 'man-up' in baseball games...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Which brings me to my gender expression, or the way I want to be and am seen by others.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Press 4 to bring up the Binary Expression Tool",this.genMessageX,this.genMessageY,"showGenderEXP"],
                          
                          ["I consider myself masculine. I love many thigns that have been associated with men in the past.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Fast paced sports. Action films. Video games. ",this.genMessageX,this.genMessageY,"moveOn"],
                          ["And so do many AFAB(assigned female at birth) people of a variety of gender identities.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Because someone's expression doesn't have that much to do with their identity.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Unless you are applying your own gender to everyone else's... and making connections where they....",this.genMessageX,this.genMessageY,"moveOn"],

                          ["I digress. I can be a little aggressive. Oh Right. Traditionally masculine qualities.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["It makes sense if you would move the masculine to 100 please",this.genMessageX,this.genMessageY,"masculinity slider 100"],
                          
                          ["I have definitely always been feminine and loved 'feminine' things.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Lately I've doubted that either of these two particular terms posed in opposition like this really mean anything at all.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["And I know that this binary manner of describing things does not capture what I mean by gender.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["But we will get to that later. I guess for now go ahead and set me as um....",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I guess I buy soft clothing? That doesn't always have seams closing the crotch?",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I do tend to be kind and compassionate? I hope we all are? Anyway... yea... we can get to this later.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["Let's just put 150 for now... Have you noticed these numbers don't really mean... anything",this.genMessageX,this.genMessageY,"femininity slider 150"],

                          ["So that's who I am in a little more detail...",this.genMessageX,this.genMessageY,"moveOn"],

                          ["It's kinda like a really hard conversation. You know?",this.genMessageX,this.genMessageY,"moveOn"],
                          ["...and it's a bunch of different concepts sort of... colliding all at once...",this.genMessageX,this.genMessageY,"moveOn"],
                          ["And I am just one trans* person. I'll have to introduce you to somoene else in a little bit.",this.genMessageX,this.genMessageY,"moveOn"],
                          
                          ["I hope that was helpful. How about you try these puzzles out? This should be getting fun! It's a game after all.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I hope you are wondering if there are wondering what the bigger point is. Ponder the point while partaking in these puzzles.",this.genMessageX,this.genMessageY,"moveOn"],
                        ],
                            [["This isn't the end of the story.",this.genMessageX,this.genMessageY,"moveOn"],
                           ["I'm sure you are wondering. Why is this game so hard? Why is getting harder?",this.genMessageX,this.genMessageY,"moveOn"],
                           ["Because people are complex!",this.genMessageX,this.genMessageY,"moveOn"],
                           ["We know so little about the brain let alone the mind. ",this.genMessageX,this.genMessageY,"moveOn"],
                           ["So why should it be that we split all of human behavior and identity on two binary categories?",this.genMessageX,this.genMessageY,"moveOn"],
                           ["This implies that if one is more of one, one is less of the other",this.genMessageX,this.genMessageY,"moveOn"],
                           ["But if if a triangle has rounded edges does that make it more of a circle and less of a triangle?",this.genMessageX,this.genMessageY,"moveOn"],
                           ["There is a reason this game does not use shape...",this.genMessageX,this.genMessageY,"moveOn"],

                           ["You may have noticed with just two sliders this puzzle doesn't use all of the colors",this.genMessageX,this.genMessageY,"moveOn"],
                           ["R",this.genMessageX,this.genMessageY,"moveOn"],
                           ["G",this.genMessageX,this.genMessageY,"moveOn"],
                           ["B",this.genMessageX,this.genMessageY,"moveOn"],

                           ["Press 5 to pull up the next tool,",240,40,"showNB"],
                           ["Gender models do not have to use binary qualities.",240,40,"moveOn"],
                           ["In the case of biological sex, binary models are patently against reality.",240,40,"moveOn"],
                           ["Intersex people are born with indeterminate biological sexes that cannot be classified as binary sexes.",240,40,"moveOn"],
                           ["Some trans* people undergo surgery or medication that changes their biological sex.",240,40,"moveOn"],
                           ["And why should sex hormones/body types be the only thing we take into account when considering biological sex?",240,40,"moveOn"],
                           ["These are some interesting questions. Check out what happens when you set the intersex slider to 100.",240,40,"intersex slider 100"],

                           ["And why should identity be limited to two arbitrary(there's that word again) social roles?",240,40,"moveOn"],
                           ["Why should we believe that these feelings are arbitraily limited to 2 feelings?",240,40,"moveOn"],
                           ["People who identify as nonbinary do not feel as if the labels of man/woman accurately capture their own gender identity.",240,40,"moveOn"],
                           ["Please set the nonbinary identity slider to 100.",240,40,"nonbinaryID slider 100"],

                           ["And in the same way that they feel that the man/woman binary doesn't really capture anything...",240,40,"moveOn"],
                           ["...they choose to express themselves in a myriad of ways without regard for the masculine/feminine binary.",240,40,"moveOn"],
                           ["Please set the nonbinanry expression to 100",240,40,"nonbinaryExp slider 100"],

                           ["Woowee. You are getting good. Aren't you getting tired yet? No? well here meet some of my non binary friends.",this.genMessageX,this.genMessageY,"moveOn"],
                        ],

                        [  
                          ["Not much to say here. You are about to see more puzzles that are more complex than you have seen before.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["This part is important. You could know these people in your real life. You could affect them with your actions.",this.genMessageX,this.genMessageY,"moveOn"],
                          ["I hope you do well. There is an even more fun and interesting round coming up.",this.genMessageX,this.genMessageY,"moveOn"],

                        ],

                          [["Keep playing! Use all the tools! Break the game! Have fun!",this.genMessageX,this.genMessageY,,"moveOn"]
                        ]
                           ];
  this.tsetIndex = 0;
  this.currTutorialSet = this.tutorialSet[this.tsetIndex];
  this.tutIndex = 0;
  this.currTutorial;
 //special object tutorialStep [messageContent,displayX,displayY,[triggerConditions]]

  //PuzzleSets[currPuzzleSet[CurrPuzzle[sampleModel]]]
  this.puzzleSets = [];
  this.psIndex = 0;
  this.currPuzzleSet = [];
  this.cpsIndex = 0;
  this.sampleModel; //the current puzzle

  this.lastEvent = "";

  this.wrongAnswerTimer = 0;



  //CurrFeedbackSet[currPuzzleFeedback[negativeFeedback[],positiveFeedback]]
  this.currFeedbackSet = [
    [
      ["SIMPLE", "POS"],
      ["SIMPLE", "NEG"]
    ],
    [
      ["COMPLEX", "POS"],
      ["COMPLEX", "NEG"]
    ],
    [
      ["RANDOM", "POS"],
      ["RANDOM", "NEG"]
    ],
    [
      ["nbTutorial", "POS"],
      ["nbTutorial", "NEG"]
    ],
    [
      ["nbRandom", "POS"],
      ["nbRandom", "NEG"]
    ],
  ];
  this.cfsIndex = 0;
  this.currPuzzleFeedback = [];
  this.currNegativePF = ["That's not it!", "Try again", "Hmmm... Are you sure? Do you want to offend them?"];
  this.cnpfIndex = 0;
  this.currPositivePF = "Good job!"; //should only be one of these and it is for the right answer
  this.currFeedback = "";

  this.playerChar;
  this.charWinX;
  this.charWinY;

  this.sampleModel;

  this.button;

  this.stampedCharacters = [];
  this.stampX = 150; //keeps track of placemetn


  this.solved = false;

  this.nCorrect = 0;



  this.initiate = function() {

    

    // Create the GUI
    sliderRange(0, 255, 1);
    this.simple = createGui('Binary Biological Sex Tool');
    this.simple.addGlobals('maleness', 'femaleness', 'name','pronouns');
    this.simple.hide();

    this.complex = createGui('Binary Gender Identity Tool', 0, 280);
    this.complex.addGlobals('manliness', 'womanliness');
    this.complex.hide();

    this.complex2 = createGui('Binary Gender Expression Tool', 0, 420);
    this.complex2.addGlobals('masculinity', 'femininity');
    this.complex2.hide();

    this.nonBinary = createGui('NonBinary Tools', 0,560);
    this.nonBinary.addGlobals('intersex', 'nonbinaryID', 'nonbinaryExp');
    this.nonBinary.hide();

    this.metaBox = createGui('customizationTool', 40, 180);
    this.metaBox.addGlobals('customCategories');
    this.metaBox.hide();

    this.playerChar = new Character([0, 0, 0, 0, 0, 0, 0, 0, 0, "NEW MODEL","they/them"], [windowWidth / 2, windowHeight / 2], 1);


    this.charWinX = windowWidth / 2;
    this.charWinY = windowHeight / 2;

    this.currTutorial = this.currTutorialSet[0]; //


    this.makePuzzles();


    //console.log(currPuzzle);
    background(125);
    // Only call draw when then gui is changed

  }


  this.display = function() {
    //background(125,98,12,89);
    background(225);

      //drawing stuffz for player character


      this.sampleModel.display();
      if (this.name === "") this.name = "YOUR NAME";
      this.playerChar.update([this.maleness, this.femaleness, //basic vars
        this.manliness, this.womanliness, this.masculinity, this.femininity, //complex vars
        this.intersex, this.nonbinaryID, this.nonbinaryExp, this.name,this.pronouns
      ]); //expert mode vars

      this.playerChar.display();

      this.stampX = 100;
      for (var i = 0; i < this.stampedCharacters.length; i++) {
        var charac = this.stampedCharacters[i];
        //console.log(charac.values);
        charac.displayAt(this.stampX, windowHeight - 150, 0.5);
        this.stampX += 120;
      }

      if(this.wrongAnswerTimer>0){
        background(255,0,0,this.wrongAnswerTimer);
        this.wrongAnswerTimer-=2;
      }

      //displayFeedback();

      //draw the sample


    


    //var message = "You have " + nCorrect + "out of THIS MANY";
    //text(message,textWidth(message),windowHeight-50);

  }

  this.update = function(values){
    this.updateValues(values);

    if(this.gameState == this.gameStateArray[0]){
      if(this.tutorialManager() == true){ //if the tutorial manager rueturns true, the tutorial is completed and the game moves onto the corresponding game loop
        this.gameState = this.gameStateArray[1];
        this.tutIndex = 0;
        this.tsetIndex++;
        //console.log("tset got changed to" + this.tSetIndex);
        if(this.tsetIndex<this.tutorialSet.length){
        this.currTutorialSet = this.tutorialSet[this.tsetIndex];
        this.currTutorial = this.currTutorialSet[this.tutIndex];
        this.stampedCharacters = [];
      }

      } 
    }

  }

  this.updateValues = function(values){ //takes in the new values, sees if any has changed and updates them
    for(var i=0;i<this.genArray.length-1;i++){ //report changes to the sliders
      if(this.genArray[i] != values[i]){
        this.lastEvent =  this.genNames[i] + " slider " + values[i];
      }
    }
    this.maleness = values[0];
    this.femaleness = values[1];
    this.manliness = values[2];
    this.womanliness = values[3];
    this.masculinity = values[4];
    this.femininity = values[5];
    this.intersex = values[6];
    this.nonbinaryID = values[7];
    this.nonbinaryExp = values[8];
    this.name = values[9];
    this.pronouns = values[10];

    this.genArray = [this.maleness,this.femaleness,
              this.manliness,this.womanliness,
              this.masculinity,this.femininity,
              this.intersex,this.nonbinaryID,this.nonbinaryExp,
              this.name,this.pronouns];
  }

  this.tutorialManager = function(){ //this is not working correctly, added the return statemenet
    var tutorialOver = false;
    
    if(this.tutIndex < this.currTutorialSet.length){ //if tutorial is still going check to see if playyer has performed tut action
      //console.log(this.lastEvent + ":" + this.currTutorial[3]);
      //console.log(this.currTutorial);
      if(this.lastEvent == this.currTutorial[3] || this.lastEvent == "DEBUG"){ //if player has performed the action, move on to the next tutorial step and reset the action
        this.tutIndex++;
        this.currTutorial = this.currTutorialSet[this.tutIndex];
        this.lastEvent = "";
      } else{ //if the player hasn't performed the action, then display the tutorial message
         var msg = this.currTutorial[0];
        var x = this.currTutorial[1];
        var y = this.currTutorial[2];
        strokeWeight(5);
        stroke(0);
        fill(255);
        rect(x-10,y-10,410,200);
        fill(0);
        strokeWeight(0);
        if(this.currTutorial[3]=="moveOn"){
          msg = msg + " (press Enter to move on)";
        }
        textSize(24);
        text(msg,x,y,400,200);
      }
    }else{ //if the player has finished all the tutorial steps the tutorial is over
      tutorialOver = true;
      this.lastEvent = "";
    }
    //console.log("tutorial over :" +tutorialOver);
    return tutorialOver;
  
  }



  this.addPuzzleSet = function(puzzleSet) {
    //console.log(puzzleSet+ " was added");
    append(this.puzzleSets, puzzleSet);
    //console.log(this.puzzleSets," appended");

  }

  this.nextPuzzle = function() { //tries to move to the next puzzle, returns true if it cannot move to next puzzle and changes the set
    var setDone;
    /*console.log("PRE");
           console.log(this.cpsIndex);
        console.log(this.psIndex);
      console.log(this.currPuzzleSet);*/

    this.cpsIndex++;
    if (this.cpsIndex > this.currPuzzleSet.length-1) { //ready to go to next puzzleSet
      this.psIndex++;
      this.currPuzzleSet = this.puzzleSets[this.psIndex];
      this.cpsIndex = 0;
      this.gameState = this.gameStateArray[0]; //go back into tutorial mode
      this.stampedCharacters = [];
      setDone = true;
    } else { // still in same pzuzle set, go to next puzzle
      setDone = false;
    }
     var pastX = this.sampleModel.loc[0];
      var pastY = this.sampleModel.loc[1];
      /*console.log("POST");
      console.log(this.cpsIndex);
      console.log(this.psIndex);
      console.log(this.currPuzzleSet[0]);*/
      this.sampleModel = this.currPuzzleSet[this.cpsIndex];
      this.sampleModel.loc[0] = pastX;
      this.sampleModel.loc[1] = pastY;

    return setDone;

  }


  // dynamically adjust the canvas to the window
  this.windowManager= function() {
    resizeCanvas(windowWidth, windowHeight);
  }

  this.keyInterfaceTutorial = function(keyC){
    var key = keyC;
    console.log(keyC);
    switch (key) { //1-6: Gender UI Hotkeys, Ctrl : RandomC Character, Tab: Submit answer
      //1
      case (49): //add simple sliders
        this.sampleModel.toggleDisplay();
        this.lastEvent = "showModel";
        //console.log(sampleModel.values);
        //console.log("POP");
        break;
        //2
      case (50): //add simple sliders
        this.simple.show();
        this.lastEvent = "showSimple";
        break;
        //3
      case (51): //add complex
        this.complex.show();
        this.lastEvent = "showGenderID";
        break;
        //4
      case (52): //add complex
        this.complex2.show();
        this.lastEvent = "showGenderEXP";
        break;
        //5
      case (53): //add non binary
        this.nonBinary.show();
        this.lastEvent = "showNB";
        break;
        //6
      case (54): //add metabox
        this.metaBox.show();
        this.lastEvent = "showMetaBox";
        break;

        //grave key, stamp
      case (192):
        this.lastEvent = "stamp"
       if(this.matches(this.sampleModel.values,this.genArray)){
          

          var copyArray = this.genArray;
          var copy = new Character(copyArray, windowWidth / 2, windowHeight / 2, 1);
          append(this.stampedCharacters, copy);
        } else{
          this.wrongAnswerTimer = 255;
        }
        break;
        //right arrow
      case (39):
          
          this.lastEvent = "DEBUG";
        break;
        case (13):
          
          this.lastEvent = "moveOn";
        break;

        //p 
      case (80):

        break;


    }
  }

  this.keyInterfaceGuessLoop = function(keyC) { //1=49,2=50,3=51,4=52
    //console.log(keyC);
    var key = keyC;
    switch (key) { //1-6: Gender UI Hotkeys, Ctrl : RandomC Character, Tab: Submit answer
      //1
      case (49): //add simple sliders
        this.sampleModel.toggleDisplay();
        //console.log(sampleModel.values);
        //console.log("POP");
        break;
        //2
      case (50): //add simple sliders
        this.simple.show();
        break;
        //3
      case (51): //add complex
        this.complex.show();
        break;
        //4
      case (52): //add complex
        this.complex2.show();
        break;
        //5
      case (53): //add non binary
        this.nonBinary.show();
        break;
        //6
      case (54): //add metabox
        this.metaBox.show();
        break;

        //grave key, stamp
      case (192):

       if(this.matches(this.sampleModel.values,this.genArray)){

          var copyArray = this.genArray;
          var copy = new Character(copyArray, windowWidth / 2, windowHeight / 2, 1);
          append(this.stampedCharacters, copy);

          this.maleness = 0;
          this.femaleness = 0;
          this.intersex = 0;
          this.womanliness = 0;
          this.manliness = 0;
          this.nonbinaryID = 0;
          this.masculinity = 0;
          this.femininity = 0;
          this.nonbinaryExp = 0;
          this.name = "";
          this.pronouns = "";

          this.playerChar.update([0, 0, 0, 0, 0, 0, 0, 0, 0, "YOUr MODEL","they/them"]);
          this.nextPuzzle();
        } else{
          //fireFeedback
          this.wrongAnswerTimer = 255;
        }
        break;
        //right arrow
      case (39):

        this.nextPuzzle();
        break;

        //ctrl
      case (17):
        this.maleness = random(0, 255);
        this.femaleness = random(0, 255);
        this.intersex = random(0, 255);
        this.womanliness = random(0, 255);
        this.manliness = random(0, 255);
        this.nonbinaryID = random(0, 255);
        this.masculinity = random(0, 255);
        this.femininity = random(0, 255);
        this.nonbinaryExp = random(0, 255);
        this.name = this.randomName()+this.randomName();
        break;

        //p 
      case (80):

        break;


    }
  }


  this.makePuzzles = function() {
    //convert puzzle sets to sets of objects
    var simplePuzzles =[];
    var simplePuzzlesText = [
      [255, 0, 0, 0, 0, 0, 0, 0, 0, "Gary Phillips","he/him"],
      [0, 255, 0, 0, 0, 0, 0, 0, 0, "Denise Halifax","she/her"],
      [35, 155, 0, 0, 0, 0, 0, 0, 0, "UNKNOWN","she/her"]
    ];
    for (var i = 0; i < simplePuzzlesText.length; i++) {
      var puzz = new Character(simplePuzzlesText[i], [525, 50], 1.25);
      puzz.onlyBio = true;
      simplePuzzles[i] = puzz;
    }
  

    var complexPuzzlesText = [ //there should be an nbi extention
      [35, 140, 0, 255, 100, 150, 0, 0, 0, "Evie, your gracious guide","she/her"],
      [245, 0, 225, 0, 200, 25, 0, 0, 0, "Trent Conners","he/him"], //cis man
      [20, 213, 15, 180, 30, 150, 0, 0, 0, "Lucie Ellison","she/her"], //cis woman
      [25, 130, 0, 180, 50, 160, 0, 0, 0, "Marie Hernandez","she/her"] //transwoman
    ];
    var complexPuzzles =[];
    for (var j = 0; j < complexPuzzlesText.length; j++) {
      puzz = new Character(complexPuzzlesText[j], [525, 50], 1.25);
      puzz.onlyBio = false;
      complexPuzzles[j] = puzz;
    }

    var nBPuzzlesText = [
      [0, 0, 0, 0, 0, 0, 125, 35, 20, "Emmett","they/them"],
      [0, 0, 0, 0, 0, 0, 0, 10, 225, "Ryan","they/them"],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, "Rika","they/them"],
      [255, 255, 255, 255, 255, 255, 255, 255, 255, "Mina","Mina"]
    ];
    var nBPuzzlesTut =[];


    for (var o = 0; o < nBPuzzlesText.length; o++) {
      puzz = new Character(nBPuzzlesText[o], [525, 50], 1.25);
      puzz.onlyBio = false;
      nBPuzzlesTut[o] = puzz;
    }


        var randomPuzzles = [];
    //randomly generate some complex puzzles
    for (var g = 0; g < 10; g++) {
      var fSet = [];
      for (var k = 0; k < 9; k++) {
        fSet[k] = random(0, 255);
      }
      var rSet = ["a smiling stranger", "your doctor", "your sibling's partner",
        "a friend at church", "a classmate", "a friend of a friend",
        "your best friend", "your teacher", "your golf instructor",
        "a famous performer", "your parent", "a short order cook",
        "your boss", "your mentor", "your child","a tv personality",
        "your favorite singer","your piano teacher","your new neighbor",
         "a close friend", "your grandma",
        "your first grade crush","the person at the pet store",
        "the last person you saw","an action star","a superhero"
      ];
      var randomPerson =  floor(random(0, rSet.length));
         fSet[9] = rSet[randomPerson];

      var rpSet = ["she/her","he/him","they/them"];
      var randomPronoun =  floor(random(0, rpSet.length+1)); //0,1,2,3,4,...length total possible val
      if(randomPronoun==rpSet.length){
        fSet[10] = fSet[9];
      }else{
        fSet[10] = rpSet[randomPronoun]
      }

      puzz = new Character(fSet, [525, 50], 1.25);
      puzz.onlyBio = false;

      randomPuzzles[g] = puzz;

    }

   





    var nBPuzzles =[];
    for (var m = 0; m < 1000; m++) {
      fSet = [9];
      for (var n = 0; n < 9; n++) {
        fSet[n] = random(0, 255);
      }
      fSet[9] = this.randomName(); //,new RandomName();

      var rpSet = ["she/her","he/him","they/them","Ze/hir","per/per","ve/ver","xe/xem","e/em"];
      var randomPronoun =  floor(random(0, rpSet.length)); //0,1,2,3,4,...length total possible val
      if(randomPronoun==rpSet.length){
        fSet[10] = fSet[9];
      }else{
        fSet[10] = rpSet[randomPronoun]
      }

      puzz = new Character(fSet, [525, 50],  1.25);
      puzz.onlyBio = false;
      nBPuzzles[m] = puzz;
    }
    this.addPuzzleSet(simplePuzzles);
    this.addPuzzleSet(complexPuzzles);
    this.addPuzzleSet(nBPuzzlesTut);
    this.addPuzzleSet(randomPuzzles);
    this.addPuzzleSet(nBPuzzles);


    this.currPuzzleSet = this.puzzleSets[this.psIndex]; //set the current puzzle to the first set
    this.sampleModel = this.currPuzzleSet[this.cpsIndex] //initialize first Sample
    //console.log(this.sampleModel.loc[0]);
    this.sampleModel.hidden = true;
  }

  this.randomName = function(){
    var rName;
    var r = floor(random(0,this.nameList.length));
    rName = this.nameList[r];
   // console.log("random name: " + rName);
    return rName;
  }


  this.dragMouseFunctTutorial = function(){
    if(this.dragMouseFunctLoop() > 15){
      this.lastEvent = "pDragged";
    }
  }

  this.dragMouseFunctLoop = function() {
    //console.log(winMouseY);

      var distance = dist(this.playerChar.loc[0], this.playerChar.loc[1], winMouseX, winMouseY);
      //console.log(winMouseX + "xx " + this.charWinX + " __" + winMouseY + " yy" + this.charWinY);
     // console.log(distance);
      if (distance < 100) {
        this.playerChar.loc[0] = winMouseX;
        this.playerChar.loc[1] = winMouseY;
      } else {

        distance = dist(this.sampleModel.loc[0], this.sampleModel.loc[1], winMouseX, winMouseY);
        if (distance < 100) {
          this.sampleModel.loc[0] = winMouseX;
          this.sampleModel.loc[1] = winMouseY;
        }
      }

      return distance;
  }


  this.matches = function(sample, pChar) {
    var isMatch = true;
    for (var i = 0; i < pChar.length; i++) { //the last element is a string with a label that won't matc
      var samp = sample[i];
      var pC = pChar[i];
      //console.log("CHECKING" + samp + " AND " + pC + "at index" + i);
      //console.log("comparing" + samp + " and "+pC);
      if (this.isAround(samp, pC, 20) == false && i<9) {
        isMatch = false;
      } else {
        //console.log(i+"'S A MATCH");
      }
      if(i>8){ //checking the name and pronouns
        if(this.sameString(sample[i],pChar[i])==false){
          isMatch = false;
        }
      }
    }
    console.log("RESULT IS "+isMatch);
    return isMatch;
  }

  this.isAround = function(v1,v2,bounds){
    var isArd;
    if (abs(v1 - v2) < bounds + 1) {
      isArd = true;
    } else {
      isArd = false;
    }
    return isArd;
  }

  this.sameString = function(s1,s2){
    var isSame = true;
    if(s1.length  == s2.length){
        for(var i=0;i<s1.length;i++){
         console.log(s1[i]+":"+s2[i]);
          if(s1[i]===s2[i]){
            //console.log("MATCH");
          }else{
            //console.log("MISS");
            isSame = false;
            i=s1.length;
          }
        }
    } else{
        isSame = false;
    }
   console.log("RESULT IS"+isSame);
    return isSame;
  }
 
}



    //gonna use a different method and come back to statistical methods, need a freq table
  /*this.randomName = function() {
    var vowels = ['A', 'E', 'I', 'O', 'U'];
    var cons = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    var name = "";
    var sylL = floor(random(2, 4));
    //console.log(sylL);
    for (var i = 0; i < sylL; i++) {
      var threeSide = random(0, 1);
      var vowel = floor(random(vowels.length));
      var con = floor(random(cons.length));
      if (threeSide < 0.33) {
        name = name + vowels[vowel] + cons[con];
      } else if (threeSide < 0.66) {
        name = name + cons[con] + vowels[vowel];
      } else if (this.isNotConsonant(name[name.length - 1]) == true) {
        name = name + cons[con];
      }
    }
    return name;
  }

  this.isNotConsonant = function(ch) {
    var cons = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
    for (var j = 0; j < cons.length; j++) {
      if (cons[j] == ch) return false;
    }
    return true;
  }*/
