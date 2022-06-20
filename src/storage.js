
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

export { StorageCtrl }