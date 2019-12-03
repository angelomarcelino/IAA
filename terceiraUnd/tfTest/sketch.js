const learningRate = 0.01;
const epochs = 100;
const hiddenLayers = 5;
let biggestUnit = 1024;
const inputShape = 784;
const outputUnits = 10;

// Load Training Data
let trainingData;	
function preload() {
	trainingData = loadJSON('trainingData/xizis.json', Array);
}

// Create Network 
const network = tf.sequential(); 

// Create Layers
const firstLayer = tf.layers.dense({
	units: biggestUnit,
	inputShape: [inputShape], // The inputs will affect this entry
	activation: 'relu',
	name: "firstLayer"
});

// Adding first layer
network.add(firstLayer);
biggestUnit = Math.round(biggestUnit/2)

for (let i = 0; i < hiddenLayers - 1; i++){
	
	const hidden = tf.layers.dense({
		units: biggestUnit,
		activation: 'relu',
		name: 'layer'+(i+2),
	});
	biggestUnit = Math.round(biggestUnit/2);
	
	// Adding layers
	network.add(hidden);
}

const output = tf.layers.dense({
	units: outputUnits,
	activation: 'tanh',
	name: 'outputLayer'
});

// Adding output
network.add(output);

// Compile network
network.compile({
	optimizer: tf.train.sgd(learningRate), // Stocastic Gradient Descent
	loss: tf.losses.meanSquaredError
});


// Prediction
let prediction;
let predArray;
let xs, ys;

function setup(){
	// Setting up training data 
	let xtd = [];
	let ytd = [];
	for (let i = 0; i < 100; i++){
		xtd[i] = trainingData.data[i].xs;
		ytd[i] = trainingData.data[i].ys;
	}
	xs = tf.tensor2d(xtd);
	ys = tf.tensor2d(ytd);

	
	// // Training
	// train(epochs, xs, ys).then(() => {
	// 	console.log('training complete! network saved!');
		
	// 	// Prediction Test
	// 	prediction = network.predict(xs);
	// 	prediction.array().then((stuff) => { 
	// 		predArray = stuff;
	// 		console.log(predArray);
	// 		let ret = [];
	// 		for (let i=0; i < 100; i++){
	// 			ret[i] = indexOfMax(predArray[i]);
	// 		}
	// 		console.log(ret);
	// 	});

	// });
	
}

function draw(){

}

async function train(epochs, xs, ys) {
	for (let i=0; i < epochs; i++){
		const response = await network.fit(xs, ys, {
			shuffle: true,
			epochs: 50,
		});
		console.log(response.history.loss[0]);	
	}
	
	// Saving the network
	//const save = await network.save('downloads://numberGuessr');	
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