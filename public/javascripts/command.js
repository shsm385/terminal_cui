//author shimada
function pressEnterKey(node) {
    var line = node.parentNode.parentNode.cloneNode(true);
    line.removeAttribute('id');
    line.classList.add('line');
    var input = line.querySelector('input.cmdline');
    input.autofocus = false;
    input.readOnly = true;

    return line;
}

// author shimada
function clear(input, output_, interlace_) {
    output_.innerHTML = '';
    input.value = '';
    document.documentElement.style.height = '100%';
}

// author shimada, tominaga
function man(args_first, CMDS_) {
    switch (args_first) {
        case 'ls':
            return 'ls - list directory and store';
        case 'cd':
            return 'cd - change directory';
        case 'mv':
            return 'mv - mv -- move files';
        case 'rm':
            return 'rm - delete favorite';
        case 'cp':
            return 'cp - registration favorite';
        case 'clear':
            return 'clear - clear the terminal screen';
        case 'man':
            return 'man - format and display the on-line manual pages';
        case 'cat':
            return 'cat - display store information';
        case 'pwd':
            return 'pwd - return working directory name';
        case 'open':
            return 'open - open the shop information site';
        case 'exit':
            return 'exit - logout';
        case 'su':
            return 'su - switching and sign in user';
        case 'mu':
            return 'mu - sign up user account';
        case 'sl':
            return 'sl - runninng SL';
        case 'help':
        	return 'help - display how to use commands';
       	case 'history':
       		return 'history - display histories of typed commands';
   		case 'cal':
   			return 'cal - display a calendar';
		case 'sudo':
			return 'sudo - execute a command as a administrator';
        default:
            if (args_first === undefined) {
                return CMDS_.join('  ');
            } else {
                return 'What manual page do you want?';
            }
    }
}

// author shimada
// function runninng sl
function sl(output_, cmdLine_) {
    var inputLine_ = document.querySelector('#input-line');
    inputLine_.style.display = "none";
    output('<video id="sl" autoplay width="100%" height="100%"　poster="./public/figures/zakimot.jpg"><source src="./public/models/movies/sl.mp4" type="video/mp4" /></video>');
    var video = document.getElementById('sl');
    video.addEventListener('ended', function() {
        var node_sl = document.getElementById('sl');
        node_sl.parentNode.removeChild(node_sl);
        inputLine_.style.display = "";
        document.querySelector('#input-line .cmdline').focus();
    }, false);

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}

//author ito
// function of making user
function mu(args_first, output_) {
    var cmdLine_ = document.querySelector('#input-line');
    cmdLine_.style.display = "none";
    var uname = '<div id="uname"><div class="input-uname" style="display: inline;">user name:<div style="display: inline;"><input class="cmdline" style="display: inline;" /></div></div></div>';
    //var pass = '<div id="pass">pass:</div>';
    output_.insertAdjacentHTML("beforeEnd", uname);
    var uname_ = output_.querySelector('#uname');
    uname_.addEventListener("keydown", dosome, false);
    var inputName_ = uname_.querySelector('.cmdline');
    inputName_.focus();

    function dosome(e) {
        if (e.keyCode == 13) {
            var name = getValue(inputName_);
            if (name != "false") {
                var pass = '<div id="pass"><div class="input-uname" style="display: inline;">pass:<div style="display: inline;"><input class="cmdline" style="display: inline;" type="password" /></div></div></div>';
                output_.insertAdjacentHTML('beforeEnd', pass);
                inputName_.readOnly = true;
                inputName_.autofocus = false;
                //inputName_.diable = true;
                var pass_ = document.querySelector('#pass');
                pass_.addEventListener("keydown", dopass, false);
                var inputPass_ = pass_.querySelector('.cmdline');
                inputPass_.focus();
                uname_.removeAttribute('id');
                uname_.classList.add('line');
                //cmdLine_.style.display = "";
                //document.querySelector('#input-line .cmdline').focus();
                function dopass(e) {
                    if (e.keyCode == 13) {
                        var pwd = getValue(inputPass_);
                        if (pwd != "false") {
                            //output_.insertAdjacentHTML('beforeEnd', '<div>user name:'+name+', pass:'+pwd+'</div>');
                            registerUser(name, pwd);
                            inputPass_.readOnly = true;
                            inputPass_.autofocus = false;
                            cmdLine_.style.display = "";
                            pass_.removeAttribute('id');
                            pass_.classList.add('line');
                            document.querySelector('#input-line .cmdline').focus();
                        } else {
                            inputPass_.readOnly = true;
                            inputPass_.autofocus = false;
                            pass_.removeAttribute('id');
                            pass_.classList.add('line');
                            cmdLine_.style.display = "";
                            document.querySelector('#input-line .cmdline').focus();
                        }
                    }
                }
            } else {
                inputName_.readOnly = true;
                inputName_.autofocus = false;
                uname_.removeAttribute('id');
                uname_.classList.add('line');
                cmdLine_.style.display = "";
                document.querySelector('#input-line .cmdline').focus();
            }
        }
    }

    function getValue(node) {
        //if (node.value && node.value.trim()) {
        var args = node.value;
        //console.log(args);
        if (args.match(/\W/) || args.match(/\s/) || args.match(/\0/) || args == "" || args.length < 4) {
            output_.insertAdjacentHTML('beforeEnd', 'illegal input');
            return "false";
        } else {
            return args;
        }
        //}
    }

    function registerUser(uname, pass) {
        var requestURL = "http://ec2-52-192-48-132.ap-northeast-1.compute.amazonaws.com:3000/api/users";
        var flag = -1;
        $.get(requestURL,
            function(data) {
                //console.log(data);
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userName == uname) {
                        flag = 1;
                        output_.insertAdjacentHTML('beforeEnd', '<div>user name:' + uname + ' already exists</div>');
                        break;
                    } else {
                        flag = 0;
                    }
                }
                if (flag == 0) {
                    $.post(requestURL, {
                        userName: uname,
                        pass: pass
                    });
                }
            },
            "json"
        );
    }
}


