// Toggle Functionality

const containerEl = document.querySelector('#container')
const registerEl = document.querySelector('#register')
const signIn = document.querySelector('#sign-in')

console.log(registerEl)
console.log(signIn)

registerEl.addEventListener('click', () => {
    console.log('Register!')
    containerEl.classList.add('active')
})

signIn.addEventListener('click', () => {
    console.log('Sign In?')
    containerEl.classList.remove('active')
})

// Data Collection Functionality

const joinBtn = document.querySelector('#join-btn')
const signBtn = document.querySelector('#sign-btn')
let regExEmail = /([a-zA-Z0-9.-_]+@[a-zA-Z0-9.-_]+\.[a-zA-Z])/gi
const regExPWord = /([a-zA-Z0-9.-_])/
const regExUName = /([a-zA-Z0-9.-_])/
const initName = document.querySelector('#initName')
const initEmail = document.querySelector('#initEmail')
const initPword = document.querySelector('#initPword')

console.log(joinBtn, signBtn)
console.log(initEmail, initName, initPword)

let dataFromdBase = JSON.parse(localStorage.getItem("Database"))
console.log(dataFromdBase)

let email = []
let userName = []
let passWord = []

joinBtn.addEventListener('click', () => {
    email.push( initEmail.value )
    userName.push( initName.value )
    passWord.push( initPword.value )

    console.log(email, userName, passWord)

    joinAuthentication()
})



console.log(email, userName, passWord)

function joinAuthentication() {
    console.log(initName.value, initEmail.value, initPword.value)

    let newEInput = ''
    for (let i = 0; i < email.length; i++) {
        console.log(email[i])
        newEInput = email[i]
        console.log(newEInput)
    }

    let newNInput
    for (let i = 0; i < userName.length; i++){
        newNInput = userName[i]
        console.log(newNInput)
    }

    let newPInput
    for (let i = 0; i < passWord.length; i++){
        newPInput = passWord[i]
        console.log(newPInput)
    }

    if (regExEmail.test(newEInput) && regExPWord.test(newPInput) && regExUName.test(newNInput)) {
        console.log("We've got valid Inputs!")
        console.log(dataFromdBase)
    }
}

