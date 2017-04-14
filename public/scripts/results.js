const results = document.getElementById('results');
const { name, options } = chart;

function initializeTable() {
	const thead = document.createElement('thead');
	const tr = document.createElement('tr');
	const thOption = document.createElement('th');
	const thVotes = document.createElement('th');
	thOption.innerHTML = 'Options';
	thVotes.innerHTML = '# of votes';
	tr.appendChild(thOption);
	tr.appendChild(thVotes);
	thead.appendChild(tr);
	results.appendChild(thead);
	appendToTable();
}

function appendToTable() {
	const tbody = document.createElement('tbody');
	options.forEach(option => {
		const key = Object.keys(option)[0];
		const optName = option[key][0];
		const optValue = option[key][1];
		const tr = document.createElement('tr');
		const tdOption = document.createElement('td');
		const tdVotes = document.createElement('td');
		tdOption.innerHTML = optName;
		tdVotes.innerHTML = optValue;
		tr.appendChild(tdOption);
		tr.appendChild(tdVotes);
		tbody.appendChild(tr);
	});
	results.appendChild(tbody);
}

initializeTable();