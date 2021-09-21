let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('eat.wav');
const moveSound = new Audio('move.wav');
const gameOver = new Audio('over.wav');
//const backMusic = new Audio('bg.mp3');
let speed = 4;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };
function main(ctime) {
    //backMusic.play();
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArr) {

    for (let i = 1; i < snakeArr.length; i++) {

        //if snake bumps into self
        if (snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y) {
         
            return true;
        }
    }
    //if snake touches the walls
    if (snakeArr[0].x >= 18 || snakeArr[0].x <= 0 || (snakeArr[0].y >= 18 || snakeArr[0].y <= 0)) {
       
        return true;
    }
}

function gameEngine() {

    //update food and snake array

    if (isCollide(snakeArr)) {
        gameOver.play();
        //backMusic.pause();
        score = 0;
        inputDir = { x: 0, y: 0 };
        alert("GAME OVER! PRESS ANY KEY TO PLAY AGAIN!");
        snakeArr = [
            { x: 13, y: 15 }
        ]
        //backMusic.play();
    }

    //if food eaten -> score++ and regen. food

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score>max)
        {
            max=score;
            localStorage.setItem("maxscore",JSON.stringify(max));
            maxscoreBox.innerHTML="HI-SCORE: "+ max;
        }
        scoreBox.innerHTML= " SCORE: "+score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {

        snakeArr[i + 1] = { ...snakeArr[i] };  //creating new obj.

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //display snake and food

    board.innerHTML = "";

    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//logic 

let maxscore = localStorage.getItem("maxscore");
if(maxscore== null)
{
    max=0;
    localStorage.setItem("maxscore",JSON.stringify(max));
}
else
{
    max=JSON.parse(maxscore);
    maxscoreBox.innerHTML="HI-SCORE: "+maxscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 }; //any key,snak moves down
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
//developer- Yatheshta 