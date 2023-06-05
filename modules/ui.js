const msg = document.querySelector('.msg');
const bookList = document.querySelector('.book-list');

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
    document.addEventListener('DOMContentLoaded', () => {
      const books = UI.getBooks();

      const ui = new UI();
      books.forEach((book) => {
        ui.displayBooks(book);
      });
    });
  }

  static addToLocalStorage(newBook) {
    const books = UI.getBooks();
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));
  }
}

export default UI;