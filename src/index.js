// Storage Controller
const StorageCtrl = (function(){
    return {
        storeTask: function(task) {
            let tasks
            if(localStorage.getItem('tasks') === null){
                tasks = []
                // Push new project
                tasks.push(task)
                // Set LS
                localStorage.setItem('tasks', JSON.stringify(tasks))
            } else {
                // Get what's in LS already
                tasks = JSON.parse(localStorage.getItem('tasks'))
                // Push new project
                tasks.push(task)
                // Reset LS
                localStorage.setItem('tasks', JSON.stringify(tasks))
            }
        },

        getTasksFromStorage: function(){
            let tasks
            if(localStorage.getItem('tasks') === null){
                tasks = []
            } else {
                tasks = JSON.parse(localStorage.getItem('tasks'))
            }
            return tasks
        },

        updateTaskStorage: function(updatedTask){
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            tasks.forEach(function(task, index) {
                if(updatedTask.id === task.id){
                    tasks.splice(index, 1, updatedTask)
                }
                localStorage.setItem('tasks', JSON.stringify(tasks))
            })
        },

        deleteTaskFromStorage: function(id){
            let tasks = JSON.parse(localStorage.getItem('tasks'))
            tasks.forEach(function(task, index) {
                if(id === task.id){
                    tasks.splice(index, 1)
                }
                localStorage.setItem('tasks', JSON.stringify(tasks))
            })
        },

        storeProject: function(project){
            let projects
            // Check for items in LS
            if(localStorage.getItem('projects') === null){
                projects = []
                // Push new project
                projects.push(project)
                // Set LS
                localStorage.setItem('projects', JSON.stringify(projects))
            } else {
                // Get what's in LS already
                projects = JSON.parse(localStorage.getItem('projects'))
                // Push new project
                projects.push(project)
                // Reset LS
                localStorage.setItem('projects', JSON.stringify(projects))
            }
        },

        getProjectsFromStorage: function(){
            let projects
            if(localStorage.getItem('projects') === null){
                projects = []
            } else {
                projects = JSON.parse(localStorage.getItem('projects'))
            }
            return projects
        },

        updateProjectStorage: function(updatedProject){
            let projects = JSON.parse(localStorage.getItem('projects'))
            projects.forEach(function(project, index) {
                if(updatedProject.id === project.id){
                    projects.splice(index, 1, updatedProject)
                }
                localStorage.setItem('projects', JSON.stringify(projects))
            })
        },

        deleteProjectFromStorage: function(id){
            let projects = JSON.parse(localStorage.getItem('projects'))
            projects.forEach(function(project, index) {
                if(id === project.id){
                    projects.splice(index, 1)
                }
                localStorage.setItem('projects', JSON.stringify(projects))
            })
        }
    }
})()

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
            console.log(taskId)
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

// Task Controller
const TaskCtrl = (function(){
    // Task constructor
    const Task = function(id, name, description){
        this.id = id
        this.name = name
        this.description = description
    }

    // Project constructor
    const Project = function(id, name) {
        this.id = id
        this.name = name
    }

    //Data structure / State
    const data = {
        projects: StorageCtrl.getProjectsFromStorage(),
        tasks: StorageCtrl.getTasksFromStorage(),
        currentTask: null,
        currentProject: null,
        currentList: null
    }

    // Public methods
    return {

        getProjects: function(){
            return data.projects
        },

        getTasks: function(){
            return data.tasks
        },

        addProject: function(name){
            // Generate an ID
            let ID;
            if(data.projects.length > 0){
                ID = data.projects[data.projects.length -1].id +1
            } else {
                ID = 0
            }
            // Create new project
            const newProject = new Project(ID, name)
            // Add to data structure
            data.projects.push(newProject)
            return newProject
        },

        addTask: function(name, description){
            // Generate an ID
            let ID;
            if(data.tasks.length > 0){
                ID = data.tasks[data.tasks.length -1].id +1
            } else {
                ID = 0
            }

            // Create new task
            const newTask = new Task(ID, name, description)
            // Add to data structure
            data.tasks.push(newTask)
            return newTask
        },

        getTaskById: function(id){
            let found = null

            data.tasks.forEach(task => {
                if(task.id === id) {
                    found = task
                }
            })
            return found
        },

        updateTask: function(name, description) {
            let found = null
            // Update in data structure
            data.tasks.forEach(task => {
                if(task.id === data.currentTask.id) {
                    task.name = name
                    task.description = description
                    found = task
                }
            })
            return found
        },

        updateProject: function(name){
            let found = null
            // Update in data structure
            data.projects.forEach(project => {
                if(project.id === data.currentProject.id) {
                    project.name = name
                    found = project
                }
            })
            return found
        },

        deleteTask: function(id){
            const ids = data.tasks.map(task => task.id)
            const index = ids.indexOf(id)
            data.tasks.splice(index, 1)
        },

        deleteProject: function(id){
            const ids = data.projects.map(project => project.id)
            const index = ids.indexOf(id)
            data.projects.splice(index, 1)
        },

        getProjectById: function(id){
            let found = null
            data.projects.forEach(project => {
                if(project.id === id) {
                    found = project
                }
            })
            return found
        },

        setCurrentTask: function(task){
            data.currentTask = task
        },

        getCurrentTask: function(){
            return data.currentTask
        },

        setCurrentProject: function(project) {
            data.currentProject = project
        },

        getCurrentProject: function(){
            return data.currentProject
        },

        logData: function(){
            return data
        }
    }
})()

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