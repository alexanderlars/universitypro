function välj_random_ord(lista) {
    let randomtal = Math.floor(Math.random() * lista.length);
    let ordet = lista[randomtal];
    return ordet;
}


function animateLetters() {
    const letters = document.querySelectorAll('#gissade span');
    letters.forEach((letter, index) => {
        letter.style.animation = `popIn 0.5s ${index * 0.1}s forwards`;
    });
}

// Lägg till konfetti-effekt vid vinst
function showConfetti() {
    for (let i = 0; i < 100; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}


function ärGiltigBokstav(input) {
    return /^[a-öA-Ö]$/.test(input);
}

function countLetterOccurrences(word, letter) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            count++;
        }
    }
    return count;
}

function lista_till_ord(lista) {
    return lista.join('');
}

function läggTillLista(str, n, lista) {
    for (let k = 0; k < n; k++) {
        lista.push(str);
    }
    return lista;
}

function visa_gissat(ordet, rätta_gissningar) {
    let gissat = "";
    for (let bokstav of ordet) {
        if (rätta_gissningar.includes(bokstav)) {
            gissat += bokstav;
        } else {
            gissat += "_";
        }
    }
    return gissat;
}

let ordlista = ["python", "hänga", "robot", "fysik", "yxa", "programmera", "lund", "lynchning", "kvantmekanik", "elektron", "gravitation", "relativitetsteori", "termodynamik", "kärnkraft", "elektromagnetism", "fusion", "kvantfältteori", "partikelaccelerator", "strålning", "schrödinger", "ljusår", "atomkärna", "kvark", "antimateria", "vidunder", "snilleblixt", "dyrbar", "gemen", "furste", "förgäves", "ypperlig", "otyg", "styggelse", "häpen", "ömklig", "obehaglig", "mesopotamien", "akropolis", "byzantium", "vasadynastin", "napoleonkrigen", "industriellarevolutionen", "kolonialimperier", "amerikanskainbördeskriget", "bolsjevikrevolutionen", "paleolitikum", "neolitikum", "hansaförbundet", "mayacivilisationen", "renässanskonst", "feudalsamhället", "reformationen", "kolonialkrig", "franskarevolutionen", "suezkrisen", "pyrrhusseger", "karybdis"];
let ordet = välj_random_ord(ordlista);
let antal_gissningar = 10;

console.log(ordet)

let ord = "";
for (let k of ordet) {
    ord += "_";
}
document.getElementById("antalgiss").textContent = "Du har " + antal_gissningar + " gissningar kvar";
document.getElementById("ordet").textContent = ord;

let lista_över_gissade = [];
let rätta_gissningar = [];

document.getElementById("Submitguess").onclick = function () {

    let guess = document.getElementById("myguess").value.toLowerCase();

    if (!ärGiltigBokstav(guess)) {
        document.getElementById("respons").textContent = "Vänligen ange endast en BOKSTAV";
        return;
    }

    if (lista_över_gissade.includes(guess) || rätta_gissningar.includes(guess)) {
        document.getElementById("respons").textContent = "Du har redan gissat på denna bokstav";
    } else if (ordet.includes(guess)) {
        document.getElementById("respons").textContent = "Bokstaven du gissade FANNS i ordet!";
        let n = countLetterOccurrences(ordet, guess);
        läggTillLista(guess, n, rätta_gissningar);
        document.getElementById("ordet").textContent = visa_gissat(ordet, rätta_gissningar);
    } else {
        document.getElementById("respons").textContent = "Bokstaven du gissade fanns INTE i ordet";
        antal_gissningar--;
        document.getElementById("antalgiss").textContent = "Du har " + antal_gissningar + " gissningar kvar";
    }

    if(!lista_över_gissade.includes(guess)){
        lista_över_gissade.push(guess);}

    document.getElementById("gissade").textContent = lista_över_gissade.join(', ')

    if (antal_gissningar <= 0) {
        document.getElementById("respons").textContent = "Du har slut på gissningar! Ordet var: " + ordet;
    } else if (visa_gissat(ordet, rätta_gissningar) === ordet) {
        document.getElementById("respons").textContent = "Grattis du vann!! Ordet var: " + ordet.charAt(0).toUpperCase()+ordet.slice(1);
        showConfetti()
    }

    document.getElementById("myguess").value=""


}