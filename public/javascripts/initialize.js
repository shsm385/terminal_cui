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
function createPath(str) {
    var dir = {
        root: {
            name: '/',
            osaka: {
                name: "大阪",
            }
        }
    };
    var temp = {};
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j < 4; j++) {
            if (j == 3) {
                dir.root.osaka[str[i][j - 1]] = temp;
                dir.root.osaka[str[i][j - 1]][str[i][j]] = {};
                dir.root.osaka[str[i][j - 1]][str[i][j]].name = str[i][j];
            }
        }
    }
    return dir;
}

// aouthor shimada
function csv2Array(filePath) {
    var csvData = [];
    var data = new XMLHttpRequest();
    data.open("GET", filePath, false);
    data.send(null);

    var LF = String.fromCharCode(10);
    var lines = data.responseText.split(LF);
    for (var i = 0; i < lines.length; ++i) {
        var cells = lines[i].split(",");
        if (cells.length != 1) {
            csvData.push(cells);
        }
    }
    return csvData;
}
