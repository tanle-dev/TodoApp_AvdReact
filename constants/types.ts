

export class Task {
    constructor(public id: string | number[], public title: string, public completed: boolean) {
        // Initialize the properties of the task
        this.id = id;
        this.title = title;
        this.completed = completed;
    }
}

