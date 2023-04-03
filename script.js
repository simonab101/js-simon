/*

Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

1. genero i numei univici random e li salvo in RANDOM_NUMBERS
2. stampo il messaggio di inizio
3. parte il countdown aggiornando il timer
4. interrompo il countdown e aggiorno il messaggio
5. dopo la fine del countdown richiedo i prompt per l'inserimento dei numeri
6. faccio scrivere 5 numeri (sempre diversi) all'utente
7. salvare in un array i numeri indovinati
8. messaggio di fine gioco (se non indovinato nulla devo scrivere "Non hai indovinato nulla" altrimenti il punteggio)
*/


/********** 
  INIT
***********/

const TOTAL_NUMBERS = 5;
let SECONDS_TO_WAIT = 5;
const RANDOM_NUMBERS = [];

/********** 
  FUNCTION
***********/

const getRandomNumber = (max, min) => Math.floor(Math.random() * (max - min +1 ) + min);

const printMessages = (message, numbers) =>{
    document.getElementById('message').innerHTML = message;
    document.getElementById('numbers').innerHTML = numbers.join(' - ');
}

const getUserNumbers = () => {
    const numbers = [];
    // popolo con i prompt l'array numbers e lo restituisco
    while(numbers.length < TOTAL_NUMBERS){
        //TODO: fare un controllo sulla validità del numero inserito
        const newNumber = parseInt(prompt('Inserisci un numero'));
        // se il numero non è presente lo inserisco in numbers
        if(!numbers.includes(newNumber)){
            numbers.push(newNumber)
        }else{
            alert('Numero già inserito')
        }
    }

    return numbers;
}

const getGuessedNumbers = (userNumbers) => {
    const guessedNumbers = [];

    for (let i = 0; i < RANDOM_NUMBERS.length; i++) {
        const numberToCheck = RANDOM_NUMBERS[i];
        console.log('Verifico se ', numberToCheck, ' è presente in ', userNumbers);
        // se il numero è presente lo puscho in guessedNumbers
        if(userNumbers.includes(numberToCheck)){
            guessedNumbers.push(numberToCheck)
        }
    }

    return guessedNumbers;
}


/********** 
  START
***********/

//1.
while(RANDOM_NUMBERS.length < TOTAL_NUMBERS){
    // estraggo i numeri random
    const newRandomNumber = getRandomNumber(1,100);
    if(!RANDOM_NUMBERS.includes(newRandomNumber)){
        RANDOM_NUMBERS.push(newRandomNumber)
    }
}

//2.
printMessages(`Hai ${SECONDS_TO_WAIT} secondi per indovinare i seguenti numeri`, RANDOM_NUMBERS);

console.log(RANDOM_NUMBERS);


/******************
  TIMING FUNCTION
******************/

//3.
const countdown = setInterval(() => {
    // decremento e stampo il messaggio aggiornato
    printMessages(`Hai ${--SECONDS_TO_WAIT} secondi per indovinare i seguenti numeri`, RANDOM_NUMBERS);
},1000);

//4.
setTimeout(() => {
    clearInterval(countdown);
    printMessages('Te li ricordi tutti i numeri?',[]);
}, SECONDS_TO_WAIT * 1000)

//5.
setTimeout(() => {
    printMessages('Scrivi i numeri',[]);

    //6.
    const userNumbers = getUserNumbers();

    //7.
    const gussedNumbers = getGuessedNumbers(userNumbers);

    //8.
    if(gussedNumbers.length === 0){
        // se l'array dei numeri indovinati è vuoto
        printMessages('I numeri inseriti non corrispondono',[])
    }else{
        printMessages(`Hai indovinato ${gussedNumbers.length} su ${TOTAL_NUMBERS}`,gussedNumbers)
    }

}, (SECONDS_TO_WAIT + 2) * 1000)    



