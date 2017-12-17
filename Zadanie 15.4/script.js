class Stopwatch extends React.Component {
    

	constructor() {
		
		super();
		
		this.state = {
        running: false,
        times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
    };
	
	
	//kontekst
	this.reset = this.reset.bind(this);
    this.print = this.print.bind(this);
    this.format = this.format.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.step = this.step.bind(this);
    this.calculate = this.calculate.bind(this);
	this.pad0 = this.pad0.bind(this);
	
	}
	
	
	

	reset() {
		this.stop();
        this.state = {
		times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
    };
	this.print();
}
	
	
	
	print() {
        this.display.innerText = this.format(this.times);
}

//Zgubienie kontekstu z function pad0 ??? dodanie this.pad0
	format(times) {
        return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
}


	start() {
    if (!this.state.running) {
        this.state.running = true;
        this.watch = setInterval(() => this.step(), 10);
    }
}

	stop() {
    this.state.running = false;
    clearInterval(this.watch);
}

	step() {
    if (!this.state.running) return;
		this.calculate();
		this.print();
}

	calculate() {
		this.state.times.miliseconds += 1;
	if (this.state.times.miliseconds >= 100) {
		this.state.times.seconds += 1;
		this.state.times.miliseconds = 0;
		}
	if (this.state.times.seconds >= 60) {
        this.state.times.minutes += 1;
        this.state.times.seconds = 0;
    }
}

	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}
	
	render() {
		return (
			 <div className={'app'}>
				<button className={'start'} onClick={this.start}>Start</button>
				<button className={'stop'} onClick={this.stop}>Stop</button>
			<div className={'stopwatch'}>{ this.format(this.state.times) }</div>
			</div>
		);
	}
}



/*const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

//Nasłuchiwacze
var startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());*/


ReactDOM.render(<Stopwatch/>, document.getElementById('app'));