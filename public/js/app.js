
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgone = document.querySelector('#message-one')
const msgtwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    msgone.textContent = "Loading.."
    msgtwo.textContent = ""

    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msgone.textContent = data.error
            }
            else {
                msgone.textContent=data.location
                msgtwo.textContent = data.summary+' It is '+ data.temperature +" degrees outside. The chance of rain is "+data.precProb+" percent"
            }
        })
    })
})