
  function handleFileSelect(evt) {
	var files = evt.target.files; // FileList object

	// Loop through the FileList and render image files as thumbnails.
	for (var i = 0, f; f = files[i]; i++) {

	  // Only process text files.
	  if (!f.type.match('text.*')) {
		continue;
	  }

	  var reader = new FileReader();

	  // Closure to capture the file information.
	  reader.onload = (function(theFile) {
		return function(e) {
			console.log(e.target.result);
			addMany(e.target.result);

		};
	  })(f);

	  // Read in the text fiel as text
	  reader.readAsText(f);
	}
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);
