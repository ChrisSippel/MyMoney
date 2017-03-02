jQuery(document).ready(function($){
// standard on load code goes here with $ prefix
// note: the $ is setup inside the anonymous function of the ready command
	var $ = jQuery.noConflict();
	$("#myModal").on("hidden.bs.modal", function () {
		document.getElementById("body").click();
	});
});

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
    var files = fileInput.files; // FileList object
	var file = files[0];

    // Loop through the FileList and render image files as thumbnails.
	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = function(e) {
		csvContent = e.target.result;		
		BuildLineChart();
	};

	// Read in the image file as a data URL.
	reader.readAsText(file);
}