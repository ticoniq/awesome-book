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
  li.id = newBook.id;
  li.innerHTML = `
    <p>"${newBook.title}" by ${newBook.author}</p>
    <button id="remove" type="button">Remove</button>
  `;
  bookList.appendChild(li);
};

const getBooks = () => {
  let books;
  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  return books;
};

document.addEventListener('DOMContentLoaded', () => {
  const books = getBooks();

  books.forEach((book) => {
    displayBooks(book);
  });
});

const addToLocalStorage = (newBook) => {
  const books = getBooks();
  books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
};

// Add books
form.addEventListener('submit', (e) => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  let id = Math.random() * 2;
  id += title;

  // check for any errors
  if (title.trim() === '' || author.trim() === '') {
    msg.innerText = 'All field are required';
    msg.classList.add('error');
    setTimeout(() => {
      msg.classList.remove('error');
      msg.innerText = '';
    }, 3000);
  } else {
    // Init the books object
    const newBook = new Books(id, title, author);

    // Display book on the UI
    displayBooks(newBook);

    // Save books data to localStorage
    addToLocalStorage(newBook);

    msg.innerText = 'Book added successfully';
    msg.classList.add('success');
    setTimeout(() => {
      msg.classList.remove('success');
      msg.innerText = '';
    }, 3000);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
  // prevent default submit
  e.preventDefault();
});

// Remove books
bookList.addEventListener('click', (e) => {
  if (e.target.id === 'remove') {
    const books = getBooks();
    const liParent = e.target.parentElement;

    const filteredBooks = books.filter(
      (book) => book.id !== liParent.id,
    );
    liParent.remove();
    localStorage.setItem('books', JSON.stringify(filteredBooks));

    msg.innerText = 'Book removed successfully';
    msg.classList.add('success');
    setTimeout(() => {
      msg.classList.remove('success');
      msg.innerText = '';
    }, 3000);
  }
  // prevent default submit
  e.preventDefault();
});
