class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

	reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }
	
	print() {
        this.display.innerText = this.format(this.times);
}

//Zgubienie kontekstu z function pad0 ??? dodanie this.pad0
	format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
}

	pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}


	start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
    }
}

	stop() {
    this.running = false;
    clearInterval(this.watch);
}

	step() {
    if (!this.running) return;
		this.calculate();
		this.print();
}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
		this.times.seconds += 1;
		this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
    }
}
	
	
	
	
	}



const stopwatch = new Stopwatch(
document.querySelector('.stopwatch'));

//Nasłuchiwacze
var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());