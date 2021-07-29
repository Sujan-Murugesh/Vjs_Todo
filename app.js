//Selecters
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


//Event Listners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click",filterTodo);


//Functions
//------------------------------------------------
    //crate todo list dynamically...
    /* <div class="todo">
        <li></li>
        <button></button>
        <button></button>
    </div> */
//------------------------------------------------

function addTodo(event) {
    //prevent form from submitting 
    event.preventDefault();

    //create todo div -- to dynamically need to create...
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create list
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    //put new todo into div
    todoDiv.appendChild(newTodo);

    //add todo to local storage
    saveLocalTodos(todoInput.value);
    

    //check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear todo input value
    todoInput.value = "";
}

//--------------------------------------------------
    //function for delete and check the todo list
//--------------------------------------------------
function deleteCheck(e){
    //console.log(e.target);
    const item = e.target; // it can be anything..

    //Delete
    if(item.classList[0] === "trash-btn") {
        //item.remove();
        //remove parent item
        const todo = item.parentElement;

        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo); //to rm LS
        todo.addEventListener('transitionend', function(){
            //only execute after animation
            todo.remove();
        });
        //todo.remove();
    }

    //CHECK
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

// function filterTodo(e) {
//   const todos = todoList.childNodes;
//   todos.forEach(function(todo) {
//     switch (e.target.value) {
//       case "all":
//         todo.style.display = "flex";
//         break;
//       case "completed":
//         if (todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//         break;
//       case "uncompleted":
//         if (!todo.classList.contains("completed")) {
//           todo.style.display = "flex";
//         } else {
//           todo.style.display = "none";
//         }
//     }
//   });
// }

//--------------------------------------------------
    //function for filtering the todo list
//--------------------------------------------------
function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
   // console.log(todos);
   todos.forEach(function(todo) {
        switch(e.target.value){
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }else {
                    todo.style.display = "none";
                }
                break;
        }
   });
}
//localStorage.clear();
function saveLocalTodos(todo){
    //CHECK DO I  ALREADY HAVE THINGS IN THERE? / LOCAL STORAGE
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//getting items from the local storage bcz once refresh the page 
//already stored items will not appearing on the page.
function getTodos(){
    //CHECK DO I  ALREADY HAVE THINGS IN THERE? / LOCAL STORAGE
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        //create todo div -- to dynamically need to create...
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("todo");

            //create list
            const newTodo = document.createElement('li');
            newTodo.innerText = todo;
            newTodo.classList.add('todo-item');
            //put new todo into div
            todoDiv.appendChild(newTodo);
 
            //check mark button
            const completedButton = document.createElement('button');
            completedButton.innerHTML = '<i class="fas fa-check"></i>';
            completedButton.classList.add("complete-btn");
            todoDiv.appendChild(completedButton);

            //check trash button
            const trashButton = document.createElement('button');
            trashButton.innerHTML = '<i class="fas fa-trash"></i>';
            trashButton.classList.add("trash-btn");
            todoDiv.appendChild(trashButton);

            //append to list
            todoList.appendChild(todoDiv);
    });
}

//to remove localstorage item permanantly...
function removeLocalTodos(todo){
    //CHECK DO I  ALREADY HAVE THINGS IN THERE? / LOCAL STORAGE
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf("sujan"));
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// const todos = ["item1", "item2", "item3", "item4", "item4"];
// console.log(todos.indexOf("item3")); 
// const item3Index = todos.indexOf("item3");
    // it will return the number of index value...
//todos.splice(item3Index, 1);
//console.log(todos);
