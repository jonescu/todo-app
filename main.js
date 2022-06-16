/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("// Storage Controller\nconst StorageCtrl = (function(){\n\n})()\n\n\n\n\n\n\n\n\n\n\n// UI Controller\nconst UICtrl = (function(){\n    const UISelectors = {\n        taskList: '.task-list',\n        projectList: '.project-list',\n        addTaskBtn: '.add-task',\n        taskNameInput: '#task-name',\n        taskDescriptionInput: '#task-description'\n    }\n\n    // Public methods\n    return {\n        populateProjectList: function(projects){\n            let html = ''\n\n            projects.forEach(project => {\n                html += `<li class=\"list-group-item project-list-item\" id=\"project-${project.id}\"><strong>Item One</strong>\n                <div class=\"div float-end\">\n                    <a href=\"\"><i class=\"las la-trash\"></i></a>\n                    <a href=\"#\"><i class=\"las la-pen\"></i></a>\n                </div>\n            </li>`\n            })\n\n            // Insert project \n            document.querySelector(UISelectors.projectList).innerHTML = html\n        },\n\n        populateTaskList: function(tasks){\n            let html = ''\n\n            tasks.forEach(task => {\n                html += `<li class=\"list-group-item task-list-item\" id=\"task-${task.id}\"><strong>${task.name}:</strong>  <em>${task.description}</em>\n                <div class=\"div float-end\">\n                    <a href=\"#\"><i class=\"las la-trash\"></i></a>\n                    <a href=\"#\"><i class=\"las la-pen\"></i></a>\n                </div>\n            </li>`\n            })\n\n            // Insert list item\n            document.querySelector(UISelectors.taskList).innerHTML = html\n        },\n\n        getSelectors: function(){\n            return UISelectors\n        },\n\n        getTaskInput: function(){\n            return {\n                name: document.querySelector(UISelectors.taskNameInput).value,\n                description: document.querySelector(UISelectors.taskDescriptionInput).value\n            }\n        }\n    }\n\n})()\n\n\n\n\n\n\n\n\n\n\n// Item Controller\nconst TaskCtrl = (function(){\n    // Item constructor\n    const Task = function(id, name, description){\n        this.id = id\n        this.name = name\n        this.description = description\n    }\n\n    // Project constructor\n    const Project = function(id, name) {\n        this.id = id\n        this.name = name\n    }\n\n    //Data structure / State\n    const data = {\n        projects: [\n            {id: 0, name: \"Project One\"}\n        ],\n        tasks: [\n            {id: 0, name: \"Task one\", description: \"my description\"},\n            {id: 1, name: \"Task two\", description: \"my second description\"},\n            {id: 2, name: \"Task three\", description: \"my third description\"}\n        ],\n        currentItem: null,\n        currentList: null\n    }\n\n    // Public methods\n    return {\n        getProjects: function(){\n            return data.projects\n        },\n        getTasks: function(){\n            return data.tasks\n        },\n        addTask: function(name, description){\n            // Generate an ID\n            let ID;\n            if(data.tasks.length > 0){\n                ID = data.tasks[data.tasks.length -1].id +1\n            } else {\n                ID = 0;\n            }\n\n            // Create new task\n            newTask = new Task(ID, name, description)\n            // Add to data structure\n            data.tasks.push(newTask)\n\n            return newTask\n        },\n        logData: function(){\n            return data;\n        }\n    }\n})()\n\n\n\n\n\n\n\n\n// App Controller\nconst App = (function(TaskCtrl, UICtrl){\n\n    const loadEventListeners = function(){\n        const UISelectors = UICtrl.getSelectors()\n\n        // Add task event \n        document.querySelector(UISelectors.addTaskBtn).addEventListener('click', taskAddSubmit)\n    }\n\n    const taskAddSubmit = function(e){\n        // Get form input from UI controller\n        const input = UICtrl.getTaskInput()\n\n        // Check for empty input\n        if(input.name !== '' && input.description !== '') {\n            // Add task\n            const newTask = TaskCtrl.addTask(input.name, input.description)\n        } else {\n            return false\n        }\n\n        e.preventDefault()\n    }\n\n    // Public methods\n    return {\n        init: function(){\n            // Fetch items from data structure\n            const tasks = TaskCtrl.getTasks()\n            // Populate list with items\n            UICtrl.populateTaskList(tasks)\n            // Fetch projects from data structure\n            const projects = TaskCtrl.getProjects()\n            // Populate list with projects\n            UICtrl.populateProjectList(projects)\n            // Load event listeners\n            loadEventListeners()\n        }\n    }\n\n})(TaskCtrl, UICtrl)\n\nApp.init();\n\n//# sourceURL=webpack://todo-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;