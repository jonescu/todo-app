import { Todo, Project } from "./createTodo";

const projectList = document.querySelector('.projects-list')
const projectTitle = document.querySelector('.project-title')
const addProjectBtn = document.querySelector('.add-project-btn')

//Add a project
function addProject(){
    //Check for empty input
    if(projectTitle.value === ''){
        alert('Project title cannot be empty')
        return
    } else {
    //Create list item
    const newProjectItem = document.createElement('li')
    //Add class
    newProjectItem.className = 'project-item'
    //Set text value
    newProjectItem.textContent = projectTitle.value
    //Create X button
    const removeProjectBtn = document.createElement('button');
    //Add class
    removeProjectBtn.className = 'remove-project-btn'
    //Set text value
    removeProjectBtn.textContent = 'X'
    //Append to list
    projectList.appendChild(newProjectItem)
    projectList.appendChild(removeProjectBtn)
    //Reset input value
    projectTitle.value = '';
    }
}

addProjectBtn.addEventListener('click', addProject)

//Remove a project
function removeProject(e){
    if(e.target.classList.contains('remove-project-btn')) {
        e.target.parentNode.removeChild(e.target.previousSibling)
        e.target.parentNode.removeChild(e.target)
    } return;
}

projectList.addEventListener('click', removeProject)