//author sakakibara
// function of su
function su(args_first, output_ ,path, dir) {
    var userName = args_first;
    var cmdLine_ = document.querySelector('#input-line');
    cmdLine_.style.display = "none";
    var pass = '<div id="pass"><div class="input-uname" style="display: inline;">pass:<div style="display: inline;"><input class="cmdline" style="display: inline;" type="password"/></div></div></div>';
    //var pass = '<div id="pass">pass:</div>';
    output_.insertAdjacentHTML("beforeEnd", pass);
    var pass_ = output_.querySelector('#pass');
    pass_.addEventListener("keydown", dopass, false);
    var inputPass_ = pass_.querySelector('.cmdline');
    inputPass_.focus();

    function dopass(e) {
        if (e.keyCode == 13) {
            var pwd = inputPass_.value;
            switchUser(userName, pwd);
            inputPass_.readOnly = true;
            inputPass_.autofocus = false;
            cmdLine_.style.display = "";
            pass_.removeAttribute('id');
            pass_.classList.add('line');
            document.querySelector('#input-line .cmdline').focus();
        }
    }

    function switchUser(userName, pass) {
        var requestURL = "http://ec2-52-192-48-132.ap-northeast-1.compute.amazonaws.com:3000/api/users";
        var flag = -1;
        var userHomeDirectory = "";
        $.get(requestURL,
            function(data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userName == userName) {
                        if (data[i].pass == pass) {
                            console.log("exist and correct pass!");
                            flag = 1;
                            if(data[i].homeDirectory == undefined){
                              userHomeDirectory = "/";
                            }
                            else{
                                userHomeDirectory = data[i].homeDirectory;
                            }
                            break;
                        }
                    }
                }
                if (flag == -1) {
                    output_.insertAdjacentHTML('beforeEnd', '<div>su: Authentication failure</div>');
                } else if (flag == 1) {
                    output_.insertAdjacentHTML('beforeEnd', '<div>switched to ' + userName + '</div>');
                    sessionStorage.setItem("currentUserName", userName);
                    sessionStorage.setItem("currentUserHomeDirectory", userHomeDirectory);
                    console.log("set to " + sessionStorage.getItem("currentUserName"));
                    cd(path,userHomeDirectory,dir,output_);
                }
            },
            "json"
        );

    }
}
// author ito
// show history function
function history(output_) {
    var commands = sessionStorage.beforeCmd.split(",");
    for (var i = 0; i < commands.length; i++) {
        output_.insertAdjacentHTML('beforeEnd', '<div>' + commands[i] + '</div>');
    }
}

