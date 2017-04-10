const labels = [];
const values = [];

// chartOptions is passed down from server to pug template to this file
chartOptions.forEach(option => {
	const key = Object.keys(option)[0];
	const optName = option[key][0];
	const value = option[key][1];
	labels.push(optName);
	values.push(value);
});

const data = {
	labels: [...labels],
	datasets: [{
		label: '# of Votes',
		data: [...values],
		backgroundColor: [
			'rgba(255, 99, 132, 1)',
			'rgba(54, 162, 235, 1)',
			'rgba(255, 206, 86, 1)',
			'rgba(75, 192, 192, 1)',
			'rgba(153, 102, 255, 1)',
			'rgba(255, 159, 64, 1)'
		]
	}]
};

const options = {
	responsive: false,
	maintainAspectRatio: false
};

const ctx = document.getElementById('myChart').getContext('2d');
document.getElementById('chartHeader').innerHTML = title;
const myNewChart = new Chart(ctx, {type: 'doughnut', data, options});