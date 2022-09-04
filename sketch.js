// translate(mysquare)

// function plotLegs(){
//   push()
// 	translate(-3/5*square_.leg1, -4/5*square_.leg1);
// 	rotate(acos(4/5));
// 	plot()
// 	if(depth!=0){
//     	drawlegs(leg1);
// 	}

// 	pop()
// 	translate(sin(90-acos(4/5)+cos(90-acos(3/5))));
// 	rotate(-90+acos(3/5))
// 	plot()
// 	check
// 	pop()
// }

function setup(){
  createCanvas(800,600);
  background(0);
}

function draw(){
  var mysquare = new Square(350,400,100);
  
  mysquare.findLegs();
  mysquare.plot();
  
  translate(mysquare.x, mysquare.y);
  push();
  plotLegs(mysquare);
  pop();
  
  
}

class Square{
  constructor(x,y,size){
    this.x=x;
    this.y=y;
    this.size=size;
    this.legL=this.size*4/5;
    this.legR=this.size*3/5;
    console.log(this.legL, this.legR)
  }
  findLegs(){
    // this.legL=this.size*4/5;
    // this.legR=this.size*3/5;
    // console.log(this.legL, this.legR)
  }
  
  plot(){
    noStroke();
    color(250);
    square(this.x,this.y,this.size);
  }
}

function plotLegs(sq0, depth=3){
  push();
  sq1 = new Square (-3/5*sq0.legL, -4/5*sq0.legL, sq0.legL);

  push();
	translate(sq1.x, sq1.y);
	rotate(acos(4/5));
	sq1.plot()
	if(depth!=0){
    	plotLegs(sq1,depth-1);
	}
  pop();

  sq2 = new Square ((sin(90-acos(4/5)+cos(90-acos(3/5))))*sq0.legR, 7*sin(acos(3/5))*sq0.legR, sq0.legR);
	
  translate(sq2.x, sq2.y);
	rotate(-90+acos(3/5))
	sq2.plot()
	if(depth!=0){
    plotLegs(sq2,depth-1);
  }
	pop();
  
}



