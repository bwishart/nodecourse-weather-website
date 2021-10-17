

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)

    // const url = 'http://localhost:3000/weather?address=' + location
    const url = '/weather?address=' + location
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = ''
                // console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
                // console.log('location: ' + data.location)
                // console.log('forecast: ' + data.forecastData)
            }
        })
    })

})