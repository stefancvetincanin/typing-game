const s = selektor => document.getElementById(selektor)
let drawString = ""
const numbersList = s("section-numbers")
const nizSlova = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const brojevi = []
const start = s("start") // game start/stop button
const task = s("task") // instructions header
let vreme = 5000 // interval between the moves
let brojac = -1
let interval = ""
let game = false // is the game running or not?
const hit = s("hit")
const miss = s("miss")
const left = s("left")
let potez = false // indicates if the player has made his move during the current turn
let neodigrano = false // has the player missed the move during his turn?
let dodaoKlasu = false // checks if a hit/miss indicator has been displayed for the current turn
let konverzija = 0 // temp variable used to convert capital case letters to the same code as the lower case ones
let prviTurn = true // is it the first turn?

// Generates a non-repeating array of random numbers
function generateNumbers() {
  for (let index = 0; index < 26; index++) {
    brojevi[index] = Math.floor(Math.random() * (27 - 1)) + 1
    for (j = 0; j < brojevi.length - 1; j++) {
      if (brojevi[index] == brojevi[j]) {
        brojevi.splice(index)
        index--
      }
    }
  }
}

// Stops the game
function stopirajIgru() {
  brojac = -1
  clearInterval(interval)
  task.innerHTML = "Game Over"
  game = false
  start.innerHTML = "Start Game"
  s("easy").removeAttribute("disabled")
  s("medium").removeAttribute("disabled")
  s("hard").removeAttribute("disabled")
  start.removeAttribute("disabled")
  s("naslov").innerHTML = "Game Over!"
  prviTurn = true
}

// Main game logic, changes the target number at the speed set by the difficulty setting, adds a "Miss" indicator if the player has failed to play the previous turn
// Counts the turns elapsed
// Could be written more elegantly and efficiently
function intervalGame() {
  s("naslov").innerHTML = "Go!"
  brojac++
  task.innerHTML = brojevi[brojac]
  if (!dodaoKlasu) {
    let temp = brojevi[brojac - 1]
    if (prviTurn == false) {
      s(`number${temp}`).classList.add("number-wrong")
    }
  }
  if (neodigrano) {
    let temp = Number(miss.innerHTML)
    temp++
    miss.innerHTML = temp
    let temp2 = Number(left.innerHTML)
    temp2--
    left.innerHTML = temp2
    dodaoKlasu = false
  }
  prviTurn = false
  potez = false
  dodaoKlasu = false
  neodigrano = true
  if (brojac > 25) {
    setTimeout(function() {
      alert(`
              Your score is:\n
              Hit: ${hit.innerHTML}!\n
              Miss: ${miss.innerHTML}!\n
              Left: ${left.innerHTML}
            `)
    }, 30)
    stopirajIgru()
  }
}

// Clears the success/failure indicators from the previous round
function ocistiPolje() {
  for (let i = 1; i < 27; i++) {
    s(`number${i}`).classList.remove("number-correct")
    s(`number${i}`).classList.remove("number-wrong")
  }
}

// Populating the numbers divs
for (let i = 1; i < 27; i++) {
  let tempDraw = `
        <div class="number-item" id="number${i}">
            <h3>${nizSlova[i - 1]} (${i})</h3>
        </div>
    `
  drawString += tempDraw
}
numbersList.innerHTML = drawString

// starts the game (or stops it if the game is running)
start.addEventListener("click", function () {
  if (!game) {
    ocistiPolje()
    neodigrano = false
    s("easy").setAttribute("disabled", true)
    s("medium").setAttribute("disabled", true)
    s("hard").setAttribute("disabled", true)
    s("naslov").innerHTML = "GET READY!"
    task.innerHTML = "GET READY!"
    generateNumbers()
    game = true
    start.innerHTML = "Stop Game"
    interval = setInterval(intervalGame, vreme)
    hit.innerHTML = 0
    miss.innerHTML = 0
    left.innerHTML = 26
  } else {
    stopirajIgru()
  }
})

// Event listener for keypresses during gameplay
// Equates the upper case letters to lower case letters for the purposes of the game
// If you hit the correct number, it adds a "Hit" indication to the numbers display, else it adds a "Miss"
// Also increments the scoreboard
document.addEventListener("keypress", function (keyEvent) {
  if (keyEvent.keyCode >= 65 && keyEvent.keyCode <= 90) {
    konverzija = keyEvent.keyCode + 32
  } else {
    konverzija = keyEvent.keyCode
  }
  if (konverzija >= 97 && konverzija <= 122 && game == true && potez == false) {
    potez = true
    if (konverzija == (Number(task.innerHTML) + 96)) {
      s(`number${task.innerHTML}`).classList.add("number-correct")
      dodaoKlasu = true
      let temp = Number(hit.innerHTML)
      temp++
      hit.innerHTML = temp
      let temp2 = Number(left.innerHTML)
      temp2--
      left.innerHTML = temp2
      neodigrano = false
    } else {
      s(`number${task.innerHTML}`).classList.add("number-wrong")
      dodaoKlasu = true
      let temp = Number(miss.innerHTML)
      temp++
      miss.innerHTML = temp
      let temp2 = Number(left.innerHTML)
      temp2--
      left.innerHTML = temp2
      neodigrano = false
    }
  }
})

// Difficulty selectors - changes the time the player has to make a move during a turn
s("easy").addEventListener("change", function () {
  vreme = 5000
})
s("medium").addEventListener("change", function () {
  vreme = 3500
})
s("hard").addEventListener("change", function () {
  vreme = 2000
})