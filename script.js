const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("tasks.js:task")) || []
    },

    set(task){
        localStorage.setItem("tasks.js:task", JSON.stringify(task))
    }
}


const Tasks = {
    all: Storage.get(),

    validadeTaskNameField(content) {
        if (content.length == 0) {
            alert(`Digite a tarefa para adicionar !!`);
            return false;
        } else {
            return true;
        }

    },

    setTask(){
        const taskNameInput = document.getElementById('taskNameInput');
        let object = {task: taskNameInput.value}
        if (Tasks.validadeTaskNameField(taskNameInput.value) == false) {
            App.reload()
        } else {
            Tasks.all.push(object);
            DOM.addTask(object)
            App.reload()
        }
        DOM.clearTaskInput()
    },

    removeTask(index){
        Tasks.all.splice(index, 1);
        App.reload()
    },

    checkTask(index){
        Tasks.removeTask(index)
        if (Tasks.all.length == 0) {
            alert(`🎉 PARABÉNS, você finalizou todas as tarefas !!`)
        }
    }

}

const DOM = {
    taskContainer: document.querySelector('.tasks-container'),

    addTask(taskObject){
        const divGenerate = document.createElement('div')
        let index = DOM.taskContainer.children.length;
        divGenerate.innerHTML = DOM.innerHTMLTask(taskObject,index)
        DOM.taskContainer.appendChild(divGenerate)
    },

    innerHTMLTask(taskObject, index) {
       const html = `
       <div class='task'>
            <div>
                <img src="assets/check.svg" alt="check" onclick="Tasks.checkTask(${index})">
                <span>${taskObject.task}</span>
            </div>
            <img src="assets/remove.svg" alt="remove" onclick="Tasks.removeTask(${index})">
        </div>
       ` 

       return html
    },

    clearTasks(){
        DOM.taskContainer.innerHTML = ''
    },

    clearTaskInput(){
        const taskNameInput = document.getElementById('taskNameInput')
        taskNameInput.value = ``
    },

    timerControls(){
        const timerButton = document.getElementById('timer-button')
        const HTMLcontrols = `
        <div class="timer-controls">
            <img src="assets/restart.svg" alt="restart-icon" onclick="Timer.restartTimer()">
        </div>
        `
        timerButton.innerHTML = HTMLcontrols
    }

}


var interval

const Timer = {
    
    pomodoro(duration, display,message) {
        interval = setInterval(() => {
            minutes = parseInt(duration / 60, 10)
            seconds = parseInt(duration % 60, 10)

            if (minutes < 10) {
                minutes = "0" + minutes
            } else {
                minutes = minutes
            }
            
            if(seconds < 10) {
                seconds = "0" + seconds
            } else {
                seconds = seconds
            }
            
            display.innerHTML = minutes + ":" + seconds
            
            if (--duration < 0) {
                clearInterval(interval)
                alert(message)
            }
        }, 1000)
    },

    restartTimer(){
        window.location.reload()
    },
 
    startTimer(){
        display = document.getElementById('timer')
        message = '⏰Hora de descansar !!'
        Timer.pomodoro(1500,display,message)
        // 1500 = 25 minutes
        DOM.timerControls()
    }

}

const App = {
    init(){
        for (let task of Tasks.all){
            DOM.addTask(task)
        }
        Storage.set(Tasks.all)
    },
    
    reload(){
        DOM.clearTasks()
        App.init()
    }
}

App.init()