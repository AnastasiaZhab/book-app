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
// const listElem = document.querySelector('')

root.append(divOne, divTwo);
divOne.append(title, list, button);


title.textContent = 'My books';
button.textContent = "Add";

localStorage.setItem("books", JSON.stringify(books));

function renderList() {
    const allBooks = JSON.parse(localStorage.getItem('books'));
    console.log(allBooks);
    
    list.innerHTML =
    allBooks.map(item => {
        return `<li id=${item.id}><p>${item.title}</p><button class="edit">Edit</button><button class="delete">Delete</button></li>`
    }).join("");
    
    
    const discription = document.querySelectorAll('p');
        const btnEdit = document.querySelectorAll('.edit');
        const btnDelete = document.querySelectorAll('.delete');
        
        discription.forEach(item => item.addEventListener('click', renderBook));
        btnEdit.forEach(item => item.addEventListener('click', editBook));
        btnDelete.forEach(item => item.addEventListener('click', deleteBook));
        
    }
    
const renderItem = document.querySelector(".second_div");

function renderBook(e) {
    
    const textDesc = e.currentTarget.textContent;
    const allBooks = JSON.parse(localStorage.getItem('books'));
    
    const currentBook = allBooks.find(elem => elem.title === textDesc);
    renderItem.innerHTML = renderMarkUp(currentBook);
    
    
}

function renderMarkUp(book) {
    return `<h2>${book.title}</h2>
    <h3>${book.author}</h3>
    <img class="book_image" src=${book.img} />
    <p>${book.plot}</p>
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

const addBtn = document.querySelector(".add_button");
addBtn.addEventListener('click', addBook);

function addBook() {
    const newBook = {
        id: `${Date.now()}`,
        title: " ",
        author: " ",
        img: " ",
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
        <input type="text" placeholder="Ссылка" name="img">
    </label>

    <button type="submit" class="save">Save</button>    

    </form>`;

    divTwo.innerHTML = newForm;

    const inputAll = document.querySelectorAll("input");
    inputAll.forEach(el => el.addEventListener('change', onInputValue));
    const saveForm = document.querySelector(".form");
    saveForm.addEventListener("submit", onAddBook);


    function onInputValue(e) {
        newBook[e.target.name] = e.target.value
    }

    ;
    
    function onAddBook(e) {
        e.preventDefault();
        
        if (newBook.title === " " || newBook.author === " " || newBook.plot === " " || newBook.img === " ") {
            alert('Все поля должны бытьзаполнены!');
            return;
        }

        const booksStorage = JSON.parse(localStorage.getItem("books"));
        console.log("из пуша", booksStorage);

        booksStorage.push(newBook);
        console.log("после пуша", booksStorage)
        
        localStorage.setItem("books", JSON.stringify(booksStorage));
        console.log(localStorage.getItem("books"));
        
        renderList();

        renderItem.innerHTML = renderMarkUp(newBook);

        setTimeout(() => alert("Книга добавлена!"), 300);
    }

}


renderList();
editBook();