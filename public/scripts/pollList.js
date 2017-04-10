const polls = document.getElementById('poll-list');

chartArray.forEach(chart => {
	const { name, options, urlId } = chart;
	const li = document.createElement('li');
	const anchor = document.createElement('a');
	anchor.innerHTML = name;
	anchor.setAttribute('href', '/polls/' + urlId);
	li.appendChild(anchor);
	polls.appendChild(li);
});
