let myLibrary = [];
const library = document.querySelector('#library');
let id = 0;

function Book(title, author, pages, status) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    id++;
}

function addBookToLibrary(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status));
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', '295', false);
addBookToLibrary('The Count of Monte Cristo', 'Alexandre Dumas', '1276', true);

function render(completeLibrary) {
    if (document.querySelector('#library').childNodes.length != 0) {
        document.querySelector('#library').innerHTML = '';
    }

    for (let i = 0; i < completeLibrary.length; i++) {
        let bookContainer = document.createElement('div');
        bookContainer.setAttribute('class', 'book');
        bookContainer.setAttribute('id', completeLibrary[i].id);

        let bookTitle = document.createElement('h3');
        bookTitle.textContent = completeLibrary[i].title;
        let bookAuthor = document.createElement('h4');
        bookAuthor.textContent = completeLibrary[i].author;
        let bookPages = document.createElement('h5');
        bookPages.textContent = completeLibrary[i].pages + ' pages';
        let bookStatus = document.createElement('button');
        if (completeLibrary[i].status == true) {
            bookStatus.setAttribute('class', 'status');
            bookStatus.setAttribute('style', 'background-color: #fff275; color: black; font-weight: bold;');
            bookStatus.textContent = 'READ';
        } else {
            bookStatus.setAttribute('class', 'status');
            bookStatus.setAttribute('style', 'background-color: #fff275; color: black; font-weight: bold; text-decoration: line-through;');
            bookStatus.textContent = 'READ';
        }

        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';
        deleteButton.setAttribute('class', 'delete');
        deleteButton.setAttribute('style', 'background-color: #FF3C38; font-weight: bold;');

        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPages);
        bookContainer.appendChild(bookStatus);
        bookContainer.appendChild(deleteButton);
        library.appendChild(bookContainer);
    }
    deleteBooks();
    changeStatus();
    localStorage.setItem('libraryArray', JSON.stringify(myLibrary));
}

if (localStorage.getItem('libraryArray') === null) {
    render(myLibrary);
} else {
    let retrievedLibrary = localStorage.getItem('libraryArray');
    myLibrary = JSON.parse(retrievedLibrary);
    id = myLibrary.length;
    render(myLibrary);
}

function deleteBooks() {
    let deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == button.parentNode.id) {
                    myLibrary.splice(i, 1);
                }
            }
            render(myLibrary);
        })
    })
}

function changeStatus() {
    let statusButtons = document.querySelectorAll('.status');
    statusButtons.forEach((button) => {
        button.addEventListener('click', () => {
            for (let i = 0; i < myLibrary.length; i++) {
                if (myLibrary[i].id == button.parentNode.id) {
                    if (myLibrary[i].status == true) {
                        myLibrary[i].status = false;
                    } else {
                        myLibrary[i].status = true;
                    }
                }
            }
            render(myLibrary);
        })
    })
}

const addBookButton = document.querySelector('#addBookButton');
addBookButton.addEventListener('click', displayAddBookForm);
const addBookFormContainer = document.querySelector('#addBookFormContainer');

function displayAddBookForm() {
    if (addBookFormContainer.style.display == 'block') {
        addBookFormContainer.style.display = 'none';
    } else {
        addBookFormContainer.style.display = 'block';
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
}

let addedTitle;
let addedAuthor;
let addedPages;
let addedStatus;

const titleInput = document.querySelector('#titleInput');
titleInput.addEventListener('change', () => {
    addedTitle = titleInput.value;
});
const authorInput = document.querySelector('#authorInput');
authorInput.addEventListener('change', () => {
    addedAuthor = authorInput.value;
});
const pagesInput = document.querySelector('#pagesInput');
pagesInput.addEventListener('change', () => {
    addedPages = pagesInput.value;
});
const statusInput = document.querySelector('#statusInput');
statusInput.addEventListener('change', () => {
    addedStatus = statusInput.checked;
})

const submitButton = document.querySelector('#submitButton');
submitButton.addEventListener('click', addBook);

function addBook() {
    if (addedTitle == null || addedAuthor == null || addedPages == null) {
        alert('Please enter all of the info about the book.');
    } else {
        addBookToLibrary(addedTitle, addedAuthor, addedPages, addedStatus);
        render(myLibrary);
        document.querySelector('#addBookForm').reset();
        addBookFormContainer.style.display = 'none';
    }
}