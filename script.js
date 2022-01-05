import books from "./books.js"
const root = document.getElementById('root');

const divOne = document.createElement("div");
divOne.classList.add("first_div");
const divTwo = document.createElement("div");
divTwo.classList.add("second_div");
const title = document.createElement("h1");
const list = document.createElement("ul");
const button = document.createElement("button");

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
            return `<li><p>${item.title}</p><button class="edit">Edit</button><button class="delete">Delete</button></li>`
        }).join("")
    ))

    const discription = document.querySelectorAll('p');
    const btnEdit = document.querySelectorAll('.edit');
    const btnDelete = document.querySelectorAll('.delete');

    discription.forEach(item => item.addEventListener('click', renderBook));
    btnEdit.forEach(item => item.addEventListener('click', editBook));
    btnDelete.forEach(item => item.addEventListener('click', deleteBook));

}

function renderBook() {
    console.log("renderBook");
}
function editBook() {
    console.log("editBook");
}
function deleteBook() {
    console.log("deleteBook");
}

renderList();
renderBook();
editBook();