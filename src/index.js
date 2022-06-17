// Storage Controller
const StorageCtrl = (function(){

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
                html += `<li class="list-group-item project-list-item" id="project-${project.id}"><strong>Item One</strong>
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
        projects: [
            // {id: 0, name: "Project One"}
        ],
        tasks: [
            // {id: 0, name: "Task one", description: "my description"},
            // {id: 1, name: "Task two", description: "my second description"},
            // {id: 2, name: "Task three", description: "my third description"}
        ],
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
const App = (function(TaskCtrl, UICtrl){

    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors()

        // Add task event 
        document.querySelector(UISelectors.addTaskBtn).addEventListener('click', taskAddSubmit)

        // Edit task event
        document.querySelector(UISelectors.taskList).addEventListener('click', editTask)

        // Update task event
        document.querySelector(UISelectors.updateTaskBtn).addEventListener('click', updateTaskSubmit)

        // Add project event
        document.querySelector(UISelectors.addProjectBtn).addEventListener('click', projectAddSubmit)

        // Edit project event
        document.querySelector(UISelectors.projectList).addEventListener('click', editProject)

        // Update project event
        document.querySelector(UISelectors.updateProjectBtn).addEventListener('click', updateProjectSubmit)


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
        } else {
            console.log('not working')
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
        // Clear fields
        UICtrl.clearProjectEditState()

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
)(TaskCtrl, UICtrl)

App.init()