const addInput = document.getElementById('add__input');
const addButton = document.querySelector('.add__btn');
const incompleteTaskList = document.querySelector('.todo__list');
const completedTasksList = document.querySelector('.done__list');

const createNewTaskElement = function(taskString) {
  const taskItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  taskItem.className = 'task';
  label.innerText = taskString;
  label.className = 'task__name';
  checkBox.type = 'checkbox';
  checkBox.className = 'task__checkBox';
  editInput.type = 'text';
  editInput.className = 'task__input';
  editButton.innerText = 'Edit';
  editButton.className = 'task__edit-btn';
  deleteButton.className = 'task__delete-btn';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'task__delete-icon';
  
  deleteButton.appendChild(deleteButtonImg);
  taskItem.appendChild(checkBox);
  taskItem.appendChild(label);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
};

const addTask = () => {
  console.log('Add Task...');
  if (!addInput.value) return;

  const taskItem = createNewTaskElement(addInput.value);
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);

  addInput.value = '';
}

const editTask = function() {
  console.log('Edit Task...');
  console.log('Change edit to save');

  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector('input[type=text]');
  const label = taskItem.querySelector('.task__name');
  const editBtn = taskItem.querySelector('.task__edit-btn');
  const isEditMode = taskItem.classList.contains('task_edit');
    
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  
  taskItem.classList.toggle('task_edit');
};

const deleteTask = function() {
  console.log("Delete Task...");

  const taskItem = this.parentNode;
  const ul = taskItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(taskItem);
}

const taskCompleted = function() {
  console.log('Complete Task...');

    //Append the task list item to the #completed-tasks
  const taskItem = this.parentNode;
  completedTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
}


const taskIncomplete = function() {
  console.log('Incomplete Task...');
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const taskItem = this.parentNode;
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem,taskCompleted);
}

const ajaxRequest = () => {
    console.log('AJAX Request');
};

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.addEventListener('click', (event) => {
  addTask(event);
  ajaxRequest();
});


const bindTaskEvents = (tasktaskItem, checkBoxEventHandler) => {
  console.log('Bind list item events...');

  const checkBox = tasktaskItem.querySelector('input[type=checkbox]');
  const editButton = tasktaskItem.querySelector('.task__edit-btn');
  const deleteButton = tasktaskItem.querySelector('.task__delete-btn');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', checkBoxEventHandler);
};

for (let i = 0; i < incompleteTaskList.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskList.children[i], taskCompleted);
}


for (let i = 0; i < completedTasksList.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}


// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.