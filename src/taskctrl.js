import { StorageCtrl } from "./storage"

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

export { TaskCtrl }