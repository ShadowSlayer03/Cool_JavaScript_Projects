const words = ['Speed', 'Accuracy','Skill'];
const sentence = "Create a new high score!";
const span = document.querySelector("#main-heading span");
const mainHeading = document.querySelector("#main-heading");

let string = "";
let j = 0, i = 0;
let typeEffectInterval, removeEffectInterval;


function removeEffect() {
    const length = string.length;
    if (length === 0) {
        clearInterval(removeEffectInterval);
    }
    string = string.slice(0, length - 1);
    span.textContent = string;
    if(i==3 && length==0)
    {
        console.log(length);
        setTimeout(()=>{
            mainHeading.innerHTML = "Typing Speed Test.";
            mainHeading.classList.add("underline");
        },1000);
    }
}

function typeEffect() {
    const currentWord = words[i];
    string += currentWord[j];
    j++;
    span.textContent = string;
    if (string === currentWord) {
        clearInterval(typeEffectInterval);
        setTimeout(() => {
            removeEffectInterval = setInterval(removeEffect, 200);
            i++;
            j = 0;
            if (i < words.length) {
                setTimeout(() => {
                    typeEffectInterval = setInterval(typeEffect, 300);
                }, 1500);
            }
        }, 400);
    }
}

typeEffectInterval = setInterval(typeEffect, 300);

const typingTest = document.querySelector(".typing-test");
const inputField = document.getElementsByClassName("wrapper")[0].getElementsByClassName("input-field")[0];
const mistakeTag = document.querySelector(".mistake span");
const timeTag = document.querySelector(".time span b");
const wpmTag = document.querySelector(".wpm span");
const cpmTag = document.querySelector(".cpm span");
const tryAgainbtn = document.querySelector(".content button");
const resBg = document.querySelector(".background");
const resMesg = document.querySelector(".container h2");
const resSpan1 = document.querySelector("#resSpan1");
const resSpan2 = document.querySelector("#resSpan2");

let charIndex = mistakes = 0;
let wpm;

function randomParagraph(){
    let randIndex = Math.floor(Math.random() *(para.length-1));
    let randPara = para[randIndex];
    typingTest.querySelector("p").textContent = "";
    randPara.split("").forEach(span =>{
        let spanTag = `<span>${span}</span>`;
        typingTest.getElementsByTagName("p")[0].innerHTML += spanTag;
    })
    typingTest.getElementsByTagName("p")[0] = randPara;
}
randomParagraph();

function displayResult()
{
    let mesg,keyword;
    if(wpm>=0 && wpm<=20){
        mesg = "Good job, keep improving!";
        keyword = "good job";
    }
    else if(wpm>=21 && wpm<=40){
        mesg = "Wow!";
        keyword = "oh my god wow";
    }
    else if(wpm>=41 && wpm<=60){
        mesg = "Impressive!";
        keyword = "impressive";
    }
    else if(wpm>=61 && wpm<=100){
        mesg = "Excellent!";
        keyword = "noice";
    }
    else if(wpm>=101 && wpm<=120){
        mesg = "Outstanding!";
        keyword = "kya baat hai sir";
    }
    else if(wpm>=121 && wpm<=140){
        mesg = "Exceptional!";
        keyword = "pure talent";
    }
    else if(wpm>=141 && wpm<=160){
        mesg = "Typing Maniac!";
        keyword = "typing jim carrey";
    }
    else if(wpm>=161 && wpm<=180){
        mesg = "Remarkable!";
        keyword = "fantastic bill gates";
    }
    else {
        mesg = "Mind-blown!";
        keyword = "mind blown";
    }

    grab_data(keyword);
    resMesg.textContent = mesg; 
    resSpan1.textContent = wpm;
    resSpan2.textContent = `${((charIndex - mistakes) / charIndex * 100).toFixed(2)}%`;
    resBg.style.display = "flex";
    setTimeout(()=>{
        resBg.style.display = "none";
    },9000);
}

let timer;
let isFirstTime = true;
let timeLeft = 60;
let totalTime = 60;
function focusInputOnKeyPress() {
    inputField.focus();
}

function focusInputOnClick() {
    inputField.focus();
}

function enableTyping() {
    initTyping();
}
document.addEventListener("keydown",focusInputOnKeyPress);
typingTest.addEventListener("click",focusInputOnClick);
inputField.addEventListener("input",enableTyping);
tryAgainbtn.addEventListener("click",()=>{
    randomParagraph();
    timeLeft = totalTime;
    charIndex = mistakes = 0;
    isFirstTime = true;
    timeTag.innerText = timeLeft;
    mistakeTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
    document.addEventListener("keydown",focusInputOnKeyPress);
    typingTest.addEventListener("click",focusInputOnClick);
    inputField.addEventListener("input",enableTyping);
})

function initTimer(){
    timeLeft--;
    timeTag.textContent = timeLeft; 
    if(timeLeft===0){
        inputField.value = "";
        document.removeEventListener("keydown",focusInputOnKeyPress);
        typingTest.removeEventListener("click",focusInputOnClick);
        inputField.removeEventListener("input",enableTyping);
        clearInterval(timer);
        displayResult();
    }
}
function initTyping(){
    const characters = typingTest.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if(isFirstTime===true)
    {
        timer = setInterval(initTimer,1000);
        isFirstTime = false;
    }
    if(typedChar==null)
    {
        charIndex--;
        if(characters[charIndex].classList.contains("incorrect"))
        { mistakes--; }
        characters[charIndex].classList.remove("correct","incorrect");
    }
    else
    {
        console.log(typedChar);
        if(characters[charIndex].innerText== typedChar){
            characters[charIndex].classList.add("correct");
        }
        else{
            mistakes++;
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++;
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
    }
        mistakeTag.innerHTML = mistakes;
        cpmTag.innerText = charIndex-mistakes;

        let avgWordsCorrect = (charIndex-mistakes)/5;     //Words which are correct/ Avg no ofwords in English lang
        let timeElapsedinMin = (totalTime-timeLeft)/60;
        wpm = Math.round(avgWordsCorrect/timeElapsedinMin);
        if(wpm==0 || wpm==NaN|| !wpm|| wpm==Infinity)
        wpm = 0;
        wpmTag.innerText = wpm;
}


