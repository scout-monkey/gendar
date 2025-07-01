//need to roll up the slider functions into this

function SliderBox(xx,yy,rW,rH){
  this.values = [0,0,0,0,0,0,0,0,0,""];

  this.x = xx;
  this.y = yy;

  this.rectW = rW;
  this.rectH = rH;
  this.tempW = rW; //helps with resizing

  this.modes = ["SIMPLE","COMPLEX","NONBINARY"];
  this.currMode = 0;


  this.mSlider,this.fSlider,this.sexSlider, this.manSlider , this.womSlider, this.idSlider,this.masSlider, this.femSlider, this.expSlider;  //slider vars



  this.MALE = 0;
  this.FEMALE = 1;
  this.MAN = 2;
  this.WOMAN = 3;
  this.MASC = 4;
  this.FEM = 5;
  this.SEX = 6;
  this.ID = 7;
  this.EXP = 8; //enumerated array locations
  


this.display = function(){
  if (this.modes[this.currMode] == this.modes[0]) { //sliderbox initial
    //draw a box around the sliders and label them MYSTERY ELEMENTS
    fill(200, 200);
    this.tempW = this.rectW*1.05;
    rect(0, 0, this.tempW, this.rectH * .45);

    var lbl = "GENDER";
    fill(0);
    textSize(24);
    text(lbl, this.tempW / 2 - textWidth(lbl) / 2, 28);
    textSize(12);

    line(5, 30, this.tempW - 5, 30);

    push();
    translate(0, 75);
    lbl = "Male: " + this.values[0];    
    text(lbl, this.tempW - textWidth(lbl)-3, 0);
    featureIndex++;
    lbl = "Female: " + this.values[1];
    text(lbl, this.tempW - textWidth(lbl)-3, 30);
    featureIndex++;
    translate(0, 45);
    pop();

  }else if(this.modes[this.currMode] == this.modes[1]) { //complex slider box
    var man = this.values[MAN];
    var woman = this.values[WOMAN];
    var mas = this.values[MASC];
    var femme = this.values[FEM];
    this.tempW = this.rectW*1.25; //modify the weidth without permanently change
    //draw a bigger box around the sliders and label them with their actual thingies
    push();

    fill(200, 200);
    rect(0, 0, this.tempW, this.rectH);

    fill(0);
    textSize(15);
    text("GENDER", this.tempW / 2 - textWidth("GENDER") / 2, 20);

    translate(0, 30);

    var labels = ["BIOLOGICAL SEX", "GENDER IDENTITY", "GENDER EXPRESSION"];
    var lbls = [["Male","Female"],["Man","Woman"],["Masculine","Feminine"]];
    var featureIndex = 0; //current way to track what faeture to display in text
    for (var i = 0; i < 3; i++) { 
      var label = labels[i];
      strokeWeight(3);
      line(5, 0, this.tempW - 5, 0);
      text(label, this.tempW / 2 - textWidth(label) / 2, 18);
      strokeWeight(3);
      line(5, 25, this.tempW - 5, 25);
      translate(0, 45);
      lbl = lbls[i][0] +" : " +  this.values[featureIndex];    
      text(lbl, this.tempW - textWidth(lbl)-3, 0);
      featureIndex++;
      lbl = lbls[i][1] +" : " +  this.values[featureIndex];
      text(lbl, this.tempW - textWidth(lbl)-3, 30);
      featureIndex++;
      translate(0, 45);//label the sliders

    } 
  }else if (this.modes[this.currMode] == this.modes[2]) {
    var man = this.values[MAN];
    var woman = this.values[WOMAN];
    var mas = this.values[MASC];
    var femme = this.values[FEM];
    //draw a bigger box around the sliders and label them with their actual thingies
    push();
    this.tempW = this.rectW *1.35;
    fill(200, 200);
    rect(0, 0, this.tempW, 1.30*this.rectH);

    fill(0);
    textSize(15);
    text("GENDER", this.tempW / 2 - textWidth("GENDER") / 2, 20);

    translate(0, 30);

    var labels = ["BIOLOGICAL SEX", "GENDER IDENTITY", "GENDER EXPRESSION"];
    var lbls = [["Male","Female","SexX"],["Manliness","Womanliness","IdentityX"],["Masculine","Feminine","ExpressionX"]];
    var featureIndex = 0; //current way to track what faeture to display in text
    var extraFeature = [6,7,8]; //variables for the labels for non binary things, flaw in arch
    for (var i = 0; i < 3; i++) { 
      var label = labels[i];
      strokeWeight(3);
      line(5, 0, this.tempW - 5, 0);
      text(label, this.tempW / 2 - textWidth(label) / 2, 18);
      strokeWeight(3);
      line(5, 25, this.tempW - 5, 25);
      translate(0, 45);

      lbl = lbls[i][0] + " : " + this.values[featureIndex];    
      text(lbl, this.tempW - textWidth(lbl)-3, 0);
      featureIndex++;

      lbl = lbls[i][1] + " : " + this.values[featureIndex];
      text(lbl, this.tempW - textWidth(lbl)-3, 30);
      featureIndex++;

      lbl = lbls[i][2] + " : " + this.values[extraFeature[i]]; //this should be 8,7,6
      text(lbl, this.tempW - textWidth(lbl)-3, 60);

      translate(0, 75);//label the sliders

    } 
  }


    pop();
 }

this.makeSliders = function(){
  var mSlider = createSlider(0, 255, 0);
  var fSlider = createSlider(0, 255, 0);
  var sexSlider = createSlider(0, 255, 0);
  var manSlider = createSlider(0, 255, 0);
  var womSlider = createSlider(0, 255, 0);
  var idSlider = createSlider(0, 255, 0);
  var masSlider = createSlider(0, 255, 0);
  var femSlider = createSlider(0, 255, 0);
  var expSlider = createSlider(0, 255, 0);

  this.mSlider= mSlider;
  this.fSlider= fSlider;
  this.sexSlider= sexSlider;
  this.manSlider= manSlider;
  this.womSlider= womSlider;
  this.idSlider= idSlider;
  this.masSlider= masSlider;
  this.femSlider= femSlider;
  this.expSlider= expSlider;

  this.mSlider.position(200000, 20);
  this.fSlider.position(200000, 20);
  this.sexSlider.position(20000, 20);
  this.manSlider.position(20000, 20);
  this.womSlider.position(20000, 20);
  this.idSlider.position(20000, 20);
  this.masSlider.position(20000, 20);
  this.femSlider.position(200000, 20);
  this.expSlider.position(200000, 20);
}

this.update = function(label){

  this.values[0] = this.mSlider.value();
  this.values[1] = this.fSlider.value();
  this.values[2] = this.manSlider.value();
  this.values[3] = this.womSlider.value();
  this.values[4] = this.masSlider.value();
  this.values[5] = this.femSlider.value();
  this.values[6] = this.sexSlider.value();
  this.values[7] = this.idSlider.value();
  this.values[8] = this.expSlider.value();

  
}

this.changeMode = function(val){
  this.currMode = val;
}

this.addLabel = function(lb){
   this.values[9] = lb;
}

this.reSize = function (w,h){
  this.rectW = w;
  this.rectH = h;
}


this.addBasicSliders = function(){

  this.mSlider.position(0.05 * this.tempW, (60 / this.rectH) * this.rectH);
  this.fSlider.position(0.05 * this.tempW, (90 / this.rectH) * this.rectH);


}

this.addComplexSliders = function(){
  this.manSlider.position(0.05 * this.tempW, (150 / this.rectH) * this.rectH);
  this.womSlider.position(0.05 * this.tempW, (180 / this.rectH) * this.rectH);

  this.masSlider.position(0.05 * this.tempW, (240 / this.rectH) * this.rectH);
  this.femSlider.position(0.05 * this.tempW, (270 / this.rectH) * this.rectH);

}

this.addNBSliders = function(){
  this.mSlider.position(0.05 * this.tempW, (60 / this.rectH) * this.rectH);
  this.fSlider.position(0.05 * this.tempW, (90 / this.rectH) * this.rectH);
  this.sexSlider.position(0.05 * this.tempW, (120 / this.rectH) * this.rectH);

  this.manSlider.position(0.05 * this.tempW, (180 / this.rectH) * this.rectH);
  this.womSlider.position(0.05 * this.tempW, (210 / this.rectH) * this.rectH);
  this.idSlider.position(0.05 * this.tempW, (240 / this.rectH) * this.rectH);

  this.masSlider.position(0.05 * this.tempW, (300 / this.rectH) * this.rectH);
  this.femSlider.position(0.05 * this.tempW, (330 / this.rectH) * this.rectH);
  this.expSlider.position(0.05 * this.tempW, (360 / this.rectH) * this.rectH);

}

this.hideSliders = function(){
  this.mSlider.position(200000, 20);
  this.fSlider.position(200000, 20);
  this.sexSlider.position(20000, 20);
  this.manSlider.position(20000, 20);
  this.womSlider.position(20000, 20);
  this.idSlider.position(20000, 20);
  this.masSlider.position(20000, 20);
  this.femSlider.position(200000, 20);
  this.expSlider.position(200000, 20);

}

}