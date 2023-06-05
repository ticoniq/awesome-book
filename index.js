import Books from './modules/books.js';
import * as pages from './modules/pages.js';
import UI from './modules/ui.js';
import displayDateTime from './modules/date.js';

const form = document.querySelector('.form');
const bookList = document.querySelector('.book-list');

displayDateTime();

UI.displayFromLocalStorage();

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

    pages.bookListPage();

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
