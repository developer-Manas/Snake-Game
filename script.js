// const playBoard = document.querySelector(".play-board");
// const scoreElement = document.querySelector(".score");
// const highScoreElement = document.querySelector(".high-score");
// const controls = document.querySelectorAll(".controls i");

// let gameOver = false;
// let foodX, foodY;
// let snakeX = 5, snakeY = 10;
// let snakeBody = [];
// let velocityX = 0, velocityY = 0;
// let setIntervalId;
// let score = 0;

// // Getting high score from the local storage
// let highScore = localStorage.getItem("high-score") || 0;
// highScoreElement.innerText = `High Score: ${highScore}`;

// const changeFoodPosition = () => {
//     // Passing a random 0-30 value as a food position!.....
//     foodX = Math.floor(Math.random() * 30) + 1;
//     foodY = Math.floor(Math.random() * 30) + 1;
// }

// const handleGameOver = ()=> {
//     // Clearing the timer and reloading the page on game over...
//     clearInterval(setIntervalId);
//     alert("Game OVer! Press Okay to replay!...");
//     location.reload();
// }

// const changeDirection = (e) => {
//     // Changing velocity value basead on key press
//     if(e.key === "ArrowUp" && velocityY != 1) {
//         velocityX = 0;
//         velocityY = -1;
//     } else if(e.key === "ArrowDown" && velocityY != -1) {
//         velocityX = 0;
//         velocityY = 1;
//     } else if(e.key === "ArrowLeft" && velocityX != 1) {
//         velocityX = -1;
//         velocityY = 0;
//     } else if(e.key === "ArrowRight" && velocityX != -1) {
//         velocityX = 1;
//         velocityY = 0;
//     }
    
// }

// controls.forEach(key =>{
//     // calling the change direction to each key click 
//     key.addEventListener("click", () => changeDirection({key : key.dataset.key}));
// });



// const initGame = () => {
//     if(gameOver) return handleGameOver();
//     let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX} "></div>`;
// // Checking if the snake hit the food

//     if(snakeX === foodX && snakeY === foodY){
//     changeFoodPosition();
//     snakeBody.push([foodX, foodY]); // Pushing food position to snake body array
//     score ++; // Increment score by 1

//     highScore = score >= highScore ? score : highScore;
//     localStorage.setItem("high-score", highScore);
//     scoreElement.innerText = `Score: ${score}`;
//     highScoreElement.innerText = `High Score: ${highScore}`;
//     }

//     for (let i = snakeBody.length - 1; i > 0 ; i--){
//         // Shifting forward the values of element in the snake body one by one
//         snakeBody[i] = snakeBody[i - 1];
       
//     }


//     snakeBody[0] = [snakeX, snakeY];



// // Updating the snake head position based on the  current velocity
//     snakeX += velocityX;
//     snakeY += velocityY;
// // Checking if the snake head is out of the wall
//     if(snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) {
//         gameOver = true;
//     }

//     for (let i = 0; i < snakeBody.length; i++) {

//         // Adding a div for each part of the snake body
//         htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;    

//         // checking if the sanke head hit the body, leading to game over!... if so set gameOVer to true
//         if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
//             gameOver = true;
//         }
//     }

//     playBoard.innerHTML = htmlMarkup;
// }
// changeFoodPosition();
// setIntervalId = setInterval(initGame, 125);

// document.addEventListener("keydown", changeDirection);



// !------------------------------------------------------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

// High score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// Random food position
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = ()=> {
    clearInterval(setIntervalId);
    alert("Game Over! Press Okay to replay!");
    location.reload();
}

// Change direction based on key
const changeDirection = (key) => {
    if(key === "ArrowUp" && velocityY != 1) { velocityX = 0; velocityY = -1; }
    else if(key === "ArrowDown" && velocityY != -1) { velocityX = 0; velocityY = 1; }
    else if(key === "ArrowLeft" && velocityX != 1) { velocityX = -1; velocityY = 0; }
    else if(key === "ArrowRight" && velocityX != -1) { velocityX = 1; velocityY = 0; }
}

// Button controls
controls.forEach(key => {
    key.addEventListener("click", () => changeDirection(key.dataset.key));
});

// Touch/swipe support
let touchStartX = 0;
let touchStartY = 0;
const minSwipeDistance = 30; // Minimum distance to consider a swipe

document.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

document.addEventListener("touchend", e => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if(Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if(deltaX > minSwipeDistance) changeDirection("ArrowRight");
        else if(deltaX < -minSwipeDistance) changeDirection("ArrowLeft");
    } else {
        // Vertical swipe
        if(deltaY > minSwipeDistance) changeDirection("ArrowDown");
        else if(deltaY < -minSwipeDistance) changeDirection("ArrowUp");
    }
});

const initGame = () => {
    if(gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    // Eating food
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    for (let i = snakeBody.length - 1; i > 0 ; i--){
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // Update head position
    snakeX += velocityX;
    snakeY += velocityY;

    // Wall collision
    if(snakeX < 0 || snakeX > 30 || snakeY < 0 || snakeY > 30) gameOver = true;

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) gameOver = true;
    }

    playBoard.innerHTML = htmlMarkup;
}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", e => changeDirection(e.key));
