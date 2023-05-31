const list = document.querySelector('#list');
const addBook = document.querySelector('#addbook');
const contact = document.querySelector('#contact');

list.addEventListener('click', () => {
  document.querySelector('.list').style.display = 'block';
  document.querySelector('.form-field').style.display = 'none';
  document.querySelector('.contact').style.display = 'none';
});

addBook.addEventListener('click', () => {
  document.querySelector('.list').style.display = 'none';
  document.querySelector('.form-field').style.display = 'block';
  document.querySelector('.contact').style.display = 'none';
});

contact.addEventListener('click', () => {
  document.querySelector('.list').style.display = 'none';
  document.querySelector('.form-field').style.display = 'none';
  document.querySelector('.contact').style.display = 'block';
});