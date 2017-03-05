function Transaction(id, dateTime, description, spent, made, accountBalance, category){
	this.Id = id;
	this.DateTime = dateTime;
	this.Description = description;
	this.Spent = parseFloat(spent);
	this.Made = parseFloat(made);
	this.AccountBalance = parseFloat(accountBalance);
	this.Category = category;
}