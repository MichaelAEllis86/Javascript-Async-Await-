// PART 2 CARDS

alert("hello I am JS");
const newDeckDraw1='https://deckofcardsapi.com/api/deck/new/draw/?count=1'
const baseAPIURL='https://deckofcardsapi.com/api/deck'
const newDeckShuffled='https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'



// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. 
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

// This function utilizes promises!
function getACard(){
    axios.get(`${newDeckDraw1}`)
    .then(res => {
        console.log(res)
        console.log(`your card is the ${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
}

// Same function as above but refactored using async/await instead!
async function getACardAsync() {
    try{
        console.log("drawing one card from a new deck using getACardAsync()...")
        let response=await axios.get(`${newDeckDraw1}`)
        console.log(response)
        console.log("Question1 answer below!")
        console.log(`your card is the ${response.data.cards[0].value} of ${response.data.cards[0].suit}`)
    }
    catch(err){
        console.log("rejected promise",err)
    }
    
}

// calling the function here to console.log the results of question 1

getACardAsync()


// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.


// This function utilizes promises!
function twoCardsOneDeck(){
    axios.get(`${newDeckDraw1}`)
    .then(resCard1 => {
        console.log("inside promise 1")
        console.log(resCard1)
        console.log(`The id of this deck is ${resCard1.data.deck_id}`)
        console.log(`your first card is the ${resCard1.data.cards[0].value} of ${resCard1.data.cards[0].suit}`);
        return axios.get(`${baseAPIURL}/${resCard1.data.deck_id}/draw/?count=1`)
    })
    .then(resCard2 => {
        console.log("inside promise 2")
        console.log(resCard2)
        console.log(`your second card is the ${resCard2.data.cards[0].value} of ${resCard2.data.cards[0].suit}`);
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })

}

// Same function as above but refactored using async/await instead!

// Some notes RE twoCardsOneDeckAsync(): This function is a bit long due to how I structured the error handling...
// I am using mutliple try/catch blocks in order to further localize errors to the specific rejected promise. AKA did promise 1 fail? or did promise 2 fail?
// However, using the mutliple try blocks means that we must pass the dependent data for request2/promise2 from request/promise 1 outside of the try block otherwise we can't access it in promise #2/request2, even though we are returning the resolved value of promise 1
// Therefore, we simply declare deck_id, card1Value, and card2Suit as variables outside of the try block, and then set their value in the first try block in request 1 so we can access/interpolate the unscoped variables in request2!!!
// Additional variable declarations of the same nature for the 2nd promise are unnecessary as they all part of the last try block and be accessed in scope without additional logic.
// I also console.log somewhat excessively which lengthens things, all logs can be safely deleted once one is sure the function works. Lastly, if one only cares about error handling regardless 
// of the offending promise/request you could move all the request code into a single try block! See the next function twoCardsOneDeckAsync1TryCatch() for that logic!

async function twoCardsOneDeckAsync(){
    let deck_id="";
    let card1Value=""
    let card1Suit=""
    try{
        console.log("inside first request");
        let responseCard1= await axios.get(`${newDeckDraw1}`);
        console.log(responseCard1);
        console.log(`The id of this deck is ${responseCard1.data.deck_id}`)
        deck_id=responseCard1.data.deck_id
        card1Value=`${responseCard1.data.cards[0].value}`
        card1Suit=`${responseCard1.data.cards[0].suit}`
    }
    catch(err){
        console.log("rejected promise in card1 request",err);
    }
    finally{
        console.log(`the deck id after first request is ${deck_id}`);
        console.log(`the card1Value after first request is ${card1Value}`);
        console.log(`the card1Suit after first request is ${card1Suit}`);
    }
    try{
        console.log("inside second request");
        let responseCard2= await axios.get(`${baseAPIURL}/${deck_id}/draw/?count=1`);
        console.log(responseCard2)
        console.log("Question2 answer below!")
        console.log(`your first card is the ${card1Value} of ${card1Suit}`);
        console.log(`your second card is the ${responseCard2.data.cards[0].value} of ${responseCard2.data.cards[0].suit}`);

    }
    catch(err){
        console.log("rejected promise in card2 request",err)
    }
}

// Ok! twoCardsOneDeckAsync1TryCatch() is the 3rd version of this function. It is a shorter version of the function above it. TLDR we use a single try catch block here because in this case
// we don't care where the promise rejection occurs! IF we do care about that, then just use twoCardsOneDeckAsync(). A single try block allows us to get rid of the additional variable declarations as well because we don't deal with scope issues this way.

async function twoCardsOneDeckAsync1TryCatch(){
    try{
        console.log("inside first request");
        let responseCard1= await axios.get(`${newDeckDraw1}`);
        console.log(responseCard1);
        console.log(`The id of this deck is ${responseCard1.data.deck_id}`)
        deck_id=responseCard1.data.deck_id
        let responseCard2= await axios.get(`${baseAPIURL}/${deck_id}/draw/?count=1`);
        console.log(responseCard2);
        console.log(`your first card is the ${responseCard1.data.cards[0].value} of ${responseCard1.data.cards[0].suit}`);
        console.log(`your second card is the ${responseCard2.data.cards[0].value} of ${responseCard2.data.cards[0].suit}`);
    }
    catch(err){
        console.log("rejected promise",err);
    }

}


// calling the function here to console.log the results of question 2! Note that u can use any of the 3 above functions for mostly similar results, test me if u want.

twoCardsOneDeckAsync()




// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. 
// Every time you click the button, display a new card, until there are no cards left in the deck.



let deck_id=null

//Utilizes PROMISES! Fetches us a new shuffled deck from the API. Makes request and sets the deck_id so that we can draw from the same deck later!
function newDeck(){
    axios.get(`${'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'}`)
    .then(newDeck => {
        console.log(newDeck)
        console.log(`The id of this deck is ${newDeck.data.deck_id}`)
        deck_id=newDeck.data.deck_id
    })
    .catch(err => {
        console.log("rejected promise!!!! Unable to get new deck",err)
    })
}

// Same function as newDeck() just using Async and Await. Fetches us a new shuffled deck from the API. Makes request and sets the deck_id so that we can draw from the same deck later!
async function newDeckAsync(){
    try{
        let newDeck= await axios.get(`${newDeckShuffled}`)
        console.log(newDeck)
        console.log(` NEW DECK DETECTED! The id of this deck is ${newDeck.data.deck_id}`)
        deck_id=newDeck.data.deck_id
    }
    catch(err){
        console.log("rejected promise",err);
    }

}

//Utilizes PROMISES! draws us a card from the preestablished deck_id via making the proper api request and rendering to the dom using jQuery, if there are no cards left in the deck, we alert the user.
function drawOneRenderOne(deck_id){
    axios.get(`${baseAPIURL}/${deck_id}/draw/?count=1`)
    .then(drawOne=>{
        console.log(drawOne)
        if(drawOne.data.remaining === 0){
            alert("there are no cards remaining in this deck! Please reset your deck")

        }
        console.log(`here is the image address for your card ${drawOne.data.cards[0].image}`)
        imageURL=drawOne.data.cards[0].image
        $('#cardsdiv').append(`<img src="${imageURL}" alt="card">`)
    })
    .catch(err => {
        console.log("rejected promise!!!! Unable to get new card",err)
    })

}

// Same as drawOneRenderOne(deck_id) refactored for Async/Await.
async function drawOneRenderOneAsync(deck_id){
    try{
        let drawOne= await axios.get(`${baseAPIURL}/${deck_id}/draw/?count=1`)
        console.log(`Drawing a card! from deck ${deck_id}`)
        console.log(drawOne)
        if(drawOne.data.remaining === 0){
            alert("there are no cards remaining in this deck! Please reset your deck")
        }
        console.log(`here is the image address for your card ${drawOne.data.cards[0].image}`)
        imageURL=drawOne.data.cards[0].image
        $('#cardsdiv').append(`<img src="${imageURL}" alt="card">`)
    }
    catch(err){
        console.log("rejected promise",err);
    }
}

// Function used to reset the deck once all cards have been drawn. We could also have this run automatically at zero cards remaining, but I like giving the user an option to control that.
// empty's the card's div which holds all of our cards, resets the deck id, calls newdeck(), alerts the user.
function resetDeck(){
    $('#cardsdiv').empty()
    deck_id=null
    alert("the deck has been reset")
    newDeckAsync()
}

// Evt listeners! All of these utilize the async versions of our functions where applicable.

// Everytime we reload the page we get a new deck to draw from
document.addEventListener("DOMContentLoaded",newDeckAsync())

// when we click get a card btn we use our draw and render function to draw a card from the deck
$('#cardbtn').on("click", function (evt){
    console.log('clicked',"the evt listener is working", "inside cardbtn evt listener")
    drawOneRenderOneAsync(deck_id)

})

// when user clicks resetbtn we run resetDeck() and get rid of all cards and present a new deck
$('#resetbtn').on("click", function (evt){
    console.log('clicked',"the evt listener is working", "inside resetbtn evt listener")
    resetDeck()
})
