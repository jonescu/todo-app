import { StorageCtrl } from "./storage"
import { TaskCtrl } from "./taskctrl"
import { UICtrl } from "./ui"
// App Controller
const App = (function(TaskCtrl, StorageCtrl, UICtrl){

    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors()

        // Add task / project events
        document.querySelector(UISelectors.addTaskBtn).addEventListener('click', taskAddSubmit)
        document.querySelector(UISelectors.addProjectBtn).addEventListener('click', projectAddSubmit)

        // Edit task / projects events
        document.querySelector(UISelectors.taskList).addEventListener('click', editTask)
        document.querySelector(UISelectors.projectList).addEventListener('click', editProject)

        // Update task / projects events
        document.querySelector(UISelectors.updateTaskBtn).addEventListener('click', updateTaskSubmit)
        document.querySelector(UISelectors.updateProjectBtn).addEventListener('click', updateProjectSubmit)

        // Back button events
        document.querySelector(UISelectors.cancelProjectBtn).addEventListener('click', UICtrl.clearProjectEditState)
        document.querySelector(UISelectors.cancelTaskBtn).addEventListener('click', UICtrl.clearTaskEditState)

        // Delete button events
        document.querySelector(UISelectors.taskList).addEventListener('click', deleteTaskSubmit)
        document.querySelector(UISelectors.projectList).addEventListener('click', deleteProjectSubmit)
    }

    const projectAddSubmit = function(e){
        // Get form input from UI controller
        const input = UICtrl.getProjectInput()
        // Check for empty input
        if(input.name !== '') {
            // Add task
            const newProject = TaskCtrl.addProject(input.name)
            // Add project to UI
            UICtrl.addProjectUI(newProject)
            // Add to LS
            StorageCtrl.storeProject(newProject)
            // Clear fields
            UICtrl.clearProjectInput();
        }
        e.preventDefault()
    }

    const taskAddSubmit = function(e){
        // Get form input from UI controller
        const input = UICtrl.getTaskInput()
        // Check for empty input
        if(input.name !== '' && input.description !== '') {
            // Add task
            const newTask = TaskCtrl.addTask(input.name, input.description)
            // Add task to UI
            UICtrl.addTaskUI(newTask)
            // Add to LS
            StorageCtrl.storeTask(newTask);
            // Clear fields
            UICtrl.clearTaskInput();
        } 
        e.preventDefault()
    }

    const editTask = function(e){
        if(e.target.classList.contains('edit-task')){
            // Get great grandparent id
            const taskId = e.target.parentElement.parentElement.parentElement.id;
            // Split
            const taskIdArray = taskId.split('-')
            // Get actual id
            const id = parseInt(taskIdArray[1])
            // Get task
            const taskToEdit = TaskCtrl.getTaskById(id)
            // Set current item
            TaskCtrl.setCurrentTask(taskToEdit)
            // Add task to form for editing
            UICtrl.addTaskToEdit();
        } 
        e.preventDefault()
    }

    const updateTaskSubmit = function(e) {
        // Get task input
        const input = UICtrl.getTaskInput()
        // Update task
        const updatedTask = TaskCtrl.updateTask(input.name, input.description)
        // Update UI
        UICtrl.updateTaskList(updatedTask)
        // Update LS
        StorageCtrl.updateTaskStorage(updatedTask)
        // Clear fields
        UICtrl.clearTaskEditState()
        e.preventDefault()
    }

    const editProject = function(e) {
        if(e.target.classList.contains('edit-project')){
            // Get great grandparent id
            const projectId = e.target.parentElement.parentElement.parentElement.id;
            // Split
            const projectIdArray = projectId.split('-')
            // Get actual id
            const id = parseInt(projectIdArray[1])
            // Get task
            const projectToEdit = TaskCtrl.getProjectById(id)
            // Set current item
            TaskCtrl.setCurrentProject(projectToEdit)
            // Add task to form for editing
            UICtrl.addProjectToEdit();
        } 
        e.preventDefault()
    }

    const updateProjectSubmit = function(e) {
        // Get task input
        const input = UICtrl.getProjectInput()
        // Update task
        const updatedProject = TaskCtrl.updateProject(input.name)
        // Update UI
        UICtrl.updateProjectList(updatedProject)
        // Update LS
        StorageCtrl.updateProjectStorage(updatedProject)
        // Clear fields
        UICtrl.clearProjectEditState()
        e.preventDefault()
    }

    const deleteTaskSubmit = function(e){
        if(e.target.classList.contains('delete-task')){
          // Get great grandparent id
          const taskId = e.target.parentElement.parentElement.parentElement.id;
          // Split
          const taskIdArray = taskId.split('-')
          // Get actual id
          const id = parseInt(taskIdArray[1])
          // Delete from data structure
          TaskCtrl.deleteTask(id)
          // Delete from UI
          UICtrl.deleteTaskUI(id)
          // Delete from storage
          StorageCtrl.deleteTaskFromStorage(id)
        }
        e.preventDefault()
    }

    const deleteProjectSubmit = function(e){
        if(e.target.classList.contains('delete-project')){
            // Get great grandparent id
            const projectId = e.target.parentElement.parentElement.parentElement.id;
            // Split
            const projectIdArray = projectId.split('-')
            // Get actual id
            const id = parseInt(projectIdArray[1])
            // Delete from data structure
            TaskCtrl.deleteProject(id)
            // Delete from UI
            UICtrl.deleteProjectUI(id)
            // Delete from storage
            StorageCtrl.deleteProjectFromStorage(id)
          }
          e.preventDefault()
    }

    // Public methods
    return {
        init: function(){
            // Set initial state
            UICtrl.clearProjectEditState()
            UICtrl.clearTaskEditState()
            // Fetch items from data structure
            const tasks = TaskCtrl.getTasks()
            // Populate list with items
            UICtrl.populateTaskList(tasks)
            // Fetch projects from data structure
            const projects = TaskCtrl.getProjects()
            // Populate list with projects
            UICtrl.populateProjectList(projects)
            // Load event listeners
            loadEventListeners()
        }
    }
  }
)(TaskCtrl, StorageCtrl, UICtrl)

App.init()

export { App }