const bottomPanel = document.querySelector("#panel-bottom");
let score = document.getElementsByClassName("box")[2];
let timer = document.getElementsByClassName("box")[1];
let hit = document.getElementsByClassName("box")[0];
let bubbles = document.getElementsByClassName("bubble");
let gameOverDiv = document.querySelector("#game-over");
let yourScore = document.querySelectorAll("#game-details h3")[0];
let highScore = document.querySelectorAll("#game-details h3")[1];
let playAgainBtn = document.getElementById("play-again");

let scoreCount = localStorage.getItem("scoreCount") ?? 1;

function findHighScore()
{
const keys = Object.keys(localStorage);
let max = 0;
// Iterate through the keys and retrieve the corresponding values
for (const key of keys) 
{
  const value = parseInt(localStorage.getItem(key));
  if(value>max)
  max = value;
}

return max;
}

function gameOver(){
    yourScore.textContent = `Your Score: ${score.textContent}`;
    localStorage.setItem(`score${scoreCount}`, score.textContent);
    localStorage.setItem("scoreCount", Number.parseInt(scoreCount)+1);
    highScore.textContent = `High Score: ${findHighScore()}`;
    gameOverDiv.style.display = "flex";
}

function createBubblesWithRandomNum(n)
{
    for(let i=0;i<n;i++)
    {
    let bubble = document.createElement("div");
    bubble.classList.add("bubble");
    let randNum = Math.floor(Math.random()*10);
    bubble.textContent = randNum;
    bottomPanel.appendChild(bubble);
    }
}

function runTimer(){
    localStorage.clear();
    let interval = setInterval(()=>{
    if(timer.textContent != '0')
    {
        let timerVal = parseInt(timer.textContent);
        timerVal -=1;
        timer.textContent = timerVal;
    }
    else{
        gameOver();
        clearInterval(interval);
    }
    },1000)
}

var temp = -1;
function getNewHit(){
    let randNum;
    do {
        randNum = Math.floor(Math.random() * 10);
    } while (randNum === temp);

    temp = randNum;
    hit.textContent = randNum;
}

function addListenersToBubbles(){
    for (let i = 0; i < bubbles.length; i++) 
    {
    bubbles[i].addEventListener("click", (e)=>{
        if(e.target.textContent == hit.textContent){
            let scoreVal = parseInt(score.textContent);
            scoreVal+=10;
            score.textContent = scoreVal;
            bottomPanel.innerHTML = "";
            createBubblesWithRandomNum(90);
            getNewHit();
            addListenersToBubbles();
        }
        else{
            timer.textContent = "Stop";
            gameOver();
            
        }
        });
    }
}

createBubblesWithRandomNum(90);
addListenersToBubbles();
runTimer();
getNewHit();
playAgainBtn.addEventListener('click',()=>{
    location.reload();
})
