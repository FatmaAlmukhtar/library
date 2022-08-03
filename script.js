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
        info = document.createElement('p');
        bookStatus = document.createElement('button');
        remove = document.createElement('button');

        info.innerText = book.title +', by '+ book.author +', '+ book.pages;
        
        remove.innerText = 'remove';
        
        if(book.readStatus === true) {
            bookStatus.classList.add('read');
            bookStatus.innerText = 'read';
        }
        else {
            bookStatus.classList.add('notread');
            bookStatus.innerText = 'not read';
        }
        
        if(index%2 === 0) entry.classList.add('even');
        else entry.classList.add('odd');

        entry.classList.add('bookEntry');
        entry.appendChild(info);
        entry.appendChild(bookStatus);
        entry.appendChild(remove);
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
const form = document.querySelector('form');
const addBook = document.querySelector('.add.book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const readStatus = document.getElementById('status');

addBtn.addEventListener('click', () => {
    form.hidden = false;
})

addBook.addEventListener('click', () => {
    addBookToLibrary();
    form.hidden = true;
    form.reset();
})
