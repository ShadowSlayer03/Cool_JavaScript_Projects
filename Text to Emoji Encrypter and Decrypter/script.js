let encTextBtn = document.querySelector("#enc-btn");
let decTextBtn = document.querySelector("#dec-btn");
let encryptionDiv = document.querySelector("#encryption")
let decryptionDiv = document.querySelector("#decryption")
let encryptBtn = document.querySelector("#encrypt-btn");
let decryptBtn = document.querySelector("#decrypt-btn");
let icon = document.querySelector("#main h1 i");
let textArea1 = document.querySelector("#message1");
let pswdInp1 = document.querySelector("#paswd-input1");
let textArea2 = document.querySelector("#message2");
let pswdInp2 = document.querySelector("#paswd-input2");
let resultDiv = document.querySelector("#result");
let emojiResult = "";


encTextBtn.addEventListener('click',()=>{
    encTextBtn.style.backgroundColor = "#333";
    decTextBtn.style.backgroundColor = "#222222";
    decryptionDiv.style.display = "none";
    encryptionDiv.style.display = "block";
    icon.classList.remove("fa-arrow-left");
    icon.classList.add("fa-arrow-right");
})

decTextBtn.addEventListener('click',()=>{
    resultDiv.style.display = "none";
    decTextBtn.style.backgroundColor = "#333";
    encTextBtn.style.backgroundColor = "#222222";
    decryptionDiv.style.display = "block";
    encryptionDiv.style.display = "none";
    icon.classList.remove("fa-arrow-right");
    icon.classList.add("fa-arrow-left");
})

encryptBtn.addEventListener("mouseenter",()=>{
    document.querySelector("#encrypt-btn i").style.color = "#1c1c1c";
})
encryptBtn.addEventListener("mouseleave",()=>{
    document.querySelector("#encrypt-btn i").style.color = "white";
})

decryptBtn.addEventListener("mouseenter",()=>{
    document.querySelector("#decrypt-btn i").style.color = "#1c1c1c";
})
decryptBtn.addEventListener("mouseleave",()=>{
    document.querySelector("#decrypt-btn i").style.color = "white";
})

encryptBtn.addEventListener("click",()=>{
    let mesg1 = textArea1.value;
    let password1 = pswdInp1.value;
    localStorage.setItem(mesg1,password1);

    const str = mesg1.split("");
    str.forEach(element => {
        emojiResult += `&#128${element.charCodeAt()}` 
    });

    resultDiv.innerHTML = `<p>${emojiResult}</p><button id="copy-button">Copy</button>`;
    resultDiv.style.display = "block";

    const copyButton = document.getElementById('copy-button');

    const parser = new DOMParser();
    const decodedHTML = parser.parseFromString(emojiResult, 'text/html').body.textContent; //emoji

    localStorage.setItem(decodedHTML,textArea1.value);

    copyButton.addEventListener('click', function () {
        // Copy the selected text to the clipboard
        navigator.clipboard.writeText(decodedHTML).then(function() {
            console.log('Text copied to clipboard: ' + decodedHTML);
        }).catch(function(err) {
            console.error('Unable to copy text: ' + err);
        });

        copyButton.innerText = 'Copied!';
        
        setTimeout(function () {
            copyButton.innerText = 'Copy';
        }, 2000);
    });
})

decryptBtn.addEventListener('click',()=>{
    let mesg2 = textArea2.value;   //emoji
    let password2 = pswdInp2.value;
    let string = localStorage.getItem(mesg2);
    let storedPasswd = localStorage.getItem(string);
    console.log(storedPasswd);
    if(password2!=storedPasswd){
        resultDiv.innerHTML = `<p><i class="fa-solid mr-5 fa-triangle-exclamation" style="color: #ebf91f;"></i>Sorry decryption failed! You have entered the wrong password!</p>`;
    }
    else{
        resultDiv.innerHTML = `<p>${string}</p>`
    }
    resultDiv.style.display = "block";
})

