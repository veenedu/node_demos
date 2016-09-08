console.log('Start')
process.nextTick(function(){
	console.log('Log from outer tick1');
	console.log('Another from outer tick1');
		process.nextTick(function(){
			console.log('Log from  inner tick1_i')
		})
})
console.log('Scheduled')
console.log('End')


process.nextTick(function(){
	console.log('Log from outer tick2');
	console.log('Another from outer tick2');
		process.nextTick(function(){
			console.log('Log from  inner tick2_i')
		})
})