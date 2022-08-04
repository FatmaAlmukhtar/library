let myLibrary = [];
const booklist = document.querySelector('.bookList');

window.addEventListener('load', displayBooks());

class Book {
    constructor(title, author, pages, readStatus) {
        this.title = title.value,
        this.author = author.value,
        this.pages = pages.value,
        this.readStatus = readStatus.checked
    }
}

function addBookToLibrary() {
  book = new Book(title, author, pages, readStatus);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
    
    books = document.querySelectorAll('.bookEntry');
    if(books.length > 0) {
        books.forEach(book => {
            booklist.removeChild(book);
        });
    }
    
    for(let i=0; i<myLibrary.length; i++) {
        createBook(myLibrary[i], i);
    }
}
function createBook(book, index) {
    entry = document.createElement('div');
    infoDiv = document.createElement('div');
        titleInfo = document.createElement('p');
        authorInfo = document.createElement('p');
        pagesInfo = document.createElement('p');
        editBook = document.createElement('div');
        bookStatus = document.createElement('button');
        remove = document.createElement('button');

        titleInfo.innerText = book.title;
        authorInfo.innerText =  'By: '+ book.author;
        pagesInfo.innerText =  'Number of pages: ' + book.pages;
        
        remove.innerText = 'remove';
        
        if(book.readStatus === true) {
            bookStatus.classList.add('read');
            bookStatus.innerText = 'read';
        }
        else {
            bookStatus.classList.add('notread');
            bookStatus.innerText = 'not read';
        }

        entry.classList.add('bookEntry');
        infoDiv.appendChild(titleInfo);
        infoDiv.appendChild(authorInfo);
        infoDiv.appendChild(pagesInfo);
        entry.appendChild(infoDiv);
        editBook.classList.add('buttons');
        editBook.appendChild(bookStatus);
        editBook.appendChild(remove);
        
        entry.appendChild(editBook);
        booklist.appendChild(entry);

        remove.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            booklist.removeChild(entry);
            displayBooks();
            saveBooks();
        })
        bookStatus.addEventListener('click', () => {
            book.readStatus = !book.readStatus;
            displayBooks();
        })
        saveBooks();
}

function saveBooks() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function loadBooks() {
    if (!localStorage.myLibrary) displayBooks();
    else {
        temp = localStorage.getItem('myLibrary');
        temp = JSON.parse(temp);
        myLibrary =temp;
        displayBooks();
    }
}

loadBooks();
const addBtn = document.querySelector('.add');
const formBlock = document.querySelector('.edit');
const form = document.querySelector('form');
const addBook = document.querySelector('.add.book');
const del = document.querySelector('.delete');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readStatus = document.getElementById('status');

addBtn.addEventListener('click', () => {
    formBlock.hidden = false;
})
/*
form.onsubmit = function() {
    if (title.value && author.value) {
        addBookToLibrary();
        formBlock.hidden = true;
        form.reset();
    }
}*/
addBook.addEventListener('click', () => {
    if (title.value && author.value && pages.value) {
        addBookToLibrary();
        formBlock.hidden = true;
        form.reset();
    }
})
del.addEventListener('click', () => {
    form.reset();
    formBlock.hidden = true;
    
})
