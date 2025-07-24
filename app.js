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


// function toggle() {
//     containerEl.classList.add('active')
// }

// toggle()