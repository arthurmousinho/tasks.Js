const DOM = {
    newTask(container, taskStatus,task) {
        const index = Task.tasksContainer.children.length
        if (taskStatus === "to-do") {
            const taskHtml = this.toDoStatusHtml(task,index)
            this.addTaskToContainer(container, taskHtml)
        } else if (taskStatus === "done") {
            const taskHtml = this.doneStatusHtml(task,index)
            this.addTaskToContainer(container, taskHtml)
        }
    },

    addTaskToContainer(container,taskHtml) {
        const taskDiv = document.createElement('div')
        taskDiv.innerHTML = taskHtml
        taskDiv.classList.add('task')
        container.appendChild(taskDiv)
    },

    toDoStatusHtml(taskName,index) {
        const html = `
            <div>
                <img src="./assets/icons/check.svg" alt="check icon" onclick="Task.check(${index})">
                <p>${taskName}</p>
            </div>
            <img src="./assets/icons/remove.svg" alt="remove icon" onclick="Task.remove(${index})">
        `
        return html
    },

    doneStatusHtml(taskName,index) {
        const html = `
            <p style="text-decoration: line-through; color: white;">${taskName}</p>
            <img src="./assets/icons/remove.svg" alt="remove icon" onclick="Task.remove(${index})"> 
        `
        return html
    },

    timerControlsHtml() {
        const html = `
            <button class="timer-control pause" onclick="Timer.pause()">
                <img src="./assets/icons/pause.svg" alt="pause/play icon">
                Pausar
            </button>
            <button class="timer-control restart" onclick="Timer.restart()">
                <img src="./assets/icons/restart.svg" alt="pause/play icon">
                Recomeçar
            </button>
        `
        return html
    },

    timerPlayButtonHtml() {
        const html = `
        <button class="timer-control" onclick="Timer.resume()">
            <img src="./assets/icons/play.svg" alt="pause/play icon">
            Retomar
        </button>
        <button class="timer-control" onclick="Timer.restart()">
            <img src="./assets/icons/restart.svg" alt="pause/play icon">
            Recomeçar
        </button>
        `
        return html
    }
}