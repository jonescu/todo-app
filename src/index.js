import { Todo, Project } from "./createTodo";

const newItemBtn = document.querySelector('.new-item-button')
const todoContainer = document.querySelector('.todo-container')
const todoList = document.createElement('ol')
//sidebar elements
const projectsH1 = document.querySelector('.projects')
const newProjectBtn = document.querySelector('.add-project')
const projectList = document.querySelector('.project-list')
const projectContainer = document.querySelector('.projects-container')
const projectItem = document.querySelectorAll('.project-item')
const currentProjectList = document.createElement('ol')

projectList.style.display = 'none'
todoList.classList.add('todo-list')

function toggleDisplay(element) {
    element.style.display = 'none'
}

//This function generates the input fields for the to-do items when you click the add todo button
function setNewItem(){

    toggleDisplay(todoList)
    //create input
    const input = document.createElement('input')
    input.classList.add('item-input')
    input.setAttribute('placeholder', 'Task Title')

    //create textarea
    const description = document.createElement('textarea')
    description.classList.add('description-input')
    description.setAttribute('placeholder', 'Task Description')

    //create date container
    const dateContainer = document.createElement('div')
    dateContainer.classList.add('date-container')
    const dateLabel = document.createElement('label')
    dateLabel.classList.add('date-label')
    dateLabel.textContent = "due date: "
    const date = document.createElement('input')
    date.type = 'date'
    date.classList.add('date-input')
    dateContainer.appendChild(dateLabel)
    dateContainer.appendChild(date)

    //confirm add item
    const addBtn = document.createElement('button')
    addBtn.classList.add('confirm-add')
    addBtn.textContent = 'add item'

    //cancel add item
    const cancelBtn = document.createElement('button')
    cancelBtn.classList.add('cancel-add')
    cancelBtn.textContent = 'cancel'

    //append
    todoContainer.appendChild(input)
    todoContainer.appendChild(description)
    todoContainer.appendChild(dateContainer)
    todoContainer.appendChild(addBtn)
    todoContainer.appendChild(cancelBtn)
    toggleDisplay(newItemBtn)
    
    //cancel add item
    function clear(){
        todoContainer.removeChild(input)
        todoContainer.removeChild(description)
        todoContainer.removeChild(dateContainer)
        todoContainer.removeChild(addBtn)
        todoContainer.removeChild(cancelBtn)
        newItemBtn.style.display = 'block'
        todoContainer.appendChild(todoList)
        todoList.style.display = 'block'
    }

    addBtn.addEventListener('click', function(){
        if(!input.value) {
            alert('task title cannot be empty')
            return
        }
        clear();
        const newItem = new Todo(input.value, date.value, description.value);
        const listItem = document.createElement('li')
        const removeItemBtn = document.createElement('button')
        removeItemBtn.classList.add('remove-item-button')
        removeItemBtn.textContent = 'Remove Item'

        listItem.classList.add('list-item')

        for(const key in newItem) {
                listItem.textContent += `${key}: ${newItem[key]} `
        }
        listItem.appendChild(removeItemBtn)
        todoList.appendChild(listItem)
        todoList.style.display = 'block'

        removeItemBtn.addEventListener('click', function(e) {
            todoList.removeChild(e.target.parentElement)
        })
    })

    cancelBtn.addEventListener('click', clear)
}

newItemBtn.addEventListener('click', setNewItem)

projectsH1.addEventListener('click', function() {
    if(projectList.style.display === 'none'){
        projectList.style.display = 'block'
    } else if(projectList.style.display === 'block') {
        projectList.style.display = 'none'
    }
})


newProjectBtn.addEventListener('click', addProject)

function addProject(){
    projectContainer.removeChild(projectList)

    const projectInput = document.createElement('input')
    projectInput.classList.add('project-input')
    projectInput.setAttribute('placeholder', 'Project Title')

    const confirmAddProject = document.createElement('button')
    confirmAddProject.classList.add('add-project-btn')
    confirmAddProject.textContent = "Add project"

    const cancelAddProject = document.createElement('button')
    cancelAddProject.classList.add('cancel-project-btn')
    cancelAddProject.textContent = "Cancel"

    projectContainer.appendChild(projectInput)
    projectContainer.appendChild(confirmAddProject)
    projectContainer.appendChild(cancelAddProject)
    toggleDisplay(newProjectBtn)

    cancelAddProject.addEventListener('click', function(){
        projectContainer.removeChild(projectInput)
        projectContainer.removeChild(confirmAddProject)
        projectContainer.removeChild(cancelAddProject)
        newProjectBtn.style.display = 'block'
        projectContainer.appendChild(projectList)
    })

    confirmAddProject.addEventListener('click', function(){
        if(!projectInput.value) {
            alert('project title cannot be empty')
            return
        }
        const newProject = new Project(projectInput.value)
        const projectText = document.createElement('li')
        projectText.classList.add('project-item')
        projectText.textContent = newProject.Title;

        const removeProjectBtn = document.createElement('button')
        removeProjectBtn.classList.add('remove-project-btn')
        removeProjectBtn.textContent = "x"
        projectText.appendChild(removeProjectBtn)

        projectContainer.appendChild(projectList)
        projectList.appendChild(projectText)
        projectList.style.display = 'block'
        newProjectBtn.style.display = 'block'
        projectContainer.removeChild(projectInput)
        projectContainer.removeChild(confirmAddProject)
        projectContainer.removeChild(cancelAddProject)

        removeProjectBtn.addEventListener('click', function(e) {
            projectList.removeChild(e.target.parentElement)
        })

    })
}


const projectItems = document.querySelectorAll('.project-item')

projectItems.forEach(item => item.addEventListener('click', function(e){
    const projectHeading = document.createElement('h1')
    projectHeading.classList.add('project-heading')

    let text = e.target.textContent.slice(0, e.target.textContent.length-2)
    projectHeading.textContent = text;

    currentProjectList.appendChild(projectHeading)
    todoContainer.appendChild(currentProjectList)
    
    
    
    //small remove button on aside
    const remove = document.querySelectorAll('.remove-project-li')
    remove.forEach(button => button.addEventListener('click', function(e){
        e.target.parentElement.remove();
        // currentProjectList.removeChild(projectHeading)
        // todoContainer.removeChild(currentProjectList)
    }))
}))