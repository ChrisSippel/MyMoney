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
	
	var labels = {};
	var categoriesCount = 0;
	for(var i = 0; i < transactions.length; i++){
		if (labels[transactions[i].Category] == undefined){
			if (transactions[i].Spent != 0){
				labels[transactions[i].Category] = parseInt(transactions[i].Spent);
			}
			else{
				labels[transactions[i].Category] = parseInt(transactions[i].Made);
			}
			
			categoriesCount++;
			
			continue;
		}
		
		if (transactions[i].Spent != 0){		
			labels[transactions[i].Category] += parseInt(transactions[i].Spent);
		}
		else{
			labels[transactions[i].Category] += parseInt(transactions[i].Made);
		}
	}
	
	var colours = [];
	for (var i = 0; i < categoriesCount; i++){
		colours.push(getRandomColor());
	}
	
	var values = [];
	for (var value in labels){
		values.push(labels[value]);
	}
		
	ClearTransactions();
	ClearMonthlyOutcome();
		
	var ctx1 = document.getElementById("chart");
	ctx1.setAttribute('hidden', 'false');
	
	ClearChart();
	
	var data = {
    labels: Object.keys(labels),
    datasets: [
        {
            data: values,
            backgroundColor: colours,
            hoverBackgroundColor: colours,
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

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
	ClearMonthlyOutcome();
		
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
	
	ClearMonthlyOutcome();
	CalculateMonthlyOutcome();
}

function ClearMonthlyOutcome() {
	var averagesDiv = document.getElementById("additionalDetailsDiv")
	averagesDiv.innerHTML = "";
}

function CalculateMonthlyOutcome(){
	var spent = 0;
	var made = 0;
	
	for (var i = 0; i < transactions.length; i++) {
		spent += transactions[i].Spent;
		made += transactions[i].Made;
	}
	
	var additionalDetails = document.getElementById("additionalDetailsDiv")

	var madeElement = document.createElement("H3");
	madeElement.innerHTML = "Made: $" + made.toFixed(2);
	additionalDetails.appendChild(madeElement);
	
	var spentElement = document.createElement("H3");
	spentElement.innerHTML = "Spent: $" + spent.toFixed(2);
	additionalDetails.appendChild(spentElement);
	
	var endResult = document.createElement("H3");
	endResult.innerHTML = "End Result: $" + (made - spent).toFixed(2);
	additionalDetails.appendChild(endResult);
}