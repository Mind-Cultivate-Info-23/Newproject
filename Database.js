const dBase = []

console.log(dBase)

function grabbingToLocalStorage() {
    localStorage.setItem('Database', JSON.stringify(dBase))
}

grabbingToLocalStorage()