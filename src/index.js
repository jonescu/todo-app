// Storage Controller
const StorageCtrl = (function(){

})()










// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        taskList: '.task-list',
        projectList: '.project-list',
        addTaskBtn: '.add-task',
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
                    <a href=""><i class="las la-trash"></i></a>
                    <a href="#"><i class="las la-pen"></i></a>
                </div>
            </li>`
            })

            // Insert project 
            document.querySelector(UISelectors.projectList).innerHTML = html
        },

        populateTaskList: function(tasks){
            let html = ''

            tasks.forEach(task => {
                html += `<li class="list-group-item task-list-item" id="task-${task.id}"><strong>${task.name}:</strong>  <em>${task.description}</em>
                <div class="div float-end">
                    <a href="#"><i class="las la-trash"></i></a>
                    <a href="#"><i class="las la-pen"></i></a>
                </div>
            </li>`
            })

            // Insert list item
            document.querySelector(UISelectors.taskList).innerHTML = html
        },

        getSelectors: function(){
            return UISelectors
        },

        getTaskInput: function(){
            return {
                name: document.querySelector(UISelectors.taskNameInput).value,
                description: document.querySelector(UISelectors.taskDescriptionInput).value
            }
        }
    }

})()










// Item Controller
const TaskCtrl = (function(){
    // Item constructor
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
            {id: 0, name: "Project One"}
        ],
        tasks: [
            {id: 0, name: "Task one", description: "my description"},
            {id: 1, name: "Task two", description: "my second description"},
            {id: 2, name: "Task three", description: "my third description"}
        ],
        currentItem: null,
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
        addTask: function(name, description){
            // Generate an ID
            let ID;
            if(data.tasks.length > 0){
                ID = data.tasks[data.tasks.length -1].id +1
            } else {
                ID = 0;
            }

            // Create new task
            newTask = new Task(ID, name, description)
            // Add to data structure
            data.tasks.push(newTask)

            return newTask
        },
        logData: function(){
            return data;
        }
    }
})()








// App Controller
const App = (function(TaskCtrl, UICtrl){

    const loadEventListeners = function(){
        const UISelectors = UICtrl.getSelectors()

        // Add task event 
        document.querySelector(UISelectors.addTaskBtn).addEventListener('click', taskAddSubmit)
    }

    const taskAddSubmit = function(e){
        // Get form input from UI controller
        const input = UICtrl.getTaskInput()

        // Check for empty input
        if(input.name !== '' && input.description !== '') {
            // Add task
            const newTask = TaskCtrl.addTask(input.name, input.description)
        } else {
            return false
        }

        e.preventDefault()
    }

    // Public methods
    return {
        init: function(){
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

})(TaskCtrl, UICtrl)

App.init();