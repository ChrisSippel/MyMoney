function ClearChart(){
	if (chart != null &&
		chart.chart.canvas != null){
		chart.clear();
		chart.destroy();
	}
}

function HideChart(){
	var myChart = document.getElementById("chart");
	myChart.setAttribute('hidden', 'true');
}

function BuildPieChart(){
	var moneySpent = 0;
	var moneyMade = 0;

	for (var i = 0; i < transactions.length; i++) {
		moneySpent += transactions[i].Spent;
		moneyMade += transactions[i].Made;
	}
	
	moneyMade = moneyMade.toFixed(2);
	moneySpent = moneySpent.toFixed(2);
		
	ClearTransactions();
		
	var ctx1 = document.getElementById("chart");
	ctx1.setAttribute('hidden', 'false');
	
	ClearChart();
	
	var data = {
    labels: [
        "Made",
        "Spent"
    ],
    datasets: [
        {
            data: [moneyMade, moneySpent],
            backgroundColor: [
                "green",
                "red"
            ],
            hoverBackgroundColor: [
                "green",
                "red"
            ]
        }]
	};
	
	// For a pie chart
	chart = new Chart(ctx1,{
		type: 'pie',
		data: data,
		options: {
			responsive: true,
			maintainAspectRatio: false
		}
	});
}

function BuildLineChart() {
	var chartLabels = [];
	var moneySpent = [];
	var moneyMade = [];
	var accountBalance = [];
	var descriptions = [];

	for (var i = 0; i < transactions.length; i++) {
		chartLabels[i] = transactions[i].DateTime;
		descriptions[i] = transactions[i].Description;
		moneySpent[i] = transactions[i].Spent;
		moneyMade[i] = transactions[i].Made;
		accountBalance[i] = transactions[i].AccountBalance;
	}
	
	ClearTransactions();
		
	var ctx = document.getElementById("chart");
	ctx.setAttribute('hidden', 'false');
	
	ClearChart();
	
	chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: chartLabels,
			datasets: [{
				label: 'Spent',
				data: moneySpent,
				backgroundColor: "rgba(224, 0, 0, 0.3)",
				borderColor: "rgba(224, 0, 0, 0.3)",
				borderWidth: 1
			},
			{
				label: 'Made',
				data: moneyMade,
				backgroundColor: "rgba(0, 224, 7, 0.3)",
				borderColor: "rgba(0, 224, 7, 0.3)",
				borderWidth: 1
			},
			{
				label: 'Account Balance',
				data: accountBalance,
				backgroundColor: "rgba(0, 153, 224, 0.3)",
				borderColor: "rgba(0, 153, 224, 0.3)",
				borderWidth: 1
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems, data) { 
							var toolTipText;
							switch(tooltipItems.datasetIndex)
							{
								case 0:
									toolTipText = descriptions[tooltipItems.index] + ' $' + moneySpent[tooltipItems.index];
									break;
								case 1:
									toolTipText = descriptions[tooltipItems.index] + ' $' + moneyMade[tooltipItems.index];
									break;
								case 2:
									toolTipText = 'Account Balance $' + accountBalance[tooltipItems.index];
									break;
							}
							
							return toolTipText;
					}
				}
			}
		}
	});
}