const options = document.getElementsByClassName('vote-options')[0];

function createInput(key) {
	const label = document.createElement('label');
	const input = document.createElement('input');
	const div = document.createElement('div');
	div.classList.add('card', 'card-block', 'option', 'text-center');
	div.addEventListener('click', handleClick);
	input.classList.add('vote-option', 'radio');
	input.setAttribute('type', 'radio');
	input.setAttribute('name', 'vote');
	input.setAttribute('value', key);
	input.style.display = 'none';
	label.innerHTML = key;
	div.appendChild(label);
	options.appendChild(div);
	label.insertBefore(input, label.firstChild);
}

chartOptions.forEach(option => {
	const key = Object.keys(option)[0];
	const optName = option[key][0];
	createInput(optName);
});

function handleClick(e) {
	const input = this.firstChild.firstChild; // parentdiv.label.input
	const optionDivs = Array.from(document.getElementsByClassName('option'));
	optionDivs.forEach(div => {
		div.classList.remove('checked');
	});
	this.classList.toggle('checked');
	input.checked = 'true';
}
