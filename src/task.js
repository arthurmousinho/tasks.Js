const Task = {
    all: Storage.get(),
    inputField: document.querySelector('#taskInput'),
    tasksContainer: document.querySelector('main .tasks-container'),

    emptyField() {
        if (this.inputField.value.trim() === "") {
            return true
        } 
        return false
    },

    clearInput() {
        this.inputField.value = ""
    },

    clearContainer() {
        this.tasksContainer.innerHTML = ""
    },

    add() {
        if (this.emptyField() === true) {
            alert('Digite sua tarefa para adicionar!!')
        } 
        else {
            const newTaskObject = {
                name: this.inputField.value,
                status: "to-do"
            }
            DOM.newTask(this.tasksContainer, newTaskObject.status,newTaskObject.name)
            this.all.push(newTaskObject)
            Storage.set(this.all)
            this.clearInput()
        }
    },

    check(index) {
        let taskChosen = this.all[index]
        taskChosen.status = "done"
        this.clearContainer()
        App.init()
    },

    remove(index) {
        this.all.splice(index, 1);
        this.clearContainer()
        App.init()
    }
}
