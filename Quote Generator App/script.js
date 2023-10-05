const api_url = "https://api.quotable.io/quotes/random?tags=";
let randQuoteBtn = document.getElementById("buttons-div").getElementsByTagName("button")[0];
let tweetBtn = document.getElementById("buttons-div").getElementsByTagName("button")[1];
let quoteElement = document.querySelector("blockquote");
let span = document.querySelector(".quote-div").getElementsByTagName("span")[0];

let success = document.querySelectorAll(".button")[0];
let tech = document.querySelectorAll(".button")[1];
let history = document.querySelectorAll(".button")[2];
let life = document.querySelectorAll(".button")[3];

let getQuote = async(url)=>{
    let p = await fetch(url);
    let result = await p.json();
    return result;
}

async function printQuote(tag){
    let randomQuote = await getQuote(api_url+tag);
    quoteElement.innerHTML = `${randomQuote[0].content}`;
    span.innerHTML = `<b>${randomQuote[0].author}</b>`
}

async function printRandomQuote(){
    let randomQuote = await getQuote("https://api.quotable.io/quotes/random");
    quoteElement.innerHTML = `${randomQuote[0].content}`;
    span.innerHTML = `<b>${randomQuote[0].author}</b>`;
}

randQuoteBtn.addEventListener('click',printRandomQuote);

success.addEventListener('click', ()=>printQuote("success"));
tech.addEventListener('click', ()=>printQuote("technology"));
history.addEventListener('click', ()=>printQuote("history"));
life.addEventListener('click', ()=>printQuote("life"));

function tweet(){
    window.open("https://twitter.com/intent/tweet?text="+quoteElement.innerHTML+" - "+span.textContent,"Tweet Window","width=600, height=300")
}

tweetBtn.addEventListener('click',()=>tweet());
