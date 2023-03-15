const Timer = {
    endTimerModal: document.querySelector('.modal-overlay'),
    notificationAudio: document.getElementById('notification'),
    mainContainer: document.querySelector('.focus-main-container'),
    controlsContainer: document.querySelector('.controls'),
    timerDisplay: document.querySelector('.timer'),
    timerInterval: null,
    timerDuration: 25 * 60,
    timerRemaining: null,

    start() {
        this.showTimersControls()
        this.pomodoro()
    },

    showTimersControls() {
        const controlsHtml = DOM.timerControlsHtml()
        this.controlsContainer.innerHTML = controlsHtml
    },

    pomodoro() {
        const oneSecond = 1000
        this.timerInterval = setInterval(() => {
            this.updateTimer()
        }, oneSecond)
    },

    updateTimer() {
        let minutes = Math.floor(this.timerDuration / 60);
        let seconds = this.timerDuration % 60;

        if (minutes < 10) {
            minutes = "0" + minutes
        } 
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        this.timerDisplay.textContent = `${minutes}:${seconds}`
        this.checkTimeEnd()
    },

    checkTimeEnd() {
        if (this.timerDuration == 0) {
            this.finish()
        } else {
            this.timerDuration = this.timerDuration - 1
        }
    },

    finish() {
        clearInterval(this.timerInterval)
        this.modalToogle()
        this.notificationAudio.play()
    },

    restart() {
        window.location.reload()
    },

    pause() {
        clearInterval(this.timerInterval);
        this.timeRemaining = this.timerDuration
        const playButtonHtml = DOM.timerPlayButtonHtml()
        this.controlsContainer.innerHTML = playButtonHtml
    },

    resume() {
        this.timerDuration = this.timeRemaining;
        this.start()
    },

    modalToogle() {
        this.endTimerModal.classList.toggle('active')
    }
}