const form = document.querySelector('.form');
const msg = document.querySelector('.msg');
const bookList = document.querySelector('.book-list');

function Books(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

class UI {
  // Create Display book on the UI
  displayBooks(newBook) {
    this.newBook = newBook;
    const li = document.createElement('li');
    li.id = newBook.id;
    li.innerHTML = `
    <p>"${newBook.title}" by ${newBook.author}</p>
    <button id="remove" type="button">Remove</button>
  `;
    bookList.appendChild(li);
  }

  // Display messages to the UI
  static getMessage(message, msgClass) {
    this.message = message;
    this.msgClass = msgClass;
    msg.innerText = message;
    msg.classList.add(msgClass);
    setTimeout(() => {
      msg.classList.remove(msgClass);
      msg.innerText = '';
    }, 3000);
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayFromLocalStorage() {
    const books = UI.getBooks();

    const ui = new UI();
    books.forEach((book) => {
      ui.displayBooks(book);
    });
  }

  static addToLocalStorage(newBook) {
    const books = UI.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.addEventListener(
  'DOMContentLoaded',
  UI.displayFromLocalStorage,
);

// Add books
form.addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  let id = Math.random() * 2;
  id += title;

  // check for any errors
  if (title.trim() === '' || author.trim() === '') {
    // display message
    UI.getMessage('All field are required', 'error');
  } else {
    // Init the books object
    const newBook = new Books(id, title, author);

    const ui = new UI();

    // Display book on the UI
    ui.displayBooks(newBook);

    // Save books data to localStorage
    UI.addToLocalStorage(newBook);

    // display message
    UI.getMessage('Book added successfully', 'success');

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
  // prevent default submit
  e.preventDefault();
});

// Remove books
bookList.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    const books = UI.getBooks();
    const liParent = e.target.parentElement;

    const filteredBooks = books.filter(
      (book) => book.id !== liParent.id,
    );
    liParent.remove();
    localStorage.setItem('books', JSON.stringify(filteredBooks));

    // display message
    UI.getMessage('Book removed successfully', 'success');
  }
  // prevent default submit
  e.preventDefault();
});
