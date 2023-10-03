let buttons = document.getElementsByTagName("button");
let inputField = document.querySelector("#inputBox");
let arr = Array.from(buttons);


let string="";
arr.forEach((button) =>{
    button.addEventListener('click',(e)=>{
        if(e.target.innerHTML=='=')
        {
            try {
                string = eval(string);
                inputField.value = string;
              } catch (error) {
                inputField.value = 'Error';
                string = '';
              }
        }
        else if(e.target.innerHTML=='+/-')
        {
            let num = Number.parseInt(inputField.value);
            num = num*(-1);
            string = num.toString();
            inputField.value = string;
        }
        else if(e.target.innerHTML=='AC')
        {
            string="";
            inputField.value = string;
        }
        else if(e.target.innerHTML=='DEL')
        {
            string = string.slice(0,string.length-1);
            inputField.value = string;
        }
        else{
            string += e.target.innerHTML;
            inputField.value = string;
        }
    })
})