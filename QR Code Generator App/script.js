let url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=";
let textField = document.querySelector("#text-field");
let btn = document.querySelector(".container").getElementsByTagName("button")[0];
let qrcodeDiv = document.querySelector(".qrcode-div");


btn.addEventListener('click',()=>{
    if(textField.value==="")
    {
        alert("Enter a text or URL first!")
    }
    else
    {
            let img = document.createElement("img");
            img.src = url+textField.value;
            img.alt = "qrcode";
            img.style.borderRadius = "10px";
            qrcodeDiv.innerHTML = "";
            qrcodeDiv.appendChild(img);
    }
})

