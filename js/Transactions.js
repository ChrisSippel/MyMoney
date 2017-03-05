function ClearTransactions() {
	var transactionsDiv = document.getElementById("transactionsDiv")
	transactionsDiv.innerHTML = "";
}

function LoadTransactions() {
	ClearChart();
	HideChart();
	
	for(var i = 0; i < transactions.length; i++)
	{	
		var chartLabel = transactions[i].DateTime;
		var description = transactions[i].Description;
		var moneySpent = transactions[i].Spent;
		var moneyMade = transactions[i].Made;
		var accountBalance = transactions[i].AccountBalance;

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
	var array = ["Unknown", "Etc.", "Banking Fees","Mortgage","Bills","Groceries","Eating Out", "Games"];

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