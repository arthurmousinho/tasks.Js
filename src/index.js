const App = {
    init(){
        for (let task of Task.all){
            DOM.newTask(Task.tasksContainer, task.status, task.name)
        }
        Storage.set(Task.all)
    }
}

App.init()