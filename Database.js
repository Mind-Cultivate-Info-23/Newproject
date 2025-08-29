// const dBase = []

// console.log(dBase)

// function pushingToLocalStorage() {
//     localStorage.setItem('Database', JSON.stringify(dBase))
// }

// pushingToLocalStorage()

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