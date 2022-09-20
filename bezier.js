var main;

var bg_color = [61,0,99];
var pt_color = [255-13, 255-9, 255-1];

var canMove = false;

var bezierPoints = [];
var r = 10;

var delta = 0.1;

var Qs = [];
var Ps=[];

// var w = 1400;
// var h = 1400;

function setup() {
  main=createCanvas(windowWidth,windowHeight-10).parent('#canva');

//   btn = createButton();
//   btn.mousePressed(onclik);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight-10);
}

function onclik(){
  console.log(Qs);
  console.log(Ps);
}

function mousePressed() {
  if(bezierPoints.length<4){
    var bp = new bezierPoint(mouseX, mouseY, r);
    bezierPoints.push(bp);
  }

  for(let i=0 ; i<bezierPoints.length ; i++){
    if(dist(mouseX, mouseY, bezierPoints[i].x, bezierPoints[i].y)<r){
      bezierPoints[i].canMove = true;
      bezierPoints[i].moving(mouseX, mouseY);
    }
  }

}

function mouseDragged(){
  for(let i=0 ; i<bezierPoints.length ; i++){
    if(bezierPoints[i].canMove){
      bezierPoints[i].moving(mouseX, mouseY);
    }
  }
}

function mouseReleased(){
  for(let i=0 ; i<bezierPoints.length ; i++){
    if(bezierPoints[i].canMove){
      bezierPoints[i].canMove = false;
    }
  }
}

function draw() {
  background(bg_color[0], bg_color[1], bg_color[2]);
  // background(20);
  // background(0);
  for(let i=0 ; i<bezierPoints.length ; i++){
    bezierPoints[i].show();
  }

  if(bezierPoints.length>=2){
    stroke(pt_color[0], pt_color[1], pt_color[2]);
    strokeWeight(1);
    line(bezierPoints[0].x, bezierPoints[0].y, bezierPoints[1].x, bezierPoints[1].y);
  }
  if(bezierPoints.length===4){
    stroke(pt_color[0], pt_color[1], pt_color[2]);
    strokeWeight(1);
    line(bezierPoints[2].x, bezierPoints[2].y, bezierPoints[3].x, bezierPoints[3].y);
  }

  
  if(bezierPoints.length>=4){
    noFill();
    stroke(0);
    
    strokeWeight(4);
    
    
    Qs=[];
    drawBezier(bezierPoints[0].copy(), bezierPoints[1].copy(), bezierPoints[2].copy(), bezierPoints[3].copy());
    
    noFill(0);
    beginShape();
    for(let i=0; i<Qs.length; i++){
      colorMode(HSB);
      // stroke(i,100,100);
      stroke(290, 35, 98);
      vertex(Qs[i].x, Qs[i].y);
    }
    endShape();
    colorMode(RGB);

  }
}

class bezierPoint {
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
    this.canMove = false;
  }

  show(){
    fill(pt_color[0], pt_color[1], pt_color[2]);
    // fill(230);
    noStroke();
    circle(this.x, this.y, this.r);
  }

  moving(newX, newY){
    if(this.canMove){
      this.x = newX;
      this.y = newY;
    }
  }

  copy(){
    return createVector(this.x,this.y);
  }
}



function drawBezier(p1, p2, p3, p4){

  var p12 = p5.Vector.add(p1,p2).mult(0.5);
  var p23 = p5.Vector.add(p2, p3).mult(0.5);
  var p34 = p5.Vector.add(p3, p4).mult(0.5);
  var p123 = p5.Vector.add(p12, p23).mult(0.5);
  var p234 = p5.Vector.add(p23, p34).mult(0.5);
  var Q = p5.Vector.add(p123, p234).mult(0.5);
  
  if(err2line(p1,p2,p3,p4)<2){
    Qs.push(p1,p2,p3);
    return ;
  }
  drawBezier(p1, p12, p123, Q);
  // Qs.push(Q);
  drawBezier(Q, p234, p34, p4);
  

}

function err2line(p1, p2, p3, p4){
  var error_2 = errEqn(p1,p4,p2);
  error_2+=errEqn(p1,p4,p3);
  return error_2;
  
}

function errEqn(p0,p1,px){
  var m = Slope(p0,p1);
  var y = (px.x-p0.x)*m+p1.y;
  var err = y - px.y;
  return pow(err,2);

}

function Slope(p0,p1){
  return(p0.y-p1.y)/(p0.x-p1.x);
}


function drawVertex(q){
  stroke(80);
  circle(q.x,q.y,5);
}