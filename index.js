let submit =  document.getElementById('submit')
let pairList = document.getElementById('pairList')
let createList = document.createElement('ul')
pairList.append(createList)

let pairArray = JSON.parse(localStorage.getItem("pairs")) || []

submit.onclick = function (pair){
    pair.preventDefault()
    let input = document.getElementById('nameValue')
    let inputSpaceRemove = input.value.trim()
    let regex = /^\s*([a-zA-Z0-9]+)\s*=\s*([a-zA-Z0-9]+)\s*$/
    let match = inputSpaceRemove.match(regex)

    if (!match){
        alert('Format is incorrect!')
        return input.value=""
    }

    let name = match[1];
    let value = match[2];

    let list=document.createElement('li')
    pairArray.push({ name: name, value: value })
    list.textContent=`${name}=${value}`
    localStorage.setItem("pairs", JSON.stringify(pairArray))

    list.onclick=function (){
        list.classList.toggle('selected')
    }
    createList.appendChild(list)
    input.value=""
    console.log(pairArray)
}


let sortByName = document.getElementById('sortByName')
sortByName.onclick=function (){
    pairArray.sort((a,b)=>{
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
    })
    createList.innerHTML = ""

    for (let pair of pairArray) {
        let list = document.createElement('li');
        list.innerText = `${pair.name}=${pair.value}`;

        list.onclick=function (){
            list.classList.toggle('selected')
        }
        createList.appendChild(list)}
    localStorage.setItem("pairs", JSON.stringify(pairArray))
    console.log(pairArray)
}


let sortByValue = document.getElementById('sortByValue')
sortByValue.onclick=function(){
    pairArray.sort((a,b)=>{
        if (a.value > b.value) return 1
        if (a.value < b.value) return -1
    })
    createList.innerHTML = ""

    for (let pair of pairArray) {
        let list = document.createElement('li');
        list.textContent = `${pair.name}=${pair.value}`;

        list.onclick=function (){
            list.classList.toggle('selected')
        }
        createList.appendChild(list)}
        localStorage.setItem("pairs", JSON.stringify(pairArray))
    console.log(pairArray)
}


let deleteBtn = document.getElementById('deleteBtn')
deleteBtn.onclick = function (){
    let selected = document.querySelectorAll('.selected')
    selected.forEach(item=>{
         item.remove()
         pairArray=pairArray.filter(pair => pair.name !== item.innerText.split('=')[0])})

    localStorage.setItem("pairs", JSON.stringify(pairArray))
}

window.addEventListener("load",function (){
        createList.innerHTML = ""
        pairArray.forEach(pair => {
            let list = document.createElement('li');
            list.innerText = `${pair.name}=${pair.value}`;
            list.onclick = function () {
                list.classList.toggle('selected');
            };
            createList.appendChild(list);
        })
    }
)
