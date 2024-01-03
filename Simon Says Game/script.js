let gameSeq = [];
let userSeq = [];
let btns = ["red", "green", "yellow", "blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
    }
    levelUp();
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIndx = Math.floor(Math.random() * 3);
    let randColor = btns[randIndx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
}

function btnPress(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click", btnPress);
}

function checkAns(indx){
    if (gameSeq[indx] === userSeq[indx]){
        if (gameSeq.length == userSeq.length){
            setTimeout(levelUp, 800)
        }  
    } else {
        h2.innerHTML = `Game Over. Your score was <b>${level}</b> <br> Press any key to Restart.`;
        level = 0;
        gameSeq = [];
        started = false;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 200)
    }
}