// author ito
// show callender
function cal(output_) {
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var dateNum = 31;
    if (month == 4 || month == 6 || month == 9 || month == 11) {
        dateNum = 30;
    } else if (month == 2) {
        dateNum = 28;
    } else if (month == 2 && year % 4 == 0) {
        dateNum = 29;
    }
    myDate.setDate(1);
    var week = myDate.getDay();
    var outputStr = '<div style="margin-left:3.5em">' + year + '年</div><div style="margin-left:4em">' + month + '月</div><div style="margin-left:' + (week + 2) + 'em">';
    //for (var k = 0; k < week; k++){
    //  outputStr += "--- ";
    //}
    for (var i = 0; i < dateNum + week; i++) {
        if (i % 7 == 0 && i != 0) outputStr += '<div>';
        if (i - week >= 0 && i - week < 9) outputStr += "0";
        if (i - week > -1) outputStr += (i + 1 - week) + " ";
        if (i % 7 == 6) outputStr += '</div>';
    }
    //console.log(outputStr);
    output_.insertAdjacentHTML('beforeEnd', outputStr);
}


//author umeki
//show file and directory in current directory
function cat(output_, cmdLine_, args_all, current_path) {

    var shop_name = '';
    var search_flag = false;
    console.log('cat_all:'+args_all);
    var temp_args = args_all.replace(/\s+/g, "%20"); //店舗名に空白が実装されていた場合に整頓する
    var targetShopName = temp_args.replace(/　/g, "%20");

    shop_name = getDirectoryComponent(current_path, targetShopName);

    if (shop_name == 'directory') {
        output(targetShopName + ':is directory');
        return false;
    } else if (shop_name == null) {
        output(args_all + ':No such shop information or directory');
        return false;
    } else {
        for (var i = 0; i < shop_name.length; i++) {
            var temp_shop = shop_name[i].replace(/\s+/g, "%20"); //店舗名に空白が実装されていた場合に整頓する
            var allShopName = temp_shop.replace(/　/g, "%20");
            if (targetShopName == allShopName) {
                search_flag = true;
                console.log('seikou');
            }
        }
    }

    if (search_flag) {
        console.log(targetShopName);
        getShopInfo(targetShopName, function(shopInfo) {
            console.log(shopInfo);
            for (var i = 0; i < shopInfo.length; i++) {
                output(shopInfo[i]);
            }
            return true;
        });
    } else {
        output(args_all + ':No such shop information or directory');
        return false;
    }
    //カレントディレクトリの構成を持ってくる
    function getDirectoryComponent(path, targetSN) {
        if (isDirectory(path, targetSN) == 'false') {
            let iterable = Object.values(path);
            var entries = [];
            var result;
            var i = 0;
            for (let value of iterable) {
                entries.push(value);
                result = entries.shift();
            }
            return result;
        } else if (isDirectory(path, targetSN) == 'directory') {
            return 'directory';
        } else if (isDirectory(path, targetSN) == 'No_directory') {
            return null;
        }
    }

    //カレントディレクトリの構成がディレクトリか店情報かを判断する
    function isDirectory(path, targetSN) {
        if (!path.hasOwnProperty('shops')) {
            let iterable = Object.values(Object.values(path));
            var entries = [];
            for (let value of iterable) {
                if (value.hasOwnProperty('name')) {
                    if (value.name == targetSN) {
                        return 'directory';
                    }
                }
            }
            return 'No_directory';
        } else {
            return 'false';
        }
    }


    //店情報をapiからとってくる
    function getShopInfo(shopName, callback) {
        //var shopInfo = [];
        var shopData = [];
        getData().done(function(result) {
            var json = result.results[0];
            var temp = json.replace("</body></html>", "");
            var temp2 = temp.replace("<html><head/><body>", "");
            var data = JSON.parse(temp2);
            let iterable = data.results.shop;
            for (let value of iterable) {
                shopData.push('name:' + value.name);
                //shopData.push('店舗id:'+value.id);
                shopData.push('住所:' + value.address);
                shopData.push('Url(pc):' + value.urls.pc);
                shopData.push('Url(mobile):' + value.urls.mobile);
                shopData.push('ジャンル:' + value.genre.name);
            }
            callback(shopData);
        }).fail(function(result) {
            alert("Error");
        });

        // ホットペッパーAPIを呼び出す
        function getData() {
            return $.ajax({
                url: 'http://webservice.recruit.co.jp/hotpepper/shop/v1/?key=ef48d4a8cf540416&format=json&keyword=' + shopName,
                type: "GET",
                contentType: "application/json; charset=utf-8"
            });
        }
    }

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', '<div>' + html + '</div>');
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }

}

