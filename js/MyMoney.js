var csvContent;
var chart;

function CreateDB() {
	var db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
	db.transaction(function (tx) {
		tx.executeSql('DROP TABLE transactions;');
		tx.executeSql('IF NOT EXISTS CREATE TABLE transactions (id int primary key, dateTime DateTime, Description TEXT, Category TEXT, Cost REAL, \'Account Balance\' REAL)');
	});
}