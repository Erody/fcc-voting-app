const options = document.getElementsByClassName('vote-options')[0];

function createInput(key) {
	const label = document.createElement('label');
	const node = document.createElement('input');
	node.classList.add('vote-option');
	node.classList.add('radio');
	node.setAttribute('type', 'radio');
	node.setAttribute('name', 'vote');
	node.setAttribute('value', key);
	label.innerHTML = key;
	options.appendChild(label);
	label.insertBefore(node, label.firstChild);
}

chartOptions.forEach(option => {
	const key = Object.keys(option)[0];
	const optName = option[key][0];
	createInput(optName);
});

console.log(chartOptions);