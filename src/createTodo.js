class Todo {
    constructor(Title, Due, Description) {
        this.Title = Title
        this.Due = Due
        this.Description = Description
    }
}

function Project(Title) {
    this.Title = Title;
}

export { Todo, Project }