const s = selektor => document.getElementById(selektor)
let drawString = ""
const numbersList = s("section-numbers")
const nizSlova = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const brojevi = []
const start = s("start")
const task = s("task")
let vreme = 5000
let brojac = -1
let interval
let game = false
const hit = s("hit")
const miss = s("miss")
const left = s("left")
// dodati brojac za odigran potez
let potez = false
let neodigrano
let dodaoKlasu = false
let pukaoMiMozak = true // ne mogu da smislim bolju logiku od ove proklete zastavice... sutra...

// ova funkcija pravi niz random brojeva koji se ne ponavljaju
function napuni() {
    for (let index = 0; index < 26; index++) {
        brojevi[index] = Math.floor(Math.random() * (27 - 1)) + 1
        for (j = 0; j < brojevi.length - 1; j++) {
            if (brojevi[index] == brojevi[j]) {
                brojevi.splice(index)
                index--
            }
        }
        // if(brojevi[index] in brojevi) {
        //     
        // }
    }
}

function intervalGame() {
    s("naslov").innerHTML = "GO!"
    brojac++
    task.innerHTML = brojevi[brojac]
    if (!dodaoKlasu) {
        let temp = brojevi[brojac - 1]
        s(`number${temp}`).classList.add("number-wrong")
        
        if (pukaoMiMozak) {
            let temp3 = Number(miss.innerHTML)
            temp3++
            miss.innerHTML = temp3
            let temp2 = Number(left.innerHTML)
            temp2--
            left.innerHTML = temp2
            pukaoMiMozak = false
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
    pukaoMiMozak = false
    potez = false
    dodaoKlasu = false
    neodigrano = true
    if (brojac > 25) {
        brojac = -1
        clearInterval(interval)
        task.innerHTML = "Game Over"
        game = false
        s("easy").removeAttribute("disabled")
        s("medium").removeAttribute("disabled")
        s("hard").removeAttribute("disabled")
        start.removeAttribute("disabled")
        
    }
}

function ocistiPolje() {
    for( let i = 1; i < 27; i++ ) {
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

start.addEventListener("click", function () {
    start.setAttribute("disabled", true)
    ocistiPolje()
    neodigrano = false
    s("easy").setAttribute("disabled", true)
    s("medium").setAttribute("disabled", true)
    s("hard").setAttribute("disabled", true)
    s("naslov").innerHTML = "GET READY!"
    task.innerHTML = "GET READY!"
    napuni()
    game = true
    interval = setInterval(intervalGame, vreme)
    hit.innerHTML = 0
    miss.innerHTML = 0
    left.innerHTML = 26
    pukaoMiMozak = true
})

document.addEventListener("keypress", function (e) {
    if (e.keyCode >= 97 && e.keyCode <= 122 && game == true && potez == false) {
        potez = true
        if (e.keyCode == (Number(task.innerHTML) + 96)) {
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

s("easy").addEventListener("change", function () {
    vreme = 5000
})
s("medium").addEventListener("change", function () {
    vreme = 3500
})
s("hard").addEventListener("change", function () {
    vreme = 2000
})

// useful links
// https://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
// https://stackoverflow.com/questions/16089421/simplest-way-to-detect-keypresses-in-javascript
// https://mathiasbynens.be/notes/javascript-escapes
