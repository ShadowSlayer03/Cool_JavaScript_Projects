function getRandomWordandHint() {
    let randomIndex = Math.floor(Math.random() * (wordList.length - 1));
    return [wordList[randomIndex].word, wordList[randomIndex].hint];
}

var alphabetBtns = document.getElementsByClassName("letters")[0].getElementsByTagName("button");
var unorderedList = document.getElementById("word");
var hint = document.getElementById("hint");
var span = document.querySelector(".content h5 span");
var image = document.querySelector(".image img");
var gameModal = document.querySelector(".game-modal");
var pElement = document.querySelector(".gm-content p");
// Call the getRandomWordandHint function first
    var random = getRandomWordandHint();
    var guesses = 6;
    var randomWord = random[0];
    var randomHint = random[1];
for (let j = 0; j < randomWord.length; j++) 
{
    let li = document.createElement("li");
    li.style.width = "28px";
    unorderedList.appendChild(li);
}
hint.textContent = `Hint: ${randomHint}`;


let listItems = unorderedList.getElementsByTagName("li");
document.addEventListener('keypress', (event) => {
    let btnPressed = event.key.toUpperCase();
    let alphabetBtnsArray = Array.from(alphabetBtns);
    alphabetBtnsArray.forEach((alphabet) => {
        if (btnPressed == alphabet.textContent) {
            const mousedownEvent = new MouseEvent('mousedown', {
                bubbles: true,
                cancelable: true,
                view: window,
            });
            alphabet.dispatchEvent(mousedownEvent);
            alphabet.click();
        }
    })
});

function blockButton(btnClicked)
{
    btnClicked = btnClicked.toUpperCase();
    for(let a=0;a<26;a++)
    {
        if(btnClicked==(alphabetBtns[a].textContent))
        {
            alphabetBtns[a].disabled = true;
        }
    }
}

for (let i = 0; i < alphabetBtns.length; i++) {
    alphabetBtns[i].addEventListener('mousedown', (event) => {
        event.target.classList.add('btn-active');
        setTimeout(()=>{
            event.target.classList.remove('btn-active');
        },200)
    });

    alphabetBtns[i].addEventListener('click', (event) => {
        let alphabetClicked = event.target.textContent.toLowerCase();
        let flag=0;
        console.log(alphabetClicked);
        blockButton(alphabetClicked);
        for (let j = 0; j < randomWord.length; j++) {
            if (randomWord[j] == alphabetClicked) {
                flag++;
                listItems[j].style.borderBottom = 'none';
                listItems[j].innerHTML = alphabetClicked;
            }
        }
        if(flag==0){
            guesses--;
            span.textContent = `${guesses} / 6`;
            image.src = `./images/hangman-${6-guesses}.svg`
        }
        let guessedCorrectly = 0;
        for(let k=0;k<randomWord.length;k++){
            if(listItems[k].innerHTML!="")
            guessedCorrectly++;
        }
        if(guessedCorrectly==randomWord.length){
            document.querySelector(".gm-content img").src = "./images/win.png";
            document.querySelector(".gm-content h4").textContent = "Hangman is spared thanks to your valor!";
            document.querySelector(".gm-content").removeChild(pElement);
            gameModal.style.display = "flex";
        }
        else{
        if(guesses==0){
            pElement.innerHTML = `The correct word was: <b>${randomWord}</b>`;
            gameModal.style.display = "flex";
        }
        }
    });
}

document.querySelector(".play-again").addEventListener('click',()=>{
    location.reload();
})
