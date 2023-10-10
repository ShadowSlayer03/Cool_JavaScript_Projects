let inputBtn = document.getElementById("input-btn");
let searchBtn = document.getElementById("search-btn");
let solution = document.querySelector(".solution");
let sound = document.getElementById("sound"); //audio element for sound
let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

inputBtn.addEventListener('click',()=>{
    inputBtn.style.borderBottom = "3px solid #ae9cff";
})

document.addEventListener('click',(event)=>{
    const isClickedInsideInput = inputBtn.contains(event.target);
    
    if (!isClickedInsideInput) {
        inputBtn.style.borderBottom = "3px solid #dad8e1";
    }
})

function playSound() {
    sound.play();
}

searchBtn.addEventListener('click',()=>{
    if(inputBtn.value==="")
    alert("Type a word first!");
    else
    {
        //Clearing the solution of the previous resultDiv
        solution.innerHTML="";

        (()=>{
        let promise = fetch(url+inputBtn.value)
        .then((response)=>{
            return response.json();
        }).then((result)=>{
            console.log(result);
            let resultDiv = document.createElement("div");
            resultDiv.classList.add("result");
            resultDiv.innerHTML = `
            <div class="word">
                    <h3>${inputBtn.value}</h3>
                    <button><i class="fa-solid fa-volume-high fa-2xl" style="color: #ae9cff;"></i></button>
                </div>
                <div class="info">
                <div id="word-type">${result[0].meanings[0].partOfSpeech}</div>
                <div id="phonetics">${result[0].phonetics[1].text}</div>
                </div>
                <div class="meaning">
                </div>
                <div class="example">
                </div>`;
                function findAudioURL(phonetics) {
                    for (let j = 0; j < phonetics.length; j++) {
                        if (phonetics[j].audio !== '') {
                            return phonetics[j].audio;
                        }
                    }
                    return '';
                }
                sound.setAttribute("src", findAudioURL(result[0].phonetics));
                solution.appendChild(resultDiv);
                let meaningDiv = document.getElementsByClassName("meaning")[0];
                let exampleDiv = document.getElementsByClassName("example")[0];
                    for(let i=0;(i<6)&&(i<result[0].meanings[0].definitions.length);i++)
                    {
                        let def = result[0].meanings[0].definitions[i];
                        let para = document.createElement("p");
                        para.innerHTML = `${i+1}. ${def.definition}`;
                        meaningDiv.appendChild(para);
                    }
                    for(let i=0;(i<6)&&(i<result[0].meanings[0].definitions.length);i++)
                    {
                        let def = result[0].meanings[0].definitions[i].example;
                        if(def)
                        {
                        let para = document.createElement("p");
                        para.innerHTML = `${def}`;
                        exampleDiv.appendChild(para);
                        }
                    }
                let soundBtn = document.getElementsByClassName("word")[0].getElementsByTagName("button")[0];
                soundBtn.setAttribute("onclick","playSound()");
                })
        })()
    }
}) 