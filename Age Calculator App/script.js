let dateSelector = document.querySelector("#select-date");
let calcBtn = document.querySelectorAll("button")[0];
let ansDiv = document.querySelector(".answer");

function evalAge(year,month,day) //this fn finds the age in years,months,days
{
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    let diffYears = currentYear - year;
    let diffMonths = currentMonth - month;
    let diffDays = currentDay - day;

    if(diffDays<0)
    {
        diffMonths --;
        if(currentMonth===1)
        {
        var prevMonth = 12;
        }
        else
        {
            prevMonth = currentMonth-1;
        }
        if((prevMonth)>=8 && (prevMonth%2==0))
        { var bal = 31;}
        else if((prevMonth)>=8 && (prevMonth%2!=0))
        { bal = 30; }
        else if((prevMonth)<8 && (prevMonth%2!=0))
        {bal = 31;}
        else if((prevMonth)<8 && (prevMonth%2==0))
        {bal = 30;}
        
        diffDays += bal;
    }

    if(diffMonths<0)
    {
        diffYears--;
        diffMonths+=12;
    }
    return [diffYears,diffMonths,diffDays];
}

calcBtn.addEventListener('click',()=>{
    if(dateSelector.value==='')
    {
        alert("Select a date!");
    }
    else
    {
        let a = dateSelector.value;
        let val = a.slice(0,4);
        const year = Number.parseInt(val);
        val = a.slice(5,7);
        const month = Number.parseInt(val);
        val = a.slice(8);
        const day = Number.parseInt(val);
        let arr = evalAge(year,month,day);
        ansDiv.innerHTML = `You are <span class="value">${arr[0]}</span> years, <span class="value">${arr[1]}</span> months and <span class="value">${arr[2]}</span> days old.`
    }
})

