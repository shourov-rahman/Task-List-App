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
  
  //DOM load event
  document.addEventListener('DOMContentLoaded',getTasks);

  //Add task event
  form.addEventListener('submit',addTask)
  
  //Remove task event
  taskList.addEventListener('click',removeTask);

  //Clear task event
  clearBtn.addEventListener('click',clearTasks);
  
  //Filter tasks event
  filter.addEventListener('keyup',filterTasks);

}
//Get Tasks from local storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
  const li = document.createElement('li');
  
  // Add class
  li.className = 'collection-item';

  //Create text node and append to li
  li.appendChild(document.createTextNode(task));

  // Create new link element
  const link = document.createElement('a');
  
  //Add class
  link.className = 'delete-item secondary-content';
  
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);
  })
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

  // Create new link element
  const link = document.createElement('a');
  
  //Add class
  link.className = 'delete-item secondary-content';
  
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  //prevent default method
  e.preventDefault();
}


//Store Task function
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Remove Task function

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();

    //Remove from Local Storage
    //Note (e.target.parentElement.parentElement= li)
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}

//Remove from Local Storage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
}

//Clear Task function

function clearTasks(){
  // clear task by using innerHTML(not recommended)
  // taskList.innerHTML = '';

  //To remove all child nodes of a node
  /* 
  Process
  --------
  ??? First, select the first child node (firstChild) and remove it using the removeChild() method. Once the first child node is removed, the next child node will automatically become the first child node. 
  
  ??? Second, repeat the first steps until there is no remaining child node.
  */
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }

  // Clear Task from local storage
  clearTasksFromLocalStorage();
}
//Clear Task from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    // -1 represent no match
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display ='block';
    }else{
      task.style.display = 'none';
    }
  })
}
