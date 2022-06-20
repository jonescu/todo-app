import { TaskCtrl } from "./taskctrl"

// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        taskList: '.task-list',
        taskListLis: '.task-list li',
        projectList: '.project-list',
        projectListLis: '.project-list li',
        addTaskBtn: '.add-task',
        deleteTaskBtn: '.delete-task',
        updateTaskBtn: '.update-task',
        cancelTaskBtn: '.cancel-update-task',
        addProjectBtn: '.add-project',
        deleteProjectBtn: '.delete-project',
        updateProjectBtn: '.update-project',
        cancelProjectBtn: '.cancel-update-project',
        projectNameInput: '#project-name',
        taskNameInput: '#task-name',
        taskDescriptionInput: '#task-description'
    }

    // Public methods
    return {
        populateProjectList: function(projects){
            let html = ''
            projects.forEach(project => {
                html += `<li class="list-group-item project-list-item" id="project-${project.id}"><strong>${project.name}</strong>
                <div class="div float-end">
                    <a href="#"><i class="delete-project las la-trash"></i></a>
                    <a href="#"><i class="edit-project las la-pen"></i></a>
                </div>
            </li>`
            })
            // Insert project 
            document.querySelector(UISelectors.projectList).innerHTML = html
        },

        populateTaskList: function(tasks){
            let html = ''
            tasks.forEach(task => {
                html += `<li class="list-group-item task-list-item" id="task-${task.id}"><strong>${task.name}: </strong>  <em>${task.description}</em>
                <div class="div float-end">
                    <a href="#"><i class="delete-task las la-trash"></i></a>
                    <a href="#"><i class="edit-task las la-pen"></i></a>
                </div>
            </li>`
            })
            // Insert task
            document.querySelector(UISelectors.taskList).innerHTML = html
        },

        getSelectors: function(){
            return UISelectors
        },

        getProjectInput: function(){
            return {
                name: document.querySelector(UISelectors.projectNameInput).value
            }
        },

        getTaskInput: function(){
            return {
                name: document.querySelector(UISelectors.taskNameInput).value,
                description: document.querySelector(UISelectors.taskDescriptionInput).value
            }
        },

        addTaskUI: function(task){
            // Create li element
            const li = document.createElement('li')
            // Add class
            li.className = "list-group-item task-list-item"
            // Add id
            li.id = `task-${task.id}`
            // Add html
            li.innerHTML = `<strong>${task.name}: </strong>  <em>${task.description}</em>
            <div class="div float-end">
                <a href="#"><i class="delete-task las la-trash"></i></a>
                <a href="#"><i class="edit-task las la-pen"></i></a>
            </div>`
            // Insert task
            document.querySelector(UISelectors.taskList).insertAdjacentElement('beforeend', li)
        },

        updateTaskList: function(task) {
            let listItems = document.querySelectorAll(UISelectors.taskListLis)
            listItems = Array.from(listItems)
            listItems.forEach(listItem => {
                const taskId = listItem.getAttribute('id')

                if(taskId === `task-${task.id}`){
                    document.querySelector(`#${taskId}`).innerHTML = `<strong>${task.name}: </strong>  <em>${task.description}</em>
                    <div class="div float-end">
                        <a href="#"><i class="delete-task las la-trash"></i></a>
                        <a href="#"><i class="edit-task las la-pen"></i></a>
                    </div>`
                }
            })
        },

        addProjectUI: function(project){
            // Create li element
            const li = document.createElement('li')
            // Add class
            li.className = "list-group-item project-list-item"
            // Add id
            li.id = `project-${project.id}`
            // Add html
            li.innerHTML = `<strong>${project.name}</strong>
            <div class="div float-end">
                <a href="#"><i class="delete-project las la-trash"></i></a>
                <a href="#"><i class="edit-project las la-pen"></i></a>
            </div>`
            // Insert task
            document.querySelector(UISelectors.projectList).insertAdjacentElement('beforeend', li)
        },

        updateProjectList: function(project){
            let listItems = document.querySelectorAll(UISelectors.projectListLis)
            listItems = Array.from(listItems)
            listItems.forEach(listItem => {
                const projectId = listItem.getAttribute('id')

                if(projectId === `project-${project.id}`){
                    document.querySelector(`#${projectId}`).innerHTML = `<strong>${project.name}</strong>
                    <div class="div float-end">
                        <a href="#"><i class="delete-project las la-trash"></i></a>
                        <a href="#"><i class="edit-project las la-pen"></i></a>
                    </div>`
                }
            })
        },

        deleteTaskUI: function(id){
            const taskId = `#task-${id}`
            const task = document.querySelector(taskId)
            task.remove()
        },

        deleteProjectUI: function(id){
            const projectId = `#project-${id}`
            const project = document.querySelector(projectId)
            project.remove()
        },

        clearTaskInput: function(){
            document.querySelector(UISelectors.taskNameInput).value = ''
            document.querySelector(UISelectors.taskDescriptionInput).value = ''
        },

        clearProjectInput: function(){
            document.querySelector(UISelectors.projectNameInput).value = ''
        },

        clearTaskEditState: function(){
            UICtrl.clearTaskInput()
            document.querySelector(UISelectors.updateTaskBtn).style.display = 'none'
            document.querySelector(UISelectors.cancelTaskBtn).style.display = 'none'
            document.querySelector(UISelectors.addTaskBtn).style.display = 'inline'
        },

        showTaskEditState: function(){
            document.querySelector(UISelectors.updateTaskBtn).style.display = 'inline'
            document.querySelector(UISelectors.cancelTaskBtn).style.display = 'inline'
            document.querySelector(UISelectors.addTaskBtn).style.display = 'none'
        },

        clearProjectEditState: function(){
            UICtrl.clearProjectInput()
            document.querySelector(UISelectors.updateProjectBtn).style.display = 'none'
            document.querySelector(UISelectors.cancelProjectBtn).style.display = 'none'
            document.querySelector(UISelectors.addProjectBtn).style.display = 'inline'
        },

        showProjectEditState: function(){
            document.querySelector(UISelectors.updateProjectBtn).style.display = 'inline'
            document.querySelector(UISelectors.cancelProjectBtn).style.display = 'inline'
            document.querySelector(UISelectors.addProjectBtn).style.display = 'none'
        },

        addTaskToEdit: function(){
            document.querySelector(UISelectors.taskNameInput).value = TaskCtrl.getCurrentTask().name
            document.querySelector(UISelectors.taskDescriptionInput).value = TaskCtrl.getCurrentTask().description
            UICtrl.showTaskEditState()
        },

        addProjectToEdit: function(){
            document.querySelector(UISelectors.projectNameInput).value = TaskCtrl.getCurrentProject().name
            UICtrl.showProjectEditState()
        }
    }

})()

export { UICtrl }