var main;
var controls;
var ratio = [0,3,4,5];
var dpth;

function setup(){

  //controls
  controls = []
  controls.push(createButton().parent('#ratio'));
  controls[0].class('btn btn-warning').html('3:4:5').mousePressed(chgRatio);
  controls.push(createSlider(0,10,3,1).parent('#depth'));

  main=createCanvas(800,500).parent("#canva");
  colorMode(HSB, 100);
  angleMode(DEGREES);
}

function draw(){
  background(256);
  var mysquare = new Square(350,350,60);
  mysquare.plot();
  
  translate(mysquare.x, mysquare.y);
  push();
  plotLegs(mysquare);
  pop();
}

function chgRatio(){
  if(ratio[0]==0){
    ratio=[1,5,12,13];
    controls[0].html('5:12:13')
    controls[0].removeClass('btn-warning');
    controls[0].addClass('btn-info');
    console.log('changed to 5,12,13');
    console.log(ratio);
    
    return;
  }
  ratio=[0,3,4,5];
  controls[0].html('3:4:5')
  controls[0].removeClass('btn-info');
  controls[0].addClass('btn-warning');
  console.log('changed to 3,4,5');
  console.log(ratio);
}

class Square{
  constructor(x,y,size,c=0){
    this.x=x;
    this.y=y;
    this.size=size;
    this.c=c
    this.legL=this.size*ratio[2]/ratio[3];
    this.legR=this.size*ratio[1]/ratio[3];
  }
  
  plot(leg=false){
    stroke(256);
    fill(this.c, 95, 80);
    
    if (leg){
      square(0,0,this.size);
      return;
    }
    
    square(this.x,this.y,this.size);
  }
  
}

function plotLegs(sq0, depth=controls[1].value()){
  push();
  sq1 = new Square (-ratio[1]/ratio[3]*sq0.legL, -ratio[2]/ratio[3]*sq0.legL, sq0.legL, sq0.c+2);

  push();
	translate(sq1.x, sq1.y);
	rotate(-(acos(ratio[2]/ratio[3])));
	sq1.plot(leg=true)
	if(depth!=0){
    	plotLegs(sq1,depth-1, acos(ratio[2]/ratio[3]));
	}
  pop();

  sq2 = new Square (sin(acos(ratio[1]/ratio[3]))*(sq0.legL+sq0.legR), -sin(acos(ratio[2]/ratio[3]))*(sq0.legL+sq0.legR), sq0.legR, sq0.c+4);
	
  translate(sq2.x, sq2.y);
	rotate(acos(ratio[1]/ratio[3]))
	sq2.plot(leg=true)
	if(depth!=0){
    plotLegs(sq2,depth-1);
  }
	pop();
  
}



