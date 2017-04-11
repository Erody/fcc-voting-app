const polls = document.getElementById('poll-list');

chartArray.forEach(chart => {
	const { name, options, urlId } = chart;
	const li = document.createElement('li');
	const anchor = document.createElement('a');
	const deleteButton = document.createElement('a');
	deleteButton.classList.add('btn', 'btn-primary');
	deleteButton.innerHTML = 'Delete';
	deleteButton.setAttribute('href', `/polls/${urlId}/delete`);
	anchor.innerHTML = name;
	anchor.setAttribute('href', `/polls/${urlId}`);
	li.appendChild(anchor);
	li.appendChild(deleteButton);
	polls.appendChild(li);
});
