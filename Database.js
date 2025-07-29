const dBase = [
    {email: "gaddafabdulkareem@gmail.com ", userName: "Ra ", passWord: "Abstrat22 "},
    {email: "gaddadulkareem@gmail.com ", userName: "ay ", passWord: "Abstrac22 "},
    {email: "gaddafabdul@gmail.com ", userName: "Ry ", passWord: "Abstract2 "}
]

console.log(dBase)

function grabbingToLocalStorage() {
    localStorage.setItem('Database', JSON.stringify(dBase))
}

grabbingToLocalStorage()