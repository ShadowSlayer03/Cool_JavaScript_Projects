const inputBox = document.getElementById("input-box");
const listContainer = document.querySelector("#list-container");
let addBtn = document.getElementsByTagName("button")[0];

function addTask(){
    if(inputBox.value === '')
    alert("Write a task first!")

    else
    {
        let a = document.createElement("li");
        a.textContent = inputBox.value;
        // localStorage.setItem("")
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        a.append(span);
        listContainer.appendChild(a);
    }
    inputBox.value = '';
    saveData();
}
addBtn.addEventListener('click',addTask);

listContainer.addEventListener("click",(e)=>{
    if(e.target.tagName == "LI")
    {
    e.target.classList.toggle("checked");
    saveData();
    }

    else if(e.target.tagName == "SPAN")
    {
    e.target.parentElement.remove();
    saveData();
    }
})

function saveData()
{
    localStorage.setItem("data",listContainer.innerHTML)
}

window.onload = function showTasksAfterReload()
{
    let b = localStorage.getItem("data");
    listContainer.innerHTML = b;
}
