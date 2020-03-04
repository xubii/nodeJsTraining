// const filename = require('./book.js');
let books = require('./book') 
const helper = require('./book.helper');
let bookObj = [];

function getBooks() {
    
    if(Array.isArray(bookObj)){
        return new Promise((resolve, reject) => {
            if (books.length === 0) {
                reject({
                    message: 'no posts available',
                    status: 202
                })
            }
            bookObj = books;
            resolve(books)
        })
    }else{
        return new Promise((resolve, reject) => {
            resolve(bookObj)
        })
    }


    
}

function checkBooks()
{
    if(Array.isArray(bookObj) && bookObj.length){
        getBooks();
    }
}

function getBook(id) {
    checkBooks()
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(bookObj, id)
        .then(book => resolve(book))
        .catch(err => reject(err))
    })
}

function insertBook(book) {
    checkBooks()
    return new Promise((resolve, reject) => {
        const id = { id: helper.getNewId(bookObj) }
        book = { ...id, ...book }

        console.log(book)
        bookObj.push(book)
        // helper.writeJSONFile(filename, bookObj)
        resolve(book)
    })
}

function updateBook(id, updatedBook) {
    checkBooks()
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(bookObj, id)
        .then(book => {
            const index = bookObj.findIndex(p => p.id == book.id)
            id = { id: book.id }
            bookObj[index] = { ...id, ...updatedBook }
            resolve(bookObj[index])
        })
        .catch(err => reject(err))
    })
}

function deleteBook(id) {
    checkBooks()
    return new Promise((resolve, reject) => {
        helper.mustBeInArray(bookObj, id)
        .then(() => {
            reponse = bookObj.filter(p => p.id !== id)
            console.log(reponse)
            resolve()
        })
        .catch(err => reject(err))
    })
}

module.exports = {
    getBooks,
    getBook,
    insertBook,
    updateBook,
    deleteBook
}