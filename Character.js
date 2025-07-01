//EXTEND TO INCLUDE NON-BINARY CHARACTERS DISPLAY RULES

function Character(val, lc, sc) {
  this.values = val;
  this.loc = lc; //pair of values
  this.scle = sc; //1=100 percent of the screen, used for scaling for the sample box

  this.r = 100;

  this.hidden = false;
  this.onlyBio = false;

  this.BASETEXT = 24;

  this.MALE = 0;
  this.FEMALE = 1;
  this.MAN = 2;
  this.WOMAN = 3;
  this.MASC = 4;
  this.FEM = 5;
  this.SEX = 6;
  this.ID = 7;
  this.EXP = 8;
  this.NAME = 9;
  this.pronouns = 10;

  this.display = function() {
    if (this.hidden === false) {
      push();
      translate(this.loc[0], this.loc[1]);
      scale(this.scle);
      strokeWeight(10);
      fill(this.values[0],this.values[1],this.values[6]);
      rect(-this.r,-this.r,2*this.r,2*this.r);

      strokeWeight(15 * this.scle);
      if (this.onlyBio === true) {
        fill(0);
        stroke(0);
      } else {
        fill(this.values[this.MAN], this.values[this.WOMAN], this.values[this.ID]);
        stroke(this.values[this.MASC], this.values[this.FEM], this.values[this.EXP]);
      }
      ellipse(0, 0, this.r, this.r);
      pop();

      textSize(this.BASETEXT*this.scle);
      var lbl = this.values[9];
      var xX = this.loc[0];
      var yY = this.loc[1];
      var s = this.scle;
      //console.log(xX+ " , " +yY+ " , " + s);
      fill(255);
      
      rect(xX-1.5*textWidth(lbl)/2,yY+this.r*s,1.5*textWidth(lbl),28*s);
      fill(0);
      text(lbl,xX-textWidth(lbl)/2,yY+this.r*s+25*s);

      fill(255);
      
      lbl = this.values[10]; //prounouns
     // console.log(this.values);
      rect(xX-1.5*textWidth(lbl)/2,40+yY+this.r*s,1.5*textWidth(lbl),28*s);
      fill(0);
      text(lbl,xX-textWidth(lbl)/2,35+yY+this.r*s+25*s);
    }
  }

  this.displayAt = function(x,y,scal) {
    if (this.hidden == false) {
      push();
      translate(x, y);
      scale(scal);
      strokeWeight(15);
      fill(this.values[0],this.values[1],this.values[6]);
      rect(-this.r,-this.r,2*this.r,2*this.r);
      if (this.onlyBio === true) {
        fill(0);
        stroke(0);
      } else {
       fill(this.values[this.MAN], this.values[this.WOMAN], this.values[this.ID]);
        stroke(this.values[this.MASC], this.values[this.FEM], this.values[this.EXP]);
      }
      ellipse(0, 0, 100*scal*1.55, 100*scal*1.55);
    }
  


      fill(255);
      stroke(0);
      strokeWeight(2);
      translate(-100,70);
      rect(0,0,200,40);
      fill(0);
      //console.log(lbl);
      pop();
      textSize(this.BASETEXT*scal);
      var lbl = this.values[9];
      text(lbl,x-textWidth(lbl)/2,y+50);

      fill(255);
      lbl = this.values[10]; //prounouns
      noStroke();
      rect(x-1.5*textWidth(lbl)/2,y+60,textWidth(lbl)*1.4,24);
      
      fill(0);
      text(lbl,x-textWidth(lbl)/2,75+y);

  }


  this.reSize = function(scl){
    this.scle = scl;
  }


  this.update = function(valz) {
    this.values = valz;

  }

  this.show = function(){
    this.hidden = false;
  }

  this.hide = function(){
    this.hidden = true;
  }

  this.toggleDisplay = function(){
    if(this.hidden == false){
      this.hidden = true;
    }else if(this.hidden == true){
      this.hidden = false;
    }
  }



  this.average = function(val1, val2) {
    return (val1 + val2) / 2;
  }
  
}