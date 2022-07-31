let myLibrary = [];
const booklist = document.querySelector('.list');

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
        entry = document.createElement('div');
        info = document.createElement('p');
        bookStatus = document.createElement('button');
        info.innerText = myLibrary[i].title +', by '+ myLibrary[i].author +', '+ myLibrary[i].pages;
        bookStatus.innerText = 'status';
        if(myLibrary[i].readStatus === true) bookStatus.classList.add('read');
        else bookStatus.classList.add('notread');
        entry.classList.add('bookEntry');
        entry.appendChild(info);
        entry.appendChild(bookStatus);
        booklist.appendChild(entry);
    }
}
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
