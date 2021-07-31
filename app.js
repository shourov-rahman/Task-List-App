//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn =document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//function call
loadEventListeners();


//Load all event liseners
function loadEventListeners(){
  form.addEventListener('submit',addTask)
}

//Add task
function addTask(e){
  if(taskInput.value===''){
    alert ('Add a task');
  }
  
  // Create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item';

  //Create text node and append to li

  li.appendChild(document.createTextNode(taskInput.value));


  //prevent default method
  e.preventDefault();
}
