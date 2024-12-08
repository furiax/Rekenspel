const vraag = document.getElementById("vraag");
const correctSpan = document.getElementById("correct");
const foutiefSpan = document.getElementById("foutief");

const maxNumber = 6;
const operations = ['+','-'];
let eersteGetal, tweedeGetal, operator;

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

function genereerVolgendeVraag(){
    genereerGetallen();
    vraag.innerText = `${eersteGetal} ${operator} ${tweedeGetal} =`;
    userInput.value = "";
}
function checkResultaat(){
    let userInput = document.getElementById("userInput");
    let resultaat;
    switch(operator){
        case '+': resultaat = eersteGetal + tweedeGetal; break;
        case '-': resultaat = eersteGetal - tweedeGetal; break;
    }
    foutiefSpan.classList.add('d-none');
    if (userInput.value == resultaat)
    {
        correctSpan.classList.remove('d-none');
        setTimeout(function(){
            genereerVolgendeVraag();
            correctSpan.classList.add('d-none');
        }, 1000);
    }
    else{
        foutiefSpan.classList.remove('d-none');
        userInput.value = "";
    }
}
function validInput(input){
    const regex = new RegExp(`[^0-${maxNumber}]`, 'g');
    input.value = input.value.replace(regex, '');
    if ((input.value.startsWith("0") && input.value.length > 1) || input.value.length > 1 ){
        input.value = input.value.slice(1);
    }
}

genereerVolgendeVraag();

