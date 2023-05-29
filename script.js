const form = document.querySelector('.form');
const msg = document.querySelector('.msg');
const bookList = document.querySelector('.book-list');
function Books(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

// Create Display book on the UI
const displayBooks = (newBook) => {
  const li = document.createElement('li');
  li.innerHTML = `
    <p>${newBook.title}</p>
    <p>${newBook.author}</p>
    <button id="remove" type="button">Remove</button>
    <hr />
  `;
  bookList.appendChild(li);
}

const addToLocalStorage = (newBook) => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
}

document.addEventListener('DOMContentLoaded', () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  books.forEach(book => {
    displayBooks(book);
  });
});

// Add books
form.addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  let id = Math.random() * 2;
  id += title;

  // check for any errors
  if (title.trim() === '' || author.trim() === '') {
    msg.innerText = 'All field are required';
    setTimeout(() => {
      msg.innerText = '';
    }, 3000);
  } else {

    // Init the books object 
    const newBook = new Books(id, title, author);

    // Display book on the UI
    displayBooks(newBook);

    // Save books data to localStorage
    addToLocalStorage(newBook);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
  // prevent default submit
  e.preventDefault();
});

// Remove books
bookList.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    e.target.parentElement.remove();
  }
  // prevent default submit
  e.preventDefault();
});