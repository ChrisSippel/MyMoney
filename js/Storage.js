function CheckForLocalStorage(){
	if (typeof(Storage) === "undefined") {
		alert("Local Storage isn't available. Saving is disabled.");
	}
}

function SaveToStorage() {
	var storageName = document.getElementById("StorageNameInput");
	var myName = storageName.value;
	
	var transactionsJson = JSON.stringify(transactions);
	localStorage.setItem(myName, transactionsJson);
}