//author sakakibara
// function of exit
function exit(output_, path, dir) {
    var outputStr;
    if (sessionStorage.getItem("currentUserName") == "guest") {
        outputStr = '<div>you are guest account</div>';
        output_.insertAdjacentHTML('beforeEnd', outputStr);
        //ブラウザによって挙動が異なる
        //window.open('about:blank','_self').close();
    } else {
        outputStr = '<div>exit ' + sessionStorage.getItem("currentUserName") + '</div>';
        sessionStorage.setItem("currentUserName", "guest");
        sessionStorage.setItem("currentUserHomeDirectory", "/");
        output_.insertAdjacentHTML('beforeEnd', outputStr);
        cd(path, "/", dir, output_);
    }
}

//author shimada, tominaga
function ls(output_, cmdLine_, path, target, root) {
	var ret = existsTargetPath(path, target, root);
	if (ret === null) {
	    output_.insertAdjacentHTML('beforeEnd', '<div>No such file or directory</div>');
	    return;
	}
	path = ret;

    if (!path.hasOwnProperty('shops')) {
        let iterable = Object.values(Object.values(path));
        var entries = [];
        for (let value of iterable) {
            if (value.hasOwnProperty('name')) {
                entries.push(value.name);
            }
        }
        display(entries, "color:white;");
    } else {
        let iterable = Object.values(path);
        var entries = [];
        var result;
        for (let value of iterable) {
            entries.push(value);
            result = entries.shift();
        }
        display(result, "color:#993333;");
    }

    function display(result, color) {
        var html = format(result);
        html.push('</div>');
        let i = result;
        for (let value of i) {
            html.push('<span style=', color, '>', value, '</span>', '<span class = "space"', '>', '</span><br>');
        }
        output(html.join(''));
    }

    function format(entries) {
        var max = 0;
        let iterable = entries;
        for (let value of iterable) {
            if (value.length > max) {
                max = value.length;
            }
        }
        var colWidth = max * 8;
        var height = 'height 20px';
        return ['<div class="ls-files" style="-webkit-column-width:',
            colWidth, 'px;', height, '">'
        ];
    }

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', html);
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }

    function existsTargetPath(curr, target, root) {
    	if (target === undefined) { // target means a current directory
    		return curr;
    	}

    	var tmpTarget = " " + target;
    	var currDir = (tmpTarget.indexOf(" /") !== -1) ? root : curr;

    	var targetPaths = target.split("/");
    	for (var i = 0; i < targetPaths.length; i++) {
    		if (targetPaths[i] === "") {
    			continue;
    		}

    		var found = false;
    		var tmpDir = currDir;

	    	Object.keys(currDir).forEach(function(key) {
    			if (targetPaths[i] === this[key].name) {
    				found = true;
    				tmpDir = this[key];
    			}
    		}, currDir);

    		if (found) {
    			currDir = tmpDir;
    		} else {
    			return null;
    		}
    	}

    	return currDir;
    }
}

// author tominaga
// a function for a cd command
function cd(path, targetPath, dir, output_) {
    var tmpPathStr = "";

    if (targetPath === undefined) {
        path.string = "/";
        path.position = dir.root;
        changePrompt(path);
        return dir.root; // go to a root directory
    } else {
        var target = " " + targetPath;
        var goal = dir.root; // finally point to a directory which targetPath represents

        if (target.indexOf(" /") !== -1) {
            // the case that targetPath starts with "/"(root directory)
            goal = dir.root;
            tmpPathStr += "/";
        } else {
            // the case that targetPath originate from a current directory
            goal = path.position;
            tmpPathStr = path.string;
        }

        var targetDirs = targetPath.split("/");
        for (var i = 0; i < targetDirs.length; i++) {
            if (targetDirs[i] === "") { // the case that targetPath starts with "/"(root directory) etc
                continue;
            }

            var found = false;
            Object.keys(goal).forEach(function(key) {
                if ((targetDirs[i] === this[key].name)) {
                    found = true;
                    goal = this[key];
                }
            }, goal);

            if (found === true) {
                var tmpStr = tmpPathStr + " ";
                if (tmpStr.indexOf("/ ") === -1) {
                    tmpPathStr += "/";
                }
                tmpPathStr += goal.name;
            } else {
                output_.insertAdjacentHTML('beforeEnd', '<div>No such directory</div>');
                return path.position;
            }
        }


        path.string = tmpPathStr;
        path.position = goal;
        changePrompt(path);
        return goal;
    }

	/*
    function findTargetDir(currDir, targetDir) {
        var found = false;

        Object.keys(currDir).forEach(function(key) {
            if ((key !== "name") && (targetDir === this[key].name)) {
                found = true;
            }
        }, currDir);

        return found;
    }
    */
}

function open1(output_, cmdLine_, args_all, current_path, callback) {
    var shop_name = '';
    var search_flag = false;
    console.log('open_all:' + args_all);
    var temp_args = args_all.replace(/\s+/g, "%20"); //店舗名に空白が実装されていた場合に整頓する
    var targetShopName = temp_args.replace(/　/g, "%20");
    var res;

    shop_name = getDirectoryComponent(current_path, targetShopName);

    if (shop_name == 'directory') {
        output(targetShopName + ':is directory');
        return false;
    } else if (shop_name == null) {
        output(args_all + ':No such shop information or directory');
        return false;
    } else {
        for (var i = 0; i < shop_name.length; i++) {
            var temp_shop = shop_name[i].replace(/\s+/g, "%20"); //店舗名に空白が実装されていた場合に整頓する
            var allShopName = temp_shop.replace(/　/g, "%20");
            if (targetShopName == allShopName) {
                search_flag = true;
            }
        }
    }

    if (search_flag) {
        getShopInfo(targetShopName, function(shopInfo) {
            for (var i = 0; i < shopInfo.length; i++) {
                if (shopInfo[i].includes("Url(pc):")) {
                    res = shopInfo[i].replace("Url(pc):", "");
                    console.log(shopInfo[i]);
                    callback(res);
                    return true;
                }
            }
            return true;
        });
    } else {
        output(args_all + ':No such shop information or directory');
        return false;
    }
    //カレントディレクトリの構成を持ってくる
    function getDirectoryComponent(path, targetSN) {
        if (isDirectory(path, targetSN) == 'false') {
            let iterable = Object.values(path);
            var entries = [];
            var result;
            var i = 0;
            for (let value of iterable) {
                entries.push(value);
                result = entries.shift();
            }
            return result;
        } else if (isDirectory(path, targetSN) == 'directory') {
            return 'directory';
        } else if (isDirectory(path, targetSN) == 'No_directory') {
            return null;
        }
    }

    //カレントディレクトリの構成がディレクトリか店情報かを判断する
    function isDirectory(path, targetSN) {
        if (!path.hasOwnProperty('shops')) {
            let iterable = Object.values(Object.values(path));
            var entries = [];
            for (let value of iterable) {
                if (value.hasOwnProperty('name')) {
                    if (value.name == targetSN) {
                        return 'directory';
                    }
                }
            }
            return 'No_directory';
        } else {
            return 'false';
        }
    }


    //店情報をapiからとってくる
    function getShopInfo(shopName, callback) {
        var shopData = [];
        getData().done(function(result) {
            var json = result.results[0];
            var temp = json.replace("</body></html>", "");
            var temp2 = temp.replace("<html><head/><body>", "");
            var data = JSON.parse(temp2);
            let iterable = data.results.shop;
            for (let value of iterable) {
                shopData.push('name:' + value.name);
                shopData.push('住所:' + value.address);
                shopData.push('Url(pc):' + value.urls.pc);
                shopData.push('Url(mobile):' + value.urls.mobile);
                shopData.push('ジャンル:' + value.genre.name);
            }
            callback(shopData);
        }).fail(function(result) {
            alert("Error");
        });

        // ホットペッパーAPIを呼び出す
        function getData() {
            return $.ajax({
                url: 'http://webservice.recruit.co.jp/hotpepper/shop/v1/?key=ef48d4a8cf540416&format=json&keyword=' + shopName,
                type: "GET",
                contentType: "application/json; charset=utf-8"
            });
        }
    }

    function output(html) {
        output_.insertAdjacentHTML('beforeEnd', '<div>' + html + '</div>');
        output_.scrollIntoView();
        cmdLine_.scrollIntoView();
    }
}

//author sakakibara
// プロンプトの中身が変わるときに呼び出す関数
function changePrompt(path){
  var currentPathString = "";
  if(path.string == "/"){
    currentPathString = "/";
  }
  else {
    var arrayOfStrings = path.string.split("/");
    currentPathString = arrayOfStrings[arrayOfStrings.length -1];
  }
  $('.prompt:last').html(sessionStorage.getItem("currentUserName")+'@CLICLI '+'<font color="white">'+currentPathString+'</font>'+' $');
}
