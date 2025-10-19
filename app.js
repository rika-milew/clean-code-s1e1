const addInput = document.getElementById('add__input');
const addButton = document.querySelector('.add__btn');
const incompleteTaskList = document.querySelector('.todo__list');
const completedTasksList = document.querySelector('.done__list');

const createNewTaskElement = function(taskString) {
  const taskItem = document.createElement('li');
  const taskCheckbox = document.createElement('input');
  const taskLabel = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  taskItem.className = 'task';
  taskLabel.innerText = taskString;
  taskLabel.className = 'task__name';
  taskCheckbox.type = 'checkbox';
  taskCheckbox.className = 'task__checkbox';
  editInput.type = 'text';
  editInput.className = 'task__input';
  editButton.innerText = 'Edit';
  editButton.className = 'task__edit-btn';
  deleteButton.className = 'task__delete-btn';
  deleteButtonImg.src = './remove.svg';
  deleteButtonImg.className = 'task__delete-icon';
  
  deleteButton.appendChild(deleteButtonImg);
  taskItem.appendChild(taskCheckbox);
  taskItem.appendChild(taskLabel);
  taskItem.appendChild(editInput);
  taskItem.appendChild(editButton);
  taskItem.appendChild(deleteButton);

  return taskItem;
};

const addTask = () => {
  if (!addInput.value.trim()) return;
  const taskItem = createNewTaskElement(addInput.value);
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskCompleted);
  addInput.value = '';
  addInput.focus();
}

const editTask = function() {
  const taskItem = this.parentNode;
  const editInput = taskItem.querySelector('input[type=text]');
  const taskLabel = taskItem.querySelector('.task__name');
  const editBtn = taskItem.querySelector('.task__edit-btn');
  const isEditMode = taskItem.classList.contains('task_edit');
    
  if (isEditMode) {
    if (editInput.value.trim() === '') return;
    taskLabel.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = taskLabel.innerText;
    editBtn.innerText = 'Save';
  }
  
  taskItem.classList.toggle('task_edit');
};

const deleteTask = function() {
  const taskItem = this.parentNode;
  const taskList = taskItem.parentNode;
  taskList.removeChild(taskItem);
}

const taskCompleted = function() {
  const taskItem = this.parentNode;
  completedTasksList.appendChild(taskItem);
  bindTaskEvents(taskItem, taskIncomplete);
}

const taskIncomplete = function() {
  const taskItem = this.parentNode;
  incompleteTaskList.appendChild(taskItem);
  bindTaskEvents(taskItem,taskCompleted);
}

const ajaxRequest = () => {
    console.log('AJAX Request');
};

addButton.addEventListener('click', (event) => {
  event.preventDefault();
  addTask(event);
  ajaxRequest();
});

addInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    addTask();
  }
});

const bindTaskEvents = (taskItem, checkBoxEventHandler) => {
  const checkbox = taskItem.querySelector('.task__checkbox');
  const editButton = taskItem.querySelector('.task__edit-btn');
  const deleteButton = taskItem.querySelector('.task__delete-btn');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkbox.addEventListener('change', checkBoxEventHandler);
};

[...incompleteTaskList.children].forEach(task => bindTaskEvents(task, taskCompleted));
[...completedTasksList.children].forEach(task => bindTaskEvents(task, taskIncomplete));