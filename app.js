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

// Creating an IndexedDB

const indexedDB = 
window.indexedDB ||
window.mozindexedDB ||
window.msindexedDB ||
window.shimindexedDB ||
window.webkitindexedDB;

let db = null

function createDB() {
    const request = indexedDB.open("userDatabase", 1)

    request.onerror = e => {
        console.error("Error on opening Database.", e)
    }

    request.onupgradeneeded = e => {
        db = request.result
        const store = db.createObjectStore("Users", {keyPath: "email"})
        store.createIndex("userEmail", ["email"], {unique: true})

        store.transaction.oncomplete = function() {
            console.log("Transaction on store completed!")
        }
    }

    request.onsuccess = e => {
        db = request.result
        console.log("Successfully opened Database")
    }
}

createDB()

// Data Collection Functionality


const initName = document.querySelector('#initName')
const initEmail = document.querySelector('#initEmail')
const initPword = document.querySelector('#initPword')
const joinBtn = document.querySelector("#join-btn")

let addedEmail = []
let addedName = []
let addedPassword = []

joinBtn.addEventListener("click", () => {
    addedName.push(initName.value)
    initName.value = ""

    addedEmail.push(initEmail.value)
    initEmail.value = ""

    addedPassword.push(initPword.value)
    initPword.value = ""

    console.log(addedEmail, addedName, addedPassword)

    authentication()
})


let regExE = /([a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z])/
let regExN = /([a-zA-Z0-9-_.])/
let regExP = /([a-zA-Z0-9-_.])/
let validData = []

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

    if (regExE.test(email) && regExN.test(name) & regExP.test(passWord)) {
        console.log("We've got correct data formats!")

        validData.push({userName: name, email: email, passWord: passWord})
        console.log(validData)
        insertToDataBase(validData)
        validData = []
        console.log(validData)
    }
}

// Function for inserting data to the DB.

let errorEl = document.querySelector('#error-el')

function insertToDataBase(inputs) {
    if (db) {
        const insertTX = db.transaction("Users", "readwrite")
        const store = insertTX.objectStore("Users")
        const emailIndex = store.index("userEmail")

        insertTX.onerror = function(event) {
            console.error("Error running insert transaction", event)
        }

        insertTX.oncomplete = function() {
            console.log("Insert transaction successfully completed!")
        }

        inputs.forEach(input => {
            const request = store.add(input)

            request.onerror = function(event) {
                console.error("Error parsing data through to DB.", event)
                const error = event.target.error

                if (error.name === "ConstraintError") {
                    // alert("We already have an account by such credentials, please try making some changes!")

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
                }
            }

            request.onsuccess = function(event) {
                console.log("Successfully pushed data through to DB.", input)
                containerEl.classList.remove('active')
            }
         });
    }
}




// Function for logging in

const loginEmailEl = document.querySelector('#login-email-el')
const loginPwordEl = document.querySelector('#login-pword-el')
const signBtn = document.querySelector('#sign-btn')

console.log(loginEmailEl, loginPwordEl, signBtn)

signBtn.addEventListener('click', () => {
    alert("You are trying to log-in!")

    let loggedEmail = loginEmailEl.value
    console.log(loggedEmail)

    let loggedPword = loginPwordEl.value
    console.log(loggedPword)

    getUserData(loggedEmail)
})


// Function to verify user entry data

function dataVerification() {
    
}


// Function to fetch user entry data

function getUserData(email) {
    if (db) {
        const getTx = db.transaction("Users", "readonly")
        const store = getTx.objectStore("Users")

        getTx.onerror = function() {
            console.log("Error running retreive transaction")
        }

        getTx.oncomplete = function () {
            console.log("Successfully completed retreival transaction!")
        }

        const request = store.get(email)


        request.onerror = function (event) {
            console.log("Error retreiving user email data", event)
        }

        request.onsuccess = function (event) {
            console.log("Successfully retreived user email data", event.target.result)
        }
    }
}


























// const availableData = JSON.parse( localStorage.getItem('Database') )
// console.log(availableData)

// const initName = document.querySelector('#initName')
// const initEmail =document.querySelector('#initEmail')
// const initPword = document.querySelector('#initPword')
// const joinBtn = document.querySelector('#join-btn')

// console.log(initEmail, initName, initPword, joinBtn)

// let addedName = []
// let addedEmail = []
// let addedPassword = []

// joinBtn.addEventListener('click', () => {
//     console.log('clicked!')

//     addedName.push(initName.value)
//     initName.value = ''

//     addedEmail.push(initEmail.value)
//     initEmail.value = ''

//     addedPassword.push(initPword.value)
//     initPword.value = ''

//     console.log(addedName, addedEmail, addedPassword)

//     authentication()
// })

// let regExN = /([a-zA-Z])/
// let regExE = /([a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z])/
// let regExP = /([a-zA-Z0-9-_.])/
// let text 
// let closeIcon

// const errorEl = document.querySelector('#error-el') 
// console.log(errorEl)

// function authentication() {
//     let name = ''
//     for (let i = 0; i < addedName.length; i++) {
//         name = addedName[i]
//         console.log(name)
//     }

//     let email = ''
//     for (let i = 0; i < addedEmail.length; i++) {
//         email = addedEmail[i]
//         console.log(email)
//     }

//     let passWord = ''
//     for (let i = 0; i < addedPassword.length; i++) {
//         passWord = addedPassword[i]
//         console.log(passWord)
//     }

//     if (regExN.test(name) && regExE.test(email) && regExP.test(passWord)) {
//         console.log("Correct Formats!!")

//         let availableNames = availableData.some(item => item.userName === name)
//         let availableEmails = availableData.some(item => item.email === email)
//         let availablePasswords = availableData.some(item => item.passWord === passWord)

//         console.log(availableEmails, availableNames, availablePasswords)

//         if (availableEmails && availableNames || availablePasswords) {
//             // alert("We already have user with those credentials, please try changing.")
            // errorEl.style.display = 'block'
            
            // closeIcon = document.createElement('img')
            // closeIcon.src = "icons/close.png"
            // closeIcon.setAttribute('class', 'close')
            // console.log(closeIcon)

            // closeIcon.addEventListener('click', () => {
            //     errorEl.remove()
            // })

            // text = document.createElement("p")
            // text.setAttribute('class', 'error-msg')
            // text.textContent = `We already have an account with similar credentials,
            //                     try making some changes!`

            // errorEl.appendChild(closeIcon)
            // errorEl.appendChild(text)
            // console.log(text)

            // setTimeout(() => {
            //     errorEl.style.display = 'none'
            // }, 3000);
//         }else {
//             availableData.push({userName: name, email: email, passWord: passWord})
//             localStorage.setItem('Database', JSON.stringify(availableData))
//             containerEl.classList.remove('active')

//             console.log(availableData)
//         }
//     }
// }


// Log-in Data Verification

// const loginEmailEl = document.querySelector('#login-email-el')
// const loginPwordEl = document.querySelector('#login-pword-el')
// const signBtn = document.querySelector('#sign-btn')

// console.log(loginEmailEl, loginPwordEl, signBtn)

// let logEmail = []
// let logPword = []

// signBtn.addEventListener('click', () => {
//     console.log('SIGNING IN!')

//     logEmail.push(loginEmailEl.value)
//     loginEmailEl.value = ''
//     console.log(logEmail)

//     logPword.push(loginPwordEl.value)
//     loginPwordEl.value = ''
//     console.log(logPword)

//     dataVerification()
// })

// function dataVerification() {
//     let emailInput = ''
//     for (let i = 0; i < logEmail.length; i++) {
//         emailInput = logEmail[i]
//         console.log(emailInput)
//     }

//     let pwordInput = ''
//     for (let i = 0; i < logPword.length; i++) {
//         pwordInput = logPword[i]
//         console.log(pwordInput)
//     }

//     if (regExE.test(emailInput) && regExP.test(pwordInput)) {
//         console.log('Weve got valid formats!')

//         const emailExists = availableData.some(item => item.email === emailInput)
//         const pwordExists = availableData.some(item => item.passWord === pwordInput)
//         console.log(emailExists, pwordExists)

//         if (emailExists && pwordExists) {
//             window.location.assign("bookCamp.html")
//         }else{
//             errorEl.style.display = 'block'

//             closeIcon = document.createElement('img')
//             closeIcon.src = "icons/close.png"
//             closeIcon.setAttribute('class', 'close')
//             errorEl.appendChild(closeIcon)
//             closeIcon.addEventListener('click', () => {
//                 errorEl.remove()
//             })

//             text = document.createElement('p')
//             text.setAttribute('class', 'error-msg')
//             text.textContent = `Oops! seems you are not yet sign-up with
//                                 us yet. Create your account to enjoy the 
//                                 experience.`
//             errorEl.appendChild(text)

//             setTimeout(() => {
//                 errorEl.style.display = 'none'
//             }, 3000);

//         }
//     }else {
//         errorEl.style.display = 'block'

//         closeIcon = document.createElement('img')
//         closeIcon.src = "icons/close.png"
//         closeIcon.setAttribute('class', 'close')
//         errorEl.appendChild(closeIcon)
//         closeIcon.addEventListener('click', () => {
//             errorEl.remove()
//         })

//         text = document.createElement('p')
//         text.setAttribute('class', 'error-msg')
//         text.textContent = `Invalid format input, try again!`
//         errorEl.appendChild(text)

//         setTimeout(() => {
//             errorEl.style.display = 'none'
//         }, 3000);
//     }
// }













