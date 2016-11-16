//util
// author shimada
var util = util || {};
util.toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
};

//Get document height (cross-browser)
// author shimada
util.getDocHeight = function() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
};


// aouthor shimada
function csv2Array(filePath) {
	var csvData = [];
	var data = new XMLHttpRequest();
	data.open("GET", filePath, false);
	data.send(null);

	var LF = String.fromCharCode(10);
	var lines = data.responseText.split(LF);
	for (var i = 0; i < lines.length;++i) {
		var cells = lines[i].split(",");
		if( cells.length != 1 ) {
			csvData.push(cells);
		}
	}
	return csvData;
}

// aouthor shimada
function createPath(str){
    var path = '/';
    path.add('aaa');
    console.log(path);
    var temp ;
    for (var i = 1; i < 4; i++){
      for(var j = 1; j < 4; j++){
        if(i === 1){
          // path.appendChild(str[1][j]);
        }
      }
    }
    return path;
}

console.log(createPath(csv2Array("./public/models/csv/osaka.csv")));
