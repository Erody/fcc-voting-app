const polls = document.getElementById('poll-list');

chartArray.forEach(chart => {
	const { name, options, urlId } = chart;
	const div = document.createElement('div');
	const buttons = document.createElement('div');
	const anchor = document.createElement('a');
	const deleteButton = document.createElement('a');
	const resultButton = document.createElement('a');
	const block = document.createElement('div');
	buttons.classList.add('flex-center-row', 'flex-center-column-item-right');
	block.classList.add('card-block', 'flex-center-column');
	resultButton.classList.add('btn', 'btn-primary');
	resultButton.innerHTML = 'Results';
	resultButton.setAttribute('href', `/polls/${urlId}/results`);
	deleteButton.classList.add('btn', 'btn-primary');
	deleteButton.innerHTML = 'Delete';
	deleteButton.setAttribute('href', `/polls/${urlId}/delete`);
	anchor.innerHTML = name;
	anchor.setAttribute('href', `/polls/${urlId}`);
	anchor.classList.add('h3');
	div.classList.add('card');
	block.appendChild(anchor);
	if(owner){
		buttons.appendChild(resultButton);
		buttons.appendChild(deleteButton);
		block.appendChild(buttons);
	}
	div.appendChild(block);
	polls.appendChild(div);
});
