// PART 1 NUMBERS 


// #1 Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
// (Make sure you get back JSON by including the json query key, specific to this API.
alert("hello I am JS");
const apiURL="http://numbersapi.com";
const favNumber=22;

// This function utilizes promises! Takes any num as an input and requests to api using that number
function getFavNumFact(num){
    axios.get(`${apiURL}/${num}?json`)
    .then(res => {
        console.log(res)
        console.log(`your favorite number fact is.... ${res.data.text}`)
    })
    .catch(err => {
        console.log(err)
    })
}

// same function as above but using async and await!
async function getFavNumFactAsync(num){
    try{
        let response=await axios.get(`${apiURL}/${num}?json`)
        console.log(response)
        console.log(`Here is the answer to number 1! Your favorite number fact is.... ${response.data.text}`)
    }
    catch(err){
        console.log("rejected promise",err);
    }
    
}
//running the function to console log our fav number fact!
getFavNumFactAsync(favNumber)



//2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

// Batch api requests for more than one number look like this: axios.get("http://numbersapi.com/2,3?json") with nums separated by commas or they can be in ranges separated by periods like this axios.get("http://numbersapi.com/2..5?json")

// Method 1 for Question 2! This function utilizes promises and takes a range of numbers and puts facts about them on the page!
function getNumFactsRange(lowNum,highNum){
    // DOM setup, clearing out previous li's in our ul holding the num facts used jQuery for dom!
    $('#factsul').empty()
    $('#factsul').append(`<p>Here are the number facts generated using getNumFactsRange()</p>`)
    //make request/promise and push number facts into data array
    axios.get(`${apiURL}/${lowNum}..${highNum}?json`)
    .then(res => {
        const data=[]
        console.log(res)
        console.log(res.data)
        for (let num of Object.keys(res.data)){
            console.log(num, res.data[num])
            data.push(res.data[num])
        }
        // loop over data array and put each idx into the dom as an li
        for (let idx of data){
            console.log(idx)
            $('#factsul').append(`<li>${idx}</li>`)
        }
    })

    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
}

// Method 1 for Question 2 continued! This function utilizes Async/Await and takes a range of numbers and puts facts about them on the page like the function above! Refactored also for length.
async function getNumFactsRangeAsync(lowNum,highNum){
    try{
        $('#factsul').empty()
        $('#factsul').append(`<p>Here are the number facts generated using getNumFactsRangeAsync()</p>`)
        let response= await axios.get(`${apiURL}/${lowNum}..${highNum}?json`)
        console.log(response)
        console.log(response.data)
        for (let num of Object.keys(response.data)){
            console.log(num, response.data[num])
            $('#factsul').append(`<li>${response.data[num]}</li>`)
            
        }
    
    }
    catch(err){
        console.log("rejected promise",err);
    }
    
}

// invoke the function to put some number facts on the page. Using Async version since this is an async exercise
getNumFactsRangeAsync(1,3)

const favNums=[7,10,18,22]
//Method #2 for question 2 using an Array of nums as input and using PROMISES! The only major difference is where stories go within the DOM and taking an array as a parameter when compared to getNumFactsRange().

function getNumFactsArray(numArray){
    $('#factsul2').empty()
    $('#factsul2').append(`<p>Here are the number facts generated using getNumFactsArray()</p>`)
    axios.get(`${apiURL}/${numArray}?json`)
    .then(res => {
        const data=[]
        console.log(res)
        console.log(res.data)
        for (let num of Object.keys(res.data)){
            console.log(num, res.data[num])
            data.push(res.data[num])
        }
        // loop over data array and put each idx into the dom as an li
        for (let idx of data){
            console.log(idx)
            $('#factsul2').append(`<li>${idx}</li>`)
        }
        
    })
    .catch(err => {
        console.log("rejected promise!!!!",err)
    })
}
//Method #2 for question 2 using a range of nums as input and using PROMISES! The only major difference is where stories go within the DOM and taking an array as a parameter when compared to getNumFactsRange().

async function getNumFactsArrayAsync(numArray){
    try{
        $('#factsul2').empty()
        $('#factsul2').append(`<p>Here are the number facts generated using getNumFactsArrayAsync()</p>`)
        let response= await axios.get(`${apiURL}/${numArray}?json`)
        console.log(response)
        console.log(response.data)
        for (let num of Object.keys(response.data)){
            console.log(num, response.data[num])
            $('#factsul2').append(`<li>${response.data[num]}</li>`)   
        } 
    }
    catch(err){
        console.log("rejected promise",err);
    }
}

// put the num facts onto the page! Using Async version since this is an async exercise!
getNumFactsArrayAsync(favNums)

// #3 Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

// using promise.all()! push 4 promises AKA axios requests to same favNum endpoint into the array favNumX4. Then use promise.all 

// bunch of logic here that uses promises! just commented out and refactored to async code below!

// const favNumX4=[]

// for (let i=1; i<5; i++){
//     favNumX4.push(axios.get(`${apiURL}/${favNumber}?json`))
// }

// Promise.all(favNumX4)
//     .then(promiseArrRes => {
//         console.log(promiseArrRes)
//         for (let idx of promiseArrRes){
//             $('#factsul3').append(`<li>${idx.data.text}</li>`)

//         } 
//     })
//     .catch(err => {
//         console.log("rejected promise!!!!",err)
//     })

// refactored the promise code to async with this function that uses promise.all!
async function fourParallelFactsAsync(){
    try{
    let facts=await Promise.all([
        axios.get(`${apiURL}/${favNumber}?json`),
        axios.get(`${apiURL}/${favNumber}?json`),
        axios.get(`${apiURL}/${favNumber}?json`),
        axios.get(`${apiURL}/${favNumber}?json`),
    ])
    console.log(`here is the facts promise!... ${facts}`)
    for (let idx of facts){
        console.log(idx)
        $('#factsul3').append(`<li>${idx.data.text}</li>`)

    } 
    }
    catch(err){
        console.log("rejected promise",err);
    }
}
// Invoking this function for question 3!
fourParallelFactsAsync()
