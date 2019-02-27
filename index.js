const monsterURL = "http://localhost:3000/monsters"
const monsterCreator = document.querySelector("#create-monster")
const monsterContainer = document.querySelector("#monster-container")
const backButton = document.querySelector("#back")
const forwardButton = document.querySelector("#forward")
let counter = 1

document.addEventListener("DOMContentLoaded",function(){
  getMonsters()
})

function getMonsters(){
  return fetch(`${monsterURL}/?_limit=50&_page=${counter}`)
  .then(res => res.json())
  .then(monsters => monsters.forEach(showMonsters))
}

function showMonsters(monster){
  // console.log(monster);
  const monsterCard = document.createElement('div')
  const monsterName = document.createElement('li')
  const monsterAge = document.createElement('li')
  const monsterDesc = document.createElement('li')
  const monsterId = document.createElement('li')
  monsterName.innerHTML = `Name: ${monster.name}`
  monsterAge.innerHTML = `Age: ${monster.age}`
  monsterDesc.innerHTML = `Description: ${monster.description}`
  monsterId.innerHTML = `ID: ${monster.id}`
  monsterCard.append(monsterId,monsterName,monsterAge,monsterDesc)
  monsterContainer.append(monsterCard)
}

monsterCreator.addEventListener("submit",addMonster)

function addMonster(event){
  event.preventDefault()
  newMonsterName = event.target[0].value
  newMonsterDescription = event.target[1].value
  newMonsterAge = event.target[2].value
  fetch(monsterURL,{
    method:"POST",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify({
      name: newMonsterName,
      description: newMonsterDescription,
      age: newMonsterAge
    })
  }).then(console.log);
}

forwardButton.addEventListener("click",showNextFifty)

function showNextFifty(){
  counter += 1
  monsterContainer.innerHTML= ""
  fetch(`${monsterURL}/?_limit=50&_page=${counter}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(showMonsters))
}

backButton.addEventListener("click",showLastFifty)

function showLastFifty(){
  counter -=1
  monsterContainer.innerHTML= ""
  fetch(`${monsterURL}/?_limit=50&_page=${counter}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(showMonsters))
}
