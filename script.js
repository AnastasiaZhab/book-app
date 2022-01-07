import books from "./books.js"
const root = document.getElementById('root');

const divOne = document.createElement("div");
divOne.classList.add("first_div");
const divTwo = document.createElement("div");
divTwo.classList.add("second_div");
const title = document.createElement("h1");
const list = document.createElement("ul");
const button = document.createElement("button");
button.classList.add("add_button");

root.append(divOne, divTwo);
divOne.append(title, list, button);

title.textContent = 'My books';
button.textContent = "Add";

localStorage.setItem("books", JSON.stringify(books));

function renderList() {
    const allBooks = JSON.parse(localStorage.getItem('books'));
    console.log(allBooks);

    list.insertAdjacentHTML("afterbegin", (
        allBooks.map(item => {
            return `<li id=${item.id}><p>${item.title}</p><button class="edit">Edit</button><button class="delete">Delete</button></li>`
        }).join("")
    ))

    const discription = document.querySelectorAll('p');
    const btnEdit = document.querySelectorAll('.edit');
    const btnDelete = document.querySelectorAll('.delete');
    
    discription.forEach(item => item.addEventListener('click', renderBook));
    btnEdit.forEach(item => item.addEventListener('click', editBook));
    btnDelete.forEach(item => item.addEventListener('click', deleteBook));
    
}

function renderBook(e) {
    
    const renderItem = document.querySelector('.second_div')
    const textDesc = e.currentTarget.textContent;
    const allBooks = JSON.parse(localStorage.getItem('books'));

    const currentBook =  allBooks.find(elem => elem.title === textDesc)
    renderItem.innerHTML = 
    
            `<h2>${currentBook.title}</h2>
            <h3>${currentBook.author}</h3>
            <img class="book_image" src=${currentBook.img} />
            <p>${currentBook.plot}</p>
        `
}

function editBook() {

}

function deleteBook(e) {
    const allBooks = JSON.parse(localStorage.getItem('books'));
    const bookId = e.currentTarget.parentNode.id;

    const newList = allBooks.filter(item => item.id !== bookId);
    localStorage.setItem("books", JSON.stringify(newList));
    list.innerHTML = '';
    renderList();

    const header = e.currentTarget.parentNode.firstElementChild;

    if (header.textContent === divTwo.firstElementChild.textContent) {

        divTwo.innerHTML = '';
    }

}
document.querySelector(".add_button");
button.addEventListener('click', addBook)

function addBook() {
    const newBook = {
        id: Data.now(),
        title: " ",
        author: " ",
        img: " ",
        url: " ",
        plot: " ",

    }

    const newForm = `<form class="form">
    <label>
        <input type="text" placeholder="Название" name="title">
    </label>
    <label>
        <input type="text" placeholder="Автор" name="author">
    </label>
    <label>
        <input type="text" placeholder="Описание" name="plot">
    </label>
    <label>
        <input type="text" placeholder="ССылка" name="url">
    </label>

    <button type="button"></button>    

    </form>`

    const inputAll = document.querySelectorAll("input");
    inputAll.forEach(el => el.addEventListener('change', onInputValue))

    function onInputValue() {
        
    }
}


renderList();
editBook();