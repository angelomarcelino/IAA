const MAIN_CANVAS_SIZE = 400;
const CANVAS_SIZE= 28;
const PIXEL_SIZE = 10;

let numCanvas;

let network;
let trainingData;
let targets = [];

// Training variables
let drawnNumber = 0;
let numberSize = 0; // How many numbers there are. Max = trainingSize
let trainingSize = 10; 

function preload() {
	trainingData = loadJSON('trainingData/xizis.json', Array);
}

function setup() {
	createCanvas(MAIN_CANVAS_SIZE, MAIN_CANVAS_SIZE);
	background(127);
	numCanvas = new NumCanvas(CANVAS_SIZE, PIXEL_SIZE);

	// Setting up Training Data
	for(let i = 0; i < 100; i++){
		let ys = trainingData.data[i].ys;
		for(let j = 0; j < 10; j++){
			if (ys[j]){
				let label = {'label':'0'};
				label.label = j.toString();
				targets[i] = label;
			} 
		}
	}

	let options = {
		inputs: 784,
		outputs: ['label'], // 10 labels from '0' to '9'
		task: 'classification',
		debug: true,
		batchSize: 128
	}
	network = ml5.neuralNetwork(options);

	// Adding data
	for(let i = 0; i < 100; i++){
		network.addData(trainingData.data[i].xs, targets[i]);
	}
		
}

function draw() {
	background(127);
	numCanvas.draw();
	
	if (mouseIsPressed){
		if (mouseX >= numCanvas.offset && mouseY >= numCanvas.offset){
			if (mouseX <=  width - numCanvas.offset && mouseY <= height - numCanvas.offset)
			numCanvas.paintNearest(mouseX, mouseY);
		}
	}

}

function keyPressed(){

	if (keyCode == BACKSPACE){
		numCanvas.clearCanvas();
	}

	// Building our dataset
	/* const MAX_NUM = 3;
	if (keyCode ==  32){ // Space for next number
		if (drawnNumber < MAX_NUM) {
			let input = [];
			let target = {
				'label': '0'
			}
			
			networnetwork.addData(trainingData.data[0].xs, '0')k.addData(trainingData.data[0].xs, '0')
			for (let i = 0; i < numCanvas.flatenedPixels.length; i++){
				input[i] = numCanvas.flatenedPixels[i].value;
			}

			target.label = drawnNumber.toString();
			
			// Which number am I on?
			numberSize++;
			if (numberSize >= trainingSize){
				drawnNumber++;
				numberSize = 0;
				console.log(drawnNumber);
			} else {
				network.addData(input, target);
				console.log('Data added '+target.label);
			}
		}
		if (drawnNumber >= MAX_NUM) {
			console.log('FINISHED!');
		}
		numCanvas.clearCanvas();
	} */

	// Training our model (data already normalized)
	if (keyCode == 84){
		network.normalizeData();
		console.log('training started!');
		let options = {
			epochs: 1000
		}
		network.train(options, whileTraining, doneTraining);
	}

}

// Callback funcs
function whileTraining(epoch, loss){
	console.log(`epoch: ${epoch}, loss:${loss}`);
}

function doneTraining(){
	console.log('done!');
}

