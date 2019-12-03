const MAIN_CANVAS_SIZE = 400;
const CANVAS_SIZE= 28;
const PIXEL_SIZE = 10;

let numCanvas;

let network;

function setup() {
	createCanvas(MAIN_CANVAS_SIZE, MAIN_CANVAS_SIZE);
	background(127);
	numCanvas = new NumCanvas(CANVAS_SIZE, PIXEL_SIZE);

	// load model in js script
	(async () => {
		network = await tf.loadLayersModel(
			'https://angelomarcelino.github.io/IAA/terceiraUnd/numberGuessr/model/numberGuessr.json',
			'https://angelomarcelino.github.io/IAA/terceiraUnd/numberGuessr/model/numberGuessr.weights.bin'
		);
	})();	
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

		let target = document.getElementById("result");
		target.innerText = '';
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

	// Predicting
	if (keyCode == 80){ // LETRA P
		const x = tf.tensor2d([numCanvas.flatenedPixels()]);
		x.print();
		let prediction = network.predict(x);
		prediction.array().then((stuff) => { 
			predArray = stuff;
			console.log(predArray);
			let guess = indexOfMax(predArray[0]);
			console.log(guess);

			let target = document.getElementById("result");
			target.innerText = `I think you drew a ${guess}`;
		});
	}
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    let max = arr[0];
    let maxIndex = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}