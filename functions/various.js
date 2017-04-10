exports.randomNumberString = function(length) {
	const result = [];
	for(let i = 0; i < length; i++) {
		const random = getRandomArbitrary(0, 9);
		result.push(Math.round(random));
	}
	return result.join('');
};

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}