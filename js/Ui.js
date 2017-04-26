jQuery(document).ready(function($){
// standard on load code goes here with $ prefix
// note: the $ is setup inside the anonymous function of the ready command
	var $ = jQuery.noConflict();
	$("#myModal").on("hidden.bs.modal", function () {
		document.getElementById("body").click();
	});
});

function DisableSaving(){
	var saveButton = document.getElementById("SaveDataButton"); 
	saveButton.disabled = true;
}

function OpenFileSelectionDialog(){
	var inputFileButton = document.getElementById("fileSelectButton"); 
	inputFileButton.click();
}

function CheckFileAPISupport() {
	// Check for the various File API support.
	if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
	  alert('The File APIs are not fully supported in this browser.');
	}
}

function LoadCvs(fileInput) {
	var closeLoadDataDialogButton = document.getElementById("CloseLoadDataDialogButton");
	closeLoadDataDialogButton.click();
	
    var files = fileInput.files; // FileList object
	var file = files[0];

    // Loop through the FileList and render image files as thumbnails.
	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = function(e) {
		csvContent = e.target.result;
		
		var result = Papa.parse(csvContent);
		transactions = [];
		
		for (var i = 0; i < result.data.length; i++){
			var spent = parseFloat(result.data[i][2]);
			var made = parseFloat(result.data[i][3]);
			var accountBalance = parseFloat(result.data[i][4]);
			if (isNaN(spent)){
				spent = 0;
			}
			
			if (isNaN(made)){
				made = 0;
			}
			
			if (isNaN(accountBalance)){
				accountBalance = 0;
			}
			
			transactions[i] = new Transaction(i, result.data[i][0], result.data[i][1], spent, made, accountBalance, "Unknown"); 
		}
		
		BuildLineChart();
	};

	// Read in the image file as a data URL.
	reader.readAsText(file);
}