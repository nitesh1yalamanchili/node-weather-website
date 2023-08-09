



const weatherDoc = document.querySelector('form') //look index.hbs this line will connect form in that hbs
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

 

weatherDoc.addEventListener('submit', (e) => { 
    /* You are telling the browser to execute the given function whenever a 'click' event occurs on the specified element. 
    The string 'click' is understood by the browser as referring to the standard click event, so it knows what kind of event to listen for.
    */
    e.preventDefault()  //This will make web browser to stop refreshing automatically, e = event

    const output = search.value // .value extracts the input value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address='+output+'').then((response) => {
    response.json().then( (data) =>{
    if(data.error) {
        messageOne.textContent = data.error
    } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
    }
    })

})
})

