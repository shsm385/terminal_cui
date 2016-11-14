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
function getCSV() {
    var req = new XMLHttpRequest();
    req.open("get", "./public/models/csv/osaka.csv", true);
    req.send(null);
    req.onload = function() {
        convertCSVtoArray(req.responseText);
    };
}

// aouthor shimada
function convertCSVtoArray(str) {
    var result = [];
    var tmp = str.split("\n");
    for (var i = 0; i < tmp.length; ++i) {
        result[i] = tmp[i].split(',');
    }
    console.log(result);
}
