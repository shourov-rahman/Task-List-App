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
  //Add task event
  form.addEventListener('submit',addTask)
  
  //Remove task event
  taskList.addEventListener('click',removeTask);

  //Clear task event
  clearBtn.addEventListener('click',clearTasks);

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

  //Clear input
  taskInput.value = '';

  //prevent default method
  e.preventDefault();
}


//Remove Task function

function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    e.target.parentElement.parentElement.remove();
  }
}

//Clear Task function

function clearTasks(){
  // clear task by using innerHTML(not recommended)
  // taskList.innerHTML = '';

  //To remove all child nodes of a node
  /* 
  Process
  --------
  ● First, select the first child node (firstChild) and remove it using the removeChild() method. Once the first child node is removed, the next child node will automatically become the first child node. 
  
  ● Second, repeat the first steps until there is no remaining child node.
  */
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
  }
}
