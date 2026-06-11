let boxes = [];
let colors = [];
let selectedColor;
let floodZone = [];
let movesLeft = 20;
let win = false;

function setup() {
    createCanvas(800, 800);
    colors = [color(69,66,90), color(54,143,139), color(247,135,100), color(255,214,57), color(172,193,47)];
    for (let i = 0; i < 20; i++) {
        let column = [];
        for (let j = 0; j < 14; j++) {
            column.push(new Box(randColor(), false, (i + 1) * 30, (j + 1) * 30, i, j));
        }
        boxes.push(column);
    }
    selectedColor = boxes[0][0].getColor(); 
    boxes[0][0].visited = true
    floodZone.push(boxes[0][0]);
    flood(selectedColor);
    win = false;
}

function draw() {
    background(220);
    noStroke();
    textSize(20);
    fill(0);
    text("Moves Left: " + movesLeft, 650, 30);
    stroke(1);
    buttons();

    let winFlag = true;

    for (let col of boxes) {
        for (let box of col) {
            box.show();
            if (box.visited == false) { 
                winFlag = false;
            }
        }
    }
    win = winFlag;

    if (win) { 
        textSize(50);
        fill(0, 255, 0);
        noStroke();
        text("You Win! Refresh to play again.", 10, 200);
        noLoop();
    }
    if (movesLeft <= 0) {
        textSize(50);
        fill(255, 0, 0);
        noStroke();
        text("Game Over! Refresh to play again.", 10, 200);
        noLoop();
    }

}

function randColor() {
    return colors[floor(random(colors.length))];
}

function buttons() {
    fill(colors[0]);
    rect(165, 500, 50,50);
    if (selectedColor === colors[0]) {
        noStroke();
        let darkerColor = lerpColor(color(colors[0]), color(0), 0.2);
        fill(darkerColor);
        ellipse(190, 525, 40, 40);
        stroke(1);
    }

    fill(colors[1]);
    rect(235, 500, 50,50);
    if (selectedColor === colors[1]) {
        noStroke();
        let darkerColor = lerpColor(color(colors[1]), color(0), 0.2);
        fill(darkerColor);
        ellipse(260, 525, 40, 40);
        stroke(1);
    }

    fill(colors[2]);
    rect(305, 500, 50,50);
    if (selectedColor === colors[2]) {
        noStroke();
        let darkerColor = lerpColor(color(colors[2]), color(0), 0.2);
        fill(darkerColor);
        ellipse(330, 525, 40, 40);
        stroke(1);
    }

    fill(colors[3]);
    rect(375, 500, 50,50);
    if (selectedColor === colors[3]) {
        noStroke();
        let darkerColor = lerpColor(color(colors[3]), color(0), 0.2);
        fill(darkerColor);
        ellipse(400, 525, 40, 40);
        stroke(1);
    }

    fill(colors[4]);
    rect(445, 500, 50,50);
    if (selectedColor === colors[4]) {
        noStroke();
        let darkerColor = lerpColor(color(colors[4]), color(0), 0.2);
        fill(darkerColor);
        ellipse(470, 525, 40, 40);
        stroke(1);
    }
}

function flood(newColor){
    for (let box of floodZone) {
        box.color = newColor;
    }

    let queue = [...floodZone];

    while (queue.length > 0) {
        let currentBox = queue.shift();

        let neighbors = getNeighbors(currentBox);
        
        for (let neighbor of neighbors) {
            if (!neighbor.visited && neighbor.getColor() == newColor) {
                neighbor.visited = true;
                floodZone.push(neighbor);
                queue.push(neighbor);
            }
        }
    }

}

function getNeighbors(box) {
    let neighbors = [];
    let i = box.i;
    let j = box.j;

    if (i > 0) neighbors.push(boxes[i - 1][j]);
    if (i < boxes.length - 1) neighbors.push(boxes[i + 1][j]); 
    if (j > 0) neighbors.push(boxes[i][j - 1]);
    if (j < boxes[i].length - 1) neighbors.push(boxes[i][j + 1]);

    return neighbors;
}

function mousePressed() {
    if (mouseY >= 500 && mouseY <= 550) {

        if (mouseX >= 165 && mouseX <= 215) {
            click(colors[0]);
        }
        else if (mouseX >= 235 && mouseX <= 285) {
            click(colors[1]);
        }
        else if (mouseX >= 305 && mouseX <= 355) {
            click(colors[2]);
        }
        else if (mouseX >= 375 && mouseX <= 425) {
            click(colors[3]);
        }
        else if (mouseX >= 445 && mouseX <= 495) {
            click(colors[4]);
        }

    }
}

function click(clickedColor) {
    if (clickedColor !== selectedColor) {
        movesLeft--;
        selectedColor = clickedColor;
        flood(selectedColor);
    }
}

class Box {
    constructor(color, visited, x, y, i, j) {
        this.color = color;
        this.visited = visited;
        this.x = x;
        this.y = y;
        this.i = i;
        this.j = j;
    }

    show() {
        stroke(1);
        fill(this.color);
        if (this.visited) {
            noStroke();
        }
        rect(this.x, this.y, 25, 25);
        stroke(1);
    }
    getColor() {
        return this.color;
    }
}