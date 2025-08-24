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


const availableData = JSON.parse( localStorage.getItem('Database') )
console.log(availableData)

const initName = document.querySelector('#initName')
const initEmail =document.querySelector('#initEmail')
const initPword = document.querySelector('#initPword')
const joinBtn = document.querySelector('#join-btn')

console.log(initEmail, initName, initPword, joinBtn)

let addedName = []
let addedEmail = []
let addedPassword = []

joinBtn.addEventListener('click', () => {
    console.log('clicked!')

    addedName.push(initName.value)
    initName.value = ''

    addedEmail.push(initEmail.value)
    initEmail.value = ''

    addedPassword.push(initPword.value)
    initPword.value = ''

    console.log(addedName, addedEmail, addedPassword)

    authentication()
})

let regExN = /([a-zA-Z])/
let regExE = /([a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z])/
let regExP = /([a-zA-Z0-9-_.])/
let text 
let closeIcon

const errorEl = document.querySelector('#error-el') 

console.log(errorEl)

function authentication() {
    let name = ''
    for (let i = 0; i < addedName.length; i++) {
        name = addedName[i]
        console.log(name)
    }

    let email = ''
    for (let i = 0; i < addedEmail.length; i++) {
        email = addedEmail[i]
        console.log(email)
    }

    let passWord = ''
    for (let i = 0; i < addedPassword.length; i++) {
        passWord = addedPassword[i]
        console.log(passWord)
    }

    if (regExN.test(name) && regExE.test(email) && regExP.test(passWord)) {
        console.log("Correct Formats!!")

        let availableNames = availableData.some(item => item.userName === name)
        let availableEmails = availableData.some(item => item.email === email)
        let availablePasswords = availableData.some(item => item.passWord === passWord)

        console.log(availableEmails, availableNames, availablePasswords)

        if (availableEmails && availableNames || availablePasswords) {
            // alert("We already have user with those credentials, please try changing.")
            errorEl.style.display = 'block'
            
            closeIcon = document.createElement('img')
            closeIcon.src = "icons/close.png"
            closeIcon.setAttribute('class', 'close')
            console.log(closeIcon)

            closeIcon.addEventListener('click', () => {
                errorEl.remove()
            })

            text = document.createElement("p")
            text.setAttribute('class', 'error-msg')
            text.textContent = `We already have an account with similar credentials,
                                try making some changes!`

            errorEl.appendChild(closeIcon)
            errorEl.appendChild(text)
            console.log(text)

            setTimeout(() => {
                errorEl.style.display = 'none'
            }, 3000);
        }else {
            availableData.push({userName: name, email: email, passWord: passWord})
            localStorage.setItem('Database', JSON.stringify(availableData))
            containerEl.classList.remove('active')

            console.log(availableData)
        }
    }
}


// Log-in Data Verification

const loginEmailEl = document.querySelector('#login-email-el')
const loginPwordEl = document.querySelector('#login-pword-el')
const signBtn = document.querySelector('#sign-btn')

console.log(loginEmailEl, loginPwordEl, signBtn)

let logEmail = []
let logPword = []

signBtn.addEventListener('click', () => {
    console.log('SIGNING IN!')

    logEmail.push(loginEmailEl.value)
    loginEmailEl.value = ''
    console.log(logEmail)

    logPword.push(loginPwordEl.value)
    loginPwordEl.value = ''
    console.log(logPword)

    dataVerification()
})

function dataVerification() {
    let emailInput = ''
    for (let i = 0; i < logEmail.length; i++) {
        emailInput = logEmail[i]
        console.log(emailInput)
    }

    let pwordInput = ''
    for (let i = 0; i < logPword.length; i++) {
        pwordInput = logPword[i]
        console.log(pwordInput)
    }

    if (regExE.test(emailInput) && regExP.test(pwordInput)) {
        console.log('Weve got valid formats!')

        const emailExists = availableData.some(item => item.email === emailInput)
        const pwordExists = availableData.some(item => item.passWord === pwordInput)
        console.log(emailExists, pwordExists)

        if (emailExists && pwordExists) {
            window.location.assign("bookCamp.html")
        }else{
            errorEl.style.display = 'block'

            closeIcon = document.createElement('img')
            closeIcon.src = "icons/close.png"
            closeIcon.setAttribute('class', 'close')
            errorEl.appendChild(closeIcon)
            closeIcon.addEventListener('click', () => {
                errorEl.remove()
            })

            text = document.createElement('p')
            text.setAttribute('class', 'error-msg')
            text.textContent = `Oops! seems you are not yet sign-up with
                                us yet. Create your account to enjoy the 
                                experience.`
            errorEl.appendChild(text)

            setTimeout(() => {
                errorEl.style.display = 'none'
            }, 3000);

        }
    }else {
        errorEl.style.display = 'block'

        closeIcon = document.createElement('img')
        closeIcon.src = "icons/close.png"
        closeIcon.setAttribute('class', 'close')
        errorEl.appendChild(closeIcon)
        closeIcon.addEventListener('click', () => {
            errorEl.remove()
        })

        text = document.createElement('p')
        text.setAttribute('class', 'error-msg')
        text.textContent = `Invalid format input, try again!`
        errorEl.appendChild(text)

        setTimeout(() => {
            errorEl.style.display = 'none'
        }, 3000);
    }
}