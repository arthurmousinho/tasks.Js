const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("tasks.js:task")) || []
    },

    set(task){
        localStorage.setItem("tasks.js:task", JSON.stringify(task))
    }
}