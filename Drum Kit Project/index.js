let btns = document.querySelectorAll("button");

function buttonPressed(i)
{
    btns[i].classList.add("pressed");
    setTimeout(()=>{
        btns[i].classList.remove("pressed");
    },200)
}
for(let i=0;i<btns.length;i++)
{
    btns[i].addEventListener("click",()=>{
        buttonPressed(i);
        switch(btns[i].textContent)
        {
            case 'w':
                {
                    let audio = new Audio('./sounds/crash.mp3');
                    audio.play();
                    break;
                }
            case 'a':
                {
                    
                    let audio = new Audio('./sounds/kick-bass.mp3');
                    audio.play();
                    break;
                }
            case 's':
                {
                    let audio = new Audio('./sounds/snare.mp3');
                    audio.play();
                    break;
                }
            case 'd':
                {
                    let audio = new Audio('./sounds/tom-1.mp3');
                    audio.play();
                    break;
                }
            case 'j':
                {
                    let audio = new Audio('./sounds/tom-2.mp3');
                    audio.play();
                    break;
                }
            case 'k':
                {
                    let audio = new Audio('./sounds/tom-3.mp3');
                    audio.play();
                    break;
                }
            case 'l':
                {
                    let audio = new Audio('./sounds/tom-4.mp3');
                    audio.play();
                    break;
                }
        }
    })
}

document.addEventListener("keydown",(event)=>{
    console.log(event);
    let index=-1;
    for(let i=0;i<btns.length;i++)
    {
        if(event.key == btns[i].textContent)
        {
        index = i;
        break;
        }
    }
    if(index!=-1)
    buttonPressed(index);
    switch(event.key)
    {
        case 'w':
            {
                let audio = new Audio('./sounds/crash.mp3');
                audio.play();
                break;
            }
        case 'a':
            {
                let audio = new Audio('./sounds/kick-bass.mp3');
                audio.play();
                break;
            }
        case 's':
            {
                let audio = new Audio('./sounds/snare.mp3');
                audio.play();
                break;
            }
        case 'd':
            {
                let audio = new Audio('./sounds/tom-1.mp3');
                audio.play();
                break;
            }
        case 'j':
            {
                let audio = new Audio('./sounds/tom-2.mp3');
                audio.play();
                break;
            }
        case 'k':
            {
                let audio = new Audio('./sounds/tom-3.mp3');
                audio.play();
                break;
            }
        case 'l':
            {
                let audio = new Audio('./sounds/tom-4.mp3');
                audio.play();
                break;
            }
            default:
            {
                alert("Click the right keys!");
            }
    }
})