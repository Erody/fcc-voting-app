const addOption = document.getElementById('addFormOption');
const options = document.getElementsByClassName('chart-options')[0];

function createInput() {
	const node = document.createElement('input');
	node.classList.add('chart-option');
	node.addEventListener('blur', function() {
		this.setAttribute('readonly', 'readonly');
	});
	node.addEventListener('click', function() {
		this.removeAttribute('readonly');
		this.focus();
	});
	node.addEventListener('keyup', function() {
		this.setAttribute('name', this.value)
	});
	options.appendChild(node);
}

addOption.addEventListener('click', function() {
	createInput();
	console.log('add option');
	console.log(options);
	console.log(this);
});