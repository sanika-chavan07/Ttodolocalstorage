let cl = console.log;

let todoItem = document.getElementById("todoItem");
let todoFrom = document.getElementById("todoFrom");
let todoContainer = document.getElementById("todoContainer");
let updateTodoBtn = document.getElementById("updateTodoBtn");

let addBtn= document.getElementById("addBtn");

let todoArr = [];

// ================= LocalStorage =================
if (localStorage.getItem("todoArr")) {
    todoArr = JSON.parse(localStorage.getItem("todoArr"));
} else {
    todoArr = [];
}

cl(todoArr);

// ================= Create List =================
function createList(arr) {

    let result = `<ul class="list-group">`;

    arr.forEach(ele => {
        result += `
            <li class="list-group-item d-flex justify-content-between align-items-center" id="${ele.id}">
                <strong>${ele.todoitem}</strong>
                <div>
                    <i onclick="onEdit(${ele.id})"
                       class="fa-solid fa-pen-to-square fa-2x text-primary me-3"
                       role="button"></i>

                    <i onclick="onRemove(${ele.id})"
                       class="fa-solid fa-trash fa-2x text-danger"
                       role="button"></i>
                </div>
            </li>
        `;
    });

    result += `</ul>`;
    todoContainer.innerHTML = result;
}

createList(todoArr);

// ================= Add Todo =================
function onTodosubmit(eve) {
    eve.preventDefault();

    if (todoItem.value.trim() === "") {
        alert("Please enter todo");
        return;
    }

    let todosObj = {
        todoitem: todoItem.value,
        id: Date.now()
    };

    todoArr.unshift(todosObj);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    createList(todoArr);
    todoFrom.reset();

    Swal.fire({
        title: 'New todo item added successfully!',
        timer: 2000,
        icon: 'success'
    });
}

todoFrom.addEventListener("submit", onTodosubmit);

// ================= Delete Todo =================
function onRemove(id) {

    let getConfirmation = confirm("Are you sure you want to delete?");
    if (!getConfirmation) return;

    let getIndex = todoArr.findIndex(t => t.id === id);
    todoArr.splice(getIndex, 1);

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    createList(todoArr);

    Swal.fire({
        title: 'Todo deleted ${ele} successfully!',
        timer: 2000,
        icon: 'success'
    });
}

// ================= Edit Todo =================
let EDIT_ID = null;

function onEdit(id) {

    EDIT_ID = id;

    let EDIT_OBJ = todoArr.find(t => t.id === id);

    todoItem.value = EDIT_OBJ.todoitem;
addBtn.classList.add("d-none")
    updateTodoBtn.classList.remove("d-none");
    
}

// ================= Update Todo =================
function onTodoUpdate() {

    let getIndex = todoArr.findIndex(t => t.id === EDIT_ID);

    todoArr[getIndex].todoitem = todoItem.value;

    localStorage.setItem("todoArr", JSON.stringify(todoArr));

    createList(todoArr);

    todoFrom.reset();

    updateTodoBtn.classList.add("d-none");

    Swal.fire({
        title: 'Todo updated successfully!',
        timer: 2000,
        icon: 'success'
    });
}

updateTodoBtn.addEventListener("click", onTodoUpdate);
