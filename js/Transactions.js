function ClearTransactions() {
	var transactionsDiv = document.getElementById("additionalDetailsDiv")
	transactionsDiv.innerHTML = "";
}

function LoadTransactions() {
	ClearChart();
	HideChart();
	
	var transactionsDiv = document.getElementById("additionalDetailsDiv")
	
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
		if (!isNaN(moneySpent) &&
		    moneySpent != 0){
				moneyNode.innerHTML = "Spent: $" + moneySpent.toFixed(2);
		}else {
				moneyNode.innerHTML = "Made $: " + moneyMade.toFixed(2);
		}
		
		parentDiv.appendChild(moneyNode);
		
		var accountBalanceNode = document.createElement("P");
		accountBalanceNode.innerHTML = "Account Balance: $" + accountBalance.toFixed(2);
		parentDiv.appendChild(accountBalanceNode);
		
		var categories = document.createElement("P");
		accountBalanceNode.innerHTML = "Category:";
		parentDiv.appendChild(categories);
	
		var categoriesSelect = CreateSelectDropDown(transactions[i]);
		categoriesSelect.setAttribute("data-index", i);
		categoriesSelect.onchange = function(){
			var transactionsIndexString	= this.getAttribute("data-index");
			var transactionsIndex = parseInt(transactionsIndexString);
			transactions[transactionsIndex].Category = this.value; 
		}
		
		parentDiv.appendChild(categoriesSelect);
	
		transactionsDiv.appendChild(parentDiv);
	}
}

function CreateSelectDropDown(transaction){
	//Create array of options to be added
	var array = ["Unknown", "Income", "Other - Necessary","Other - Unnecessary", "Banking Fees","Mortgage","Bills","Groceries","Eating Out", "Entertainment", "Savings"];

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
	
	var arrayIndex = array.indexOf(transaction.Category);
	if (arrayIndex != -1){
		selectList.selectedIndex = arrayIndex;
	}
	else {
		selectList.selectedIndex = 0;
	}
	
	return selectList;
}

function DisplayLocallySavedTransactions(){

	var bodyDiv = document.getElementById("SelectedSavedTransactionsDialogBodyDiv")
	bodyDiv.innerHTML = "";

	for(var i in localStorage){
		var containerDir = document.createElement("DIV");
		containerDir.style.paddingTop = "30px;"
		
		var titleElement = document.createElement("H3");
		titleElement.innerHTML = i;
		titleElement.style.color = "white";
		titleElement.style.paddingLeft = "10px";
		
		containerDir.appendChild(titleElement);
		
		var loadFromStorageButton = document.createElement("BUTTON");
		loadFromStorageButton.innerHTML = "Load"
		loadFromStorageButton.className = "btn btn-1 btn-1a";
		loadFromStorageButton.name = i;
		
		loadFromStorageButton.onclick = function(){
			transactions = JSON.parse(localStorage.getItem(this.name));
			
			var firstCloseButton = document.getElementById("SelectedSavedTransactionsDialogCloseButton")
			firstCloseButton.click();
			
			var secondCloseButton = document.getElementById("CloseLoadDataDialogButton");
			secondCloseButton.click();
			
			BuildLineChart();
		}
		
		containerDir.appendChild(loadFromStorageButton);
		
		var deleteFromStorageButton = document.createElement("BUTTON");
		deleteFromStorageButton.innerHTML = "Delete"
		deleteFromStorageButton.className = "btn btn-1 btn-1a";
		deleteFromStorageButton.name = i;
		
		deleteFromStorageButton.onclick = function(){
			localStorage.removeItem(this.name);
			DisplayLocallySavedTransactions();
		}
		
		containerDir.appendChild(deleteFromStorageButton);
		
		bodyDiv.appendChild(containerDir);
	}
}