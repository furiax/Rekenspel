const vraag = document.getElementById("vraag");
const correctSpan = document.getElementById("correct");
const foutiefSpan = document.getElementById("foutief");
const puzzel = document.getElementById("puzzel");
const rekenzone = document.getElementById("rekenzone");
const message = document.getElementById("overwinningsboodschap");
const speelOpnieuwKnop = document.getElementById("speelopnieuw");
document.getElementById("huidigJaartal").textContent = new Date().getFullYear();

const maxNumber = 8;
const operations = ['+','-'];
let eersteGetal, tweedeGetal, operator;
let windowWidth = window.innerWidth
let isBeantwoord = false;

/*const afbeeldingArray = [
    './images/Poes.jpg',
    './images/camille.jpg',
    './images/pomelien.jpg',
    './images/rainbow-high.jpg',
    './images/vaiana.jpg',
    './images/ariel.jpg',
    './images/k3.jpg',
    './images/k3-zeemeermin.jpg',
    './images/wednesday.jpg',
    './images/monsterhigh-frankie.jpg',
    './images/monsterhigh-werewolf.jpg',
    './images/monsterhigh-vampiregirl.jpg',
    './images/monsterhigh.jpg',
    './images/pikachu.jpg',
];*/

const afbeeldingArray = [
    './images/kerst1.jpg',
    './images/kerst2.jpg',
    './images/kerst3.jpg',
    './images/kerst4.jpg',
    './images/kerst5.jpg',
    './images/kerst6.jpg',
    './images/kerst7.jpg',
    './images/kerst8.jpg',
    './images/kerst9.jpg',
    './images/kerst10.jpg',
    './images/kerst11.jpg',
    './images/kerst12.png',
]

const rows = 3;
const cols = 4;
const totaalAantalStukken = rows * cols;

let aantalVragenGesteld = 0;
let puzzelStukken = [];

function createPuzzle(){
    puzzel.innerHTML='';
    puzzelStukken = [];

    let imgSrc = afbeeldingArray[Math.floor(Math.random()* afbeeldingArray.length)];
    for(let i = 0; i < totaalAantalStukken; i++){
        const puzzelstuk = document.createElement('div');
        puzzelstuk.classList.add('puzzelstuk');
        puzzelstuk.style.backgroundImage = `url(${imgSrc})`;
    
        const colIndex = i % cols;
        const rowIndex = Math.floor(i / cols);

        let colWidth = 150;
        let rowHeight = 200;
        
        if(windowWidth <= 600 ){
            colWidth = 90;
            rowHeight = 120;
        }

        puzzelstuk.style.backgroundPosition = `-${colIndex* colWidth}px -${rowIndex * rowHeight}px`;
      
        puzzel.appendChild(puzzelstuk);
        puzzelStukken.push(puzzelstuk);
    }
    
    const img = new Image();
    img.src = imgSrc;

    img.onload = () => {
        let imgWidth = img.width;
        let imgHeight = img.height;

        if(windowWidth <=600){
            imgWidth = 400;
            imgHeight = 400;
        }
        const bgWidth = imgWidth;
        const bgHeight = imgHeight;
    
        puzzelStukken.forEach((stuk) => {
                stuk.style.backgroundSize = `${bgWidth}px ${bgHeight}px`;
            });
        };
}

function genereerGetallen(){
    eersteGetal = Math.floor(Math.random()*(maxNumber+1));
    do {
        tweedeGetal = Math.floor(Math.random() * ((maxNumber-eersteGetal) + 1));
    } while (eersteGetal == 0 && tweedeGetal == 0);

    operator = operations[Math.floor(Math.random()*operations.length)];
    
    if(operator === '-'){
        while((eersteGetal - tweedeGetal) < 0 ){
            tweedeGetal = Math.floor(Math.random()*((maxNumber-eersteGetal)+1));
        }
    }
}

function genereerVraag(){
    isBeantwoord = false;
    genereerGetallen();
    vraag.innerText = `${eersteGetal} ${operator} ${tweedeGetal} =`;
    userInput.value = "";
}

function validInput(input){
    const regex = new RegExp(`[^0-${maxNumber}]`, 'g');
    input.value = input.value.replace(regex, '');
    if ((input.value.startsWith("0") && input.value.length > 1) || input.value.length > 1 ){
        input.value = input.value.slice(1);
    }
    setTimeout(function(){
        checkResultaat();
    }, 1000);  
}

function checkResultaat(){
    if(isBeantwoord){
        return;
    }
    let userInput = document.getElementById("userInput");
    let resultaat;
    switch(operator){
        case '+': resultaat = eersteGetal + tweedeGetal; break;
        case '-': resultaat = eersteGetal - tweedeGetal; break;
    }

    foutiefSpan.classList.add('d-none');

    if (userInput.value == resultaat)
    {
        isBeantwoord = true;
        correctSpan.classList.remove('d-none');
        toonPuzzelstuk();

        if(aantalVragenGesteld >= totaalAantalStukken){
            setTimeout(function(){
                rekenzone.classList.add('d-none');
                message.innerText += "Goed gedaan!"
                speelOpnieuwKnop.style.display = 'inline-block';
                speelOpnieuwKnop.style.visibility = 'visible';
            }, 1000);
        }else{
        setTimeout(function(){
            genereerVraag();
            correctSpan.classList.add('d-none');
            isBeantwoord = false;
            }, 1000);
        }
    }
    else{
        foutiefSpan.classList.remove('d-none');
        userInput.value = "";
    }
}

function toonPuzzelstuk(){
    if(aantalVragenGesteld < totaalAantalStukken){
        puzzelStukken[aantalVragenGesteld].style.display = 'block';
        aantalVragenGesteld++;
    }
}

function reset(){
    aantalVragenGesteld = 0;
    rekenzone.classList.remove('d-none');
    speelOpnieuwKnop.style.display = 'none';
    speelOpnieuwKnop.style.visibility = 'hidden';
    message.innerText= "";
    correctSpan.classList.add('d-none');
    genereerVraag();
    createPuzzle();
}

genereerVraag();
createPuzzle();

//snowflake code:
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Randomize snowflake size
    const size = Math.random() * 10 + 5; // Between 5px and 15px
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Randomize starting position
    snowflake.style.left = `${Math.random() * 100}vw`;

    // Randomize animation duration
    const fallDuration = Math.random() * 3 + 2; // Between 2s and 5s
    snowflake.style.animationDuration = `${fallDuration}s`;

    // Append to the container
    document.getElementById('snow-container').appendChild(snowflake);

    // Remove the snowflake after it has fallen
    setTimeout(() => {
        snowflake.remove();
    }, fallDuration * 1000);
}

// Continuously generate snowflakes
setInterval(createSnowflake, 200);
