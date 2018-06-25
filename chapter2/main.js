var maxTime= 1000;
const worker = require('worker-thread');

var eventDoubler = function(v, callback) {
	var waitTime = Math.floor(Math.random()*(maxTime+1));
	if (v%2) {
		setTimeout(function(){
			console.log("Worker thread in set time out odd " + worker.threadId);
			callback(new Error("Odd input"));
		}, waitTime);
	}
	else {
		setTimeout(function(){
			console.log("Worker thread in set time out even " + worker.threadId);
			callback(null, v*2,waitTime);
		}, waitTime );
	};
}

var handleResults = function(err, results, time){
	console.log("Worker thread in handleResults " + worker.threadId);
	if(err){
		console.log("Error: " + err.message);
	}
	else {
		console.log("The results are: " + results + " (" + time + " ms)");
	}

}

eventDoubler(2, handleResults);
eventDoubler(3, handleResults);
eventDoubler(10, handleResults);