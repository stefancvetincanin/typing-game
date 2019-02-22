const s = selektor => document.getElementById(selektor)
let drawString = ""
const numbersList = s("section-numbers")
const nizSlova = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" ]

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


document.addEventListener("keypress", function(e) {
    alert(e.keyCode)
})