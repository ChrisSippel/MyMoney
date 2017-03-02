function ClearTransactions() {
	var transactionsDiv = document.getElementById("transactionsDiv")
	transactionsDiv.innerHTML = "";
}

function LoadTransactions() {
	ClearChart();
	HideChart();
	
	var csvObjects = Papa.parse(csvContent).data;
	for(var i = 0; i < csvObjects.length; i++)
	{	
		var chartLabel = csvObjects[i][0];
		var description = csvObjects[i][1];
		var moneySpent = parseFloat(csvObjects[i][2]);
		var moneyMade = parseFloat(csvObjects[i][3]);
		var accountBalance = parseFloat(csvObjects[i][4]);

		var parentDiv = document.createElement("DIV");
		parentDiv.className = "transactionDiv";

		var titleNode = document.createElement("H3");
		titleNode.innerHTML = chartLabel;
		parentDiv.appendChild(titleNode);
		
		var descriptionNode = document.createElement("P");
		descriptionNode.innerHTML = "Description: " + description;
		parentDiv.appendChild(descriptionNode);
		
		var moneyNode = document.createElement("P");
		if (!isNaN(moneySpent)) {
				moneyNode.innerHTML = "Spent: $" + moneySpent.toFixed(2);
		}else {
				moneyNode.innerHTML = "Made $: " + moneyMade.toFixed(2);
		}
		
		parentDiv.appendChild(moneyNode);
		
		var accountBalanceNode = document.createElement("P");
		accountBalanceNode.innerHTML = "Account Balance: $" + accountBalance.toFixed(2);
		parentDiv.appendChild(accountBalanceNode);
		
		var categoriesP = document.createElement("P");
		accountBalanceNode.innerHTML = "Category:";
		parentDiv.appendChild(categoriesP);
	
		var categoriesSelect = CreateSelectDropDown();
		parentDiv.appendChild(categoriesSelect);
	
		transactionsDiv.appendChild(parentDiv);
	}
}

function CreateSelectDropDown(){
	//Create array of options to be added
	var array = ["Etc.", "Banking Fees","Mortgage","Bills","Groceries","Eating Out", "Games"];

	//Create and append select list
	var selectList = document.createElement("select");
	selectList.id = "mySelect";

	//Create and append the options
	for (var i = 0; i < array.length; i++) {
		var option = document.createElement("option");
		option.value = array[i];
		option.text = array[i];
		selectList.appendChild(option);
	}
	
	return selectList